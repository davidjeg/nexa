"use server";
import { getCurrentUser } from "../lib/auth/getCurrentUser";
export async function commentPost(postId: string, content: string) {
  const { supabase, user } = await getCurrentUser();
  const { error } = await supabase.from("post_comments").insert({
    post_id: postId,
    user_id: user.id,
    content,
  });
  if (error) {
    throw new Error("Error al comentar");
  }
}
