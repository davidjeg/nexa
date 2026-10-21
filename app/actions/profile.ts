"use server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../lib/auth/getCurrentUser";
export const getProfile = async () => {
  const { supabase, user } = await getCurrentUser();

  if (!user) throw new Error("No autenticado");

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  if (error) throw new Error("Error al obtner el perfil");
  return profile;
};

export const updateProfile = async (formData: FormData) => {
  const { user, supabase } = await getCurrentUser();

  const username = formData.get("username");
  const bio = formData.get("bio");
  const location = formData.get("location");
  const website = formData.get("website");
  const banner = formData.get("banner");

  const updates: {
    username: FormDataEntryValue | null;
    bio: FormDataEntryValue | null;
    location: FormDataEntryValue | null;
    website: FormDataEntryValue | null;
    banner?: string;
  } = {
    username,
    bio,
    location,
    website,
  };

  if (banner instanceof File && banner.size > 0) {
    if (!banner.type.startsWith("image/")) {
      throw new Error("El archivo debe ser una imagen");
    }

    if (banner.size > 5 * 1024 * 1024) {
      throw new Error("La imagen no puede superar los 5 MB");
    }

    const filePath = `banners/${user.id}/${crypto.randomUUID()}`;

    const { error: uploadError } = await supabase.storage
      .from("profiles")
      .upload(filePath, banner, {
        contentType: banner.type,
        upsert: false,
      });
    console.log(uploadError);

    if (uploadError) {
      throw new Error("No se pudo subir el banner");
    }

    const { data } = supabase.storage.from("profiles").getPublicUrl(filePath);

    updates.banner = data.publicUrl;
  }

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (error) {
    throw new Error("No se pudieron actualizar los datos");
  }

  revalidatePath("/profile");
};

export const updateProfileImge = async () => {
  revalidatePath("/profile");
};
