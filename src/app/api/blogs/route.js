import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ✅ Use the PUBLIC anon key, not the service key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// 🧠 GET all blogs
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 📝 POST (Add a blog)
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
