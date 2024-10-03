import { createClient } from "@/utils/supabase/server";
import Upload from "./components/Upload";

export default async function Home() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();

  console.log("LOG", JSON.stringify(notes));

  return (
    <div>
      <Upload />
    </div>
  );
}
