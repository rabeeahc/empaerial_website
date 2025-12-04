// app/api/teams/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const TABLE_NAMES = ["Teams", "teams"];

function getClient() {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    throw new Error("Supabase environment variables missing.");
  }

  return createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });
}

// Format row returned from DB → API
function outRow(row) {
  return {
    id: row.id,
    title: row.name ?? "",
    description: Array.isArray(row.description)
      ? row.description.join(" ")
      : row.description ?? "",
    members: row.members ?? [],
  };
}

// Convert incoming body → DB row
function inRow(body) {
  return {
    name: body.title ?? body.name ?? "",
    description: Array.isArray(body.description)
      ? body.description
      : body.description
      ? [body.description]
      : [],
    members: body.members ?? [],
  };
}

// Try both Teams / teams
async function withTable(actionFn) {
  const supabase = getClient();
  let lastError = null;

  for (const table of TABLE_NAMES) {
    try {
      const result = await actionFn(supabase, table);
      if (result?.ok) return result;
      if (result?.error) lastError = result.error;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error("Teams table not found");
}

function requirePassword() {
  return {
    required: !!process.env.ADMIN_PASSWORD,
    value: process.env.ADMIN_PASSWORD,
  };
}

/* ============================================================
   GET /api/teams
============================================================ */
export async function GET() {
  try {
    const { result } = await withTable(async (supabase, table) => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("id", { ascending: true });

      if (error) return { error };
      return { ok: true, result: data.map(outRow) };
    });

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 }
    );
  }
}

/* ============================================================
   POST /api/teams  (optional)
============================================================ */
export async function POST(req) {
  try {
    const body = await req.json();
    const { required, value } = requirePassword();

    if (required && body.password !== value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = inRow(body);

    const { result } = await withTable(async (supabase, table) => {
      const { data, error } = await supabase
        .from(table)
        .insert(payload)
        .select("*")
        .single();

      if (error) return { error };
      return { ok: true, result: outRow(data) };
    });

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/* ============================================================
   PATCH /api/teams — EDIT MEMBER or DELETE MEMBER
============================================================ */
// PATCH — update members list
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { teamId, members, updatedMember, deleteName, password } = body;

    if (!teamId)
      return NextResponse.json({ error: "Missing teamId" }, { status: 400 });

    // Password check (same as delete)
    if (process.env.ADMIN_PASSWORD && password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Fetch team
    const { data: team, error: fetchErr } = await supabase
      .from("Teams")
      .select("*")
      .eq("id", teamId)
      .single();

    if (fetchErr) throw fetchErr;

    let newMembers = team.members || [];

    // CASE 1 — full members array provided (ADD or EDIT)
    if (Array.isArray(members)) {
      newMembers = members;
    }

    // CASE 2 — delete one member
    if (deleteName) {
      newMembers = newMembers.filter((m) => m.name !== deleteName);
    }

    // CASE 3 — update a single member
    if (updatedMember) {
      newMembers = newMembers.map((m) =>
        m.name === updatedMember.name ? updatedMember : m
      );
    }

    // Save back to Supabase
    const { data, error } = await supabase
      .from("Teams")
      .update({ members: newMembers })
      .eq("id", teamId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("PATCH error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


/* ============================================================
   DELETE /api/teams — Delete Entire Team
============================================================ */
export async function DELETE(req) {
  try {
    const body = await req.json();

    if (!body.id)
      return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const { required, value } = requirePassword();
    if (required && body.password !== value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { result } = await withTable(async (supabase, table) => {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq("id", body.id);

      if (error) return { error };
      return { ok: true, result: true };
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 }
    );
  }
}
