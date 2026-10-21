"use server";
import { getCurrentUser } from "../lib/auth/getCurrentUser";
import { deleteNotification, insertNotification } from "./notifications";
export async function likePost(postId: string) {
  const { supabase, user } = await getCurrentUser();
  const { data: existingLike, error: findError } = await supabase
    .from("post_likes")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (findError) throw new Error("Error al comprobar el like");
  if (existingLike) {
    const { error } = await supabase
      .from("post_likes")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", user.id);

    if (error) throw new Error("Error al quitar el like");

    await deleteNotification(supabase, "like", user.id, postId);
    return { liked: false };
  }

  const { error } = await supabase.from("post_likes").insert({
    post_id: postId,
    user_id: user.id,
  });
  if (error) {
    throw new Error("Error al dar like");
  }
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("user_id")
    .eq("id", postId)
    .single();
  if (postError || !post) throw new Error("No se encontro el post");
  await insertNotification(supabase, {
    recipient_id: post.user_id,
    actor_id: user.id,
    type: "like",
    post_id: postId,
  });
  return { liked: true };
}
