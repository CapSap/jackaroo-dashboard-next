import { parse } from "csv-parse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("csv") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.

  // Convert buffer to string for processing CSV content
  const csvContent = buffer.toString("utf-8");
  console.log("CSV Content:", csvContent);

  const rows = csvContent.split("\n").slice(1); // Skip the first row (report name w/ time period selected)
  const reportContent = rows.join("\n");

  console.log("rows", rows.slice(0, 3));

  // Parse CSV data in memory
  try {
    const records = parse(reportContent, {
      columns: true, // Automatically map headers to object keys
      skip_empty_lines: true,
    });

    console.log("Parsed CSV Records: ", records);
    return NextResponse.json({ success: true, data: records });
  } catch (error) {
    console.error("Error parsing CSV:", error);
    return NextResponse.json({ success: false, message: "Error parsing CSV" });
  }
}
