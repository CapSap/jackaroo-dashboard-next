"use client";

import { useState } from "react";

export default function Upload() {
  const [csv, setCsv] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!csv) {
      setError("Please select a CSV file before uploading.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const data = new FormData();
      data.set("csv", csv);

      const options = {
        method: "POST",
        body: data,
      };

      const res = await fetch("/api/shipped-orders", options);
      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();

      setMessage(result);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <p className="upload__text">
        Hi Jack, from viare on-demand reports select "Sales Reports" -{">"}{" "}
        "Shipped orders with split detail". Then upload that csv here.
      </p>

      <form onSubmit={onSubmit} className="upload">
        <input
          type="file"
          accept=".csv"
          name="csv"
          onChange={(e) => setCsv(e.target.files?.[0])}
          className="upload__input"
        />
        <button
          type="submit"
          className="upload__button"
          disabled={isLoading || !csv}
        >
          {isLoading ? "Uploading..." : "Upload CSV file"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {isLoading && (
        <p className="loading">Sending file. Waiting for result...</p>
      )}
      {!isLoading && message && (
        <p
          className={`message message--${
            message.success ? "success" : "error"
          }`}
        >
          {message.message}
        </p>
      )}
    </div>
  );
}
