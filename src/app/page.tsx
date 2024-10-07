import { createSupabaseClient } from "@/utils/supabase/server";
import Upload from "./components/Upload";
import WeekPicker from "./components/WeekPicker";

export default async function Home() {
  return (
    <div>
      <WeekPicker />
    </div>
  );
}
