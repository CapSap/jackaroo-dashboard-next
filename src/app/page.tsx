import { createSupabaseClient } from "@/utils/supabase/server";
import Upload from "./components/Upload";
import WeekPicker from "./components/WeekPicker";

export default async function Home() {
  const supabase = createSupabaseClient();
  const { data: notes } = await supabase.from("viare_shipped_orders").select();

  console.log(notes);

  return (
    <div>
      home page
      <WeekPicker />
    </div>
  );
}
