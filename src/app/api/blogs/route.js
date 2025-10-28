import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Debug log (only during build or dev)
console.log("🔍 SUPABASE URL:", url ? "Loaded ✅" : "Missing ❌");
console.log("🔍 SUPABASE KEY:", key ? "Loaded ✅" : "Missing ❌");

if (!url || !key) {
  throw new Error("❌ Supabase URL or Key not found! Check .env.local");
}

const supabase = createClient(url, key);

export async function GET() {
  try {
    const { data, error } = await supabase.from("Blogs").select("*");

    if (error) {
      console.error("❌ Supabase error (GET):", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error("❌ API crash (GET):", err.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("Blogs")
      .insert([
        {
          title: body.title,
          slug: body.slug,
          author: body.author,
          image_url: body.image_url,
          content: body.content,
        },
      ])
      .select();

    console.log("🧾 Incoming blog data:", body);

    if (error) {
      console.error("❌ Supabase error (POST):", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (err) {
    console.error("❌ API crash (POST):", err.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
