import { createSupabaseClient } from "@/utils/supabase/server";
import Upload from "./components/Upload";
import Dashboard from "./components/Dashboard";

export default async function Home() {
  const supabase = createSupabaseClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
    <div>
      home page
      <Dashboard />
    </div>
  );
}
