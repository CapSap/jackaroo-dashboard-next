import { createClient } from "@/utils/supabase/server";
import Upload from "./components/Upload";

export default async function Home() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
    <div>
      <Upload />
    </div>
  );
}
