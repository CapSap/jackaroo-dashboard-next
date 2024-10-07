"use client";

import { useEffect, useState } from "react";
import { format, startOfWeek, endOfWeek, isSameWeek, subWeeks } from "date-fns";
import Dashboard from "./Dashboard";
import { SelectedDate, Order, OrdersResponse } from "@/types/types";

export default function WeekPicker() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [orders, setOrders] = useState<Order[]>();

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
      setError("Start and end dates are required");
      return null;
    }

    setIsLoading(true);
    setError(null);

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
      const data: OrdersResponse = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders);

      return data.orders;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Failed to fetch orders:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getOrders();
  }, [selectedDate]);

  return (
    <div>
      <div className="intro">
        <h1 className="intro__heading">Hello and welcome Jack and friends</h1>

        <p className="intro__text">
          This website will show viare orders that stores have touched in a week
        </p>
        <div className="date-picker">
          <label htmlFor="week-select" className="date-picker__label">
            Please choose a date range:{" "}
          </label>
          <select
            className="date-picker__select"
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
        {error && <p>Error: {error}</p>}
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>{orders && <Dashboard orders={orders} />}</div>
      )}
    </div>
  );
}
