"use client";

import { useEffect, useState } from "react";
import { format, startOfWeek, endOfWeek, isSameWeek, subWeeks } from "date-fns";

export default function WeekPicker() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>();

  // Function to generate weeks for the current year
  const generateWeeks = () => {
    const weeks = [];
    const currentDate = new Date();
    let weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday start

    for (let i = 0; i < 6; i++) {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      weeks.push({
        label: `${format(weekStart, "dd/MM/yyyy")} - ${format(
          weekEnd,
          "dd/MM/yyyy"
        )}`,
        start: weekStart.toISOString(),
        end: weekEnd.toISOString(),
      });
      // Move to the previous week
      weekStart = subWeeks(weekStart, 1);
    }

    return weeks;
  };
  const weeks = generateWeeks();

  useEffect(() => {
    const currentDate = new Date();
    const currentWeek = weeks.find((week) =>
      isSameWeek(currentDate, week.start, { weekStartsOn: 1 })
    );
    setSelectedDate(currentWeek);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selected = JSON.parse(e.target.value);
    setSelectedDate(selected);
  }

  async function getOrders() {
    if (!selectedDate) {
      return null;
    }
    const options: RequestInit = {
      method: "GET",
    };

    try {
      const res = await fetch(
        `/api/shipped-orders?start=${selectedDate.start}&end=${selectedDate.end}`,
        options
      );
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      console.log("log from getorders func", data);
      return data;
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  }

  useEffect(() => {
    getOrders();
  }, [selectedDate]);

  return (
    <div>
      <div>hello and welcome jack. please seleect a date range</div>
      <select
        id="week-select"
        onChange={(e) => handleChange(e)}
        value={JSON.stringify(selectedDate)}
      >
        <option value="" disabled>
          --Choose a week--
        </option>
        {weeks.map((week, index) => (
          <option key={index} value={JSON.stringify(week)}>
            {week.label}
          </option>
        ))}
      </select>
    </div>
  );
}
