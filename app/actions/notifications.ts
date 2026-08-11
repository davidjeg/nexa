"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import { getCurrentUser } from "../lib/auth/getCurrentUser";

export const getAllNotification = async () => {
  const { supabase, user } = await getCurrentUser();
  if (!user) throw new Error("No autenticado");
  const { data: notifications, error: errorNotifications } = await supabase
    .from("notifications")
    .select("*,actor:profiles!actor_id(*),posts(*)")
    .eq("recipient_id", user.id);
  if (errorNotifications)
    throw new Error("error al obtener las notificaciones");

  return notifications;
};

export const insertNotification = async (
  supabase: SupabaseClient,
  notification: {
    recipient_id: string;
    actor_id: string;
    type: string;
    post_id: string;
  },
) => {
  const { error } = await supabase.from("notifications").insert(notification);
  if (error) {
    console.log(error);
    throw new Error("Error al crear la notificacion");
  }
  console.log("notificacion creada");
};

export const deleteNotification = async (
  supabase: SupabaseClient,
  type: string,
  actorId: string,
  postId: string,
) => {
  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("actor_id", actorId)
    .eq("post_id", postId)
    .eq("type", type);
  if (error) throw new Error("Error al eliminar la notificacion");
};
