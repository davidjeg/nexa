import { createClient } from "../supabase/server";
export const getCurrentUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error) {
    throw new Error("Usuario no autenticado");
  }
  return { supabase, user };
};
