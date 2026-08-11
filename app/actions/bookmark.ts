"use server";
import { getCurrentUser } from "../lib/auth/getCurrentUser";
export async function favoritePost(postId: string) {
  const { supabase, user } = await getCurrentUser();

  const { data: existingFavorite, error: findError } = await supabase
    .from("post_favorites")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();
  if (findError) throw new Error("Error al comprobar favorite");

  if (existingFavorite) {
    const { error } = await supabase
      .from("post_favorites")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", user.id);
    if (error) throw new Error("Error al quitar favorito");
    return { favorite: false };
  }

  const { error } = await supabase.from("post_favorites").insert({
    post_id: postId,
    user_id: user.id,
  });
  if (error) {
    throw new Error("Error al comentar");
  }
  return { favorite: true };
}
