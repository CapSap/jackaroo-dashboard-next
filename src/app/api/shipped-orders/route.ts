import { createSupabaseClient } from "@/utils/supabase/server";
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

  // Skip the first row (report name w/ time period used to generate report)
  const rows = csvContent
    .split("\n")
    .slice(2)
    .filter((row) => row.trim().length > 0); // Filter out empty rows;
  const reportContent = rows.join("\n");

  console.log(rows);

  const supabase = createSupabaseClient();
  let successfullyInserted = 0;
  let failedRows = 0;

  for (const row of rows) {
    const [
      orderId,
      orderDate,
      dispatchDate,
      daysToFulfill,
      rootOid,
      parentOid,
      splitLevel,
      splitsFromRoot,
      dispatchPoint,
      isamsId,
      customerId,
      shippedTo,
      postcode,
      country,
      currency,
      items,
      freight,
      discount,
      total,
    ] = row.split(","); // Assuming the CSV is comma-separated

    // Build the object for Supabase insert
    const record = {
      order_id: orderId.trim(),
      order_date: orderDate ? new Date(orderDate.trim()) : null,
      dispatch_date: dispatchDate ? new Date(dispatchDate.trim()) : null,
      days_to_fulfill: daysToFulfill ? parseInt(daysToFulfill.trim()) : null,
      root_oid: rootOid.trim() || null,
      parent_oid: parentOid.trim() || null,
      split_level: splitLevel ? parseInt(splitLevel.trim()) : null,
      splits_from_root: splitsFromRoot ? parseInt(splitsFromRoot.trim()) : null,
      dispatch_point: dispatchPoint.trim(),
      isams_id: isamsId.trim() || null,
      customer_id: customerId.trim(),
      shipped_to: shippedTo.trim(),
      postcode: postcode.trim(),
      country: country.trim(),
      currency: currency.trim(),
      items: items.trim(),
      freight: freight ? parseFloat(freight.trim()) : 0,
      discount: discount ? parseFloat(discount.trim()) : 0,
      total: total ? parseFloat(total.trim()) : 0,
    };

    try {
      // Insert the record, skip if `order_id` conflicts
      const { error } = await supabase
        .from("viare_shipped_orders")

        .insert([record]);
      // .upsert([record], { onConflict: "order_id" });
      // upsert does not throw an error so it doesnt get counted.

      if (!error) {
        successfullyInserted += 1;
      } else {
        console.error(`Error inserting row for Order ID: ${orderId}`, error);
        failedRows += 1; // Keep track of skipped rows
      }
    } catch (error) {
      console.error("Error during insertion process:", error);
      failedRows += 1;
    }
  }

  return NextResponse.json({
    success: true,
    message: `Data upload complete. ${successfullyInserted} rows inserted, ${failedRows} rows skipped.`,
  });
}

export async function GET(request: NextRequest) {
  const data = await request.json();
  console.log(data);
}
