"use server";
import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";

export const register = async (
  email: string,
  password: string,
  username: string,
) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    switch (error.code) {
      case "over_email_send_rate_limit":
        throw new Error(
          "Demasiados intentos. Espera unos minutos e intenta nuevamente.",
        );

      case "user_already_exists":
        throw new Error("Este correo ya está registrado.");

      default:
        throw new Error("No se pudo crear la cuenta.");
    }
  }
  const user = data.user;
  if (user) {
    const { error } = await supabase
      .from("profiles")
      .insert({ id: user.id, username });
    if (error) {
      throw new Error("Error al crear el perfil");
    }
  }
  redirect("/login");
};

export const login = async (email: string, password: string) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error("Incorrect email or password");
  }
};
export const signOut = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
  redirect("/");
};
