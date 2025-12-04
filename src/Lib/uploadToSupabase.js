import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/**
 * Upload a file to Supabase Storage → uploads/team-members/
 * Returns: public URL or null
 */
export async function uploadMemberPhoto(file) {
  if (!file) return null; // No new file → keep old photo

  const fileExt = file.name.split(".").pop();
  const fileName = `member-${Date.now()}.${fileExt}`;
  const filePath = `team-members/${fileName}`;

  const { error } = await supabase.storage
    .from("uploads")
    .upload(filePath, file);

  if (error) {
    console.error("Upload error:", error);
    return null;
  }

  const { data: publicUrl } = supabase.storage
    .from("uploads")
    .getPublicUrl(filePath);

  return publicUrl.publicUrl;
}
