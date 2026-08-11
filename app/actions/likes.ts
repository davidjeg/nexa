"use server";
import { getCurrentUser } from "../lib/auth/getCurrentUser";
export async function likePost(postId: string) {
  const { supabase, user } = await getCurrentUser();
  const { data: existingLike, error: findError } = await supabase
    .from("post_likes")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  console.log(findError);
  if (findError) throw new Error("Error al comprobar el like");
  if (existingLike) {
    const { error } = await supabase
      .from("post_likes")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", user.id);

    if (error) throw new Error("Error al quitar el like");
    return { liked: false };
  }

  const { error } = await supabase.from("post_likes").insert({
    post_id: postId,
    user_id: user.id,
  });
  if (error) {
    throw new Error("Error al dar like");
  }
  return { liked: true };
}
