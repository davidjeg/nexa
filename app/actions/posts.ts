"use server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../lib/auth/getCurrentUser";
import { createClient } from "../lib/supabase/server";
export async function getAllPost() {
  const { supabase, user } = await getCurrentUser();
  const { data, error } = await supabase
    .from("posts")
    .select("*,post_likes(count),post_comments(count)")
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error("Error al obtener los posts");
  }
  if (!user) {
    return data?.map((post) => ({ ...post, liked: false, favorite: false }));
  }

  const { data: userLikes, error: likesError } = await supabase
    .from("post_likes")
    .select("post_id")
    .eq("user_id", user.id);
  const { data: userFavorites, error: favoritesError } = await supabase
    .from("post_favorites")
    .select("post_id")
    .eq("user_id", user.id);

  if (favoritesError) throw new Error("Error al obtener favoritos");
  if (likesError) throw new Error("Error al obtener los likes");
  const likedPostIds = new Set(userLikes.map((like) => like.post_id));
  const favoritePostIds = new Set(
    userFavorites.map((favorite) => favorite.post_id),
  );
  return data.map((post) => ({
    ...post,
    liked: likedPostIds.has(post.id),
    favorite: favoritePostIds.has(post.id),
  }));
}

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const content = formData.get("content") as string;
  const img_width = formData.get("width") as string;
  const img_height = formData.get("height") as string;
  const img = formData.get("image") as File | null;
  let imgUrl = null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Usuario no autenticado");
  if (img && img.size > 0) {
    const fileName = `${Date.now()}-${img.name}`;
    const { error } = await supabase.storage
      .from("posts")
      .upload(fileName, img);
    if (error) {
      console.log(error.message);
      throw new Error("Error al subir la imagen");
    }
    const { data } = supabase.storage.from("posts").getPublicUrl(fileName);
    imgUrl = data.publicUrl;
  }

  const { error } = await supabase.from("posts").insert({
    content,
    img_url: imgUrl,
    user_id: user.id,
    img_width,
    img_height,
  });
  if (error) {
    console.log(error.message);
    throw new Error("Error al crear el post");
  }
  revalidatePath("/");
}
