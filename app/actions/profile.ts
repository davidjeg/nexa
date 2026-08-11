"use server";
import { getCurrentUser } from "../lib/auth/getCurrentUser";
export const getProfile = async () => {
  const { supabase, user } = await getCurrentUser();

  if (!user) throw new Error("No autenticado");

  const { data: profile, error } = await supabase.from("profiles").select("*");
  if (error) throw new Error("Error al obtner el perfil");

  console.log(profile);
};
