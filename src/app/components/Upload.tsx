"use client";

import { useState } from "react";

export default function Upload() {
  const [csv, setCsv] = useState<File>();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!csv) {
      return;
    }

    try {
      const data = new FormData();

      const options = {
        method: "POST",
        body: data,
      };

      data.set("csv", csv);

      console.log(data);

      const res = await fetch("/api/upload-csv", options);
      console.log(res);
      if (!res.ok) throw new Error(await res.text());
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      upload component
      <form onSubmit={onSubmit}>
        <input
          type="file"
          accept=".csv"
          name="csv"
          onChange={(e) => setCsv(e.target.files?.[0])}
        />
        <button>Click me to submit and upload the file</button>
      </form>
    </div>
  );
}
