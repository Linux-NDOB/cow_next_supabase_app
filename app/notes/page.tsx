"use client";


import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "tnstarjgtsngqwxtgziz.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


import { useEffect, useState } from "react";

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("notes").select();
      setNotes(data);
    };
    getData();
  }, []);

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
