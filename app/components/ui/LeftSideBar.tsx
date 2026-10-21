"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { leftBarNavigation } from "@/app/configs/auth/ui/navigation";
import { createClient } from "@/app/lib/supabase/client";
function LeftSideBar() {
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(true);
  useEffect(() => {
    const handleOpen = () => {
      const w = window.innerWidth;
      if (w <= 1200) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };
    handleOpen();
    window.addEventListener("resize", handleOpen);
    return () => {
      window.removeEventListener("resize", handleOpen);
    };
  }, []);
  useEffect(() => {
    const supabase = createClient();
    const initNotifications = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) return;

      const { count, error } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("recipient_id", user.id)
        .eq("read", false);
      if (!error) {
        setNotificationCount(count ?? 0);
      }
    };
    initNotifications();
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
        },
        async (payload) => {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (!user) return;

          const notification = payload.new as {
            recipient_id?: string;
          };

          // Ignorar notificaciones de otros usuarios
          if (notification.recipient_id !== user.id) return;

          // Consultar el contador actualizado en Supabase
          const { count, error } = await supabase
            .from("notifications")
            .select("*", { count: "exact", head: true })
            .eq("recipient_id", user.id)
            .eq("read", false);

          if (!error) {
            setNotificationCount(count ?? 0);
          }
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <aside
      className={`${open ? "w-full max-w-70  " : "w-fit"} sticky top-0 left-0 h-screen`}
    >
      <span className="pl-4 font-bold">Nexa</span>
      {leftBarNavigation.map((item) => {
        const isNotifications = item.label === "Notifications";
        if (isNotifications) {
          return (
            <Link
              key={item.label}
              className={`flex gap-4 hover:bg-zinc-900  p-4 hover:text-zinc-200 ${
                open
                  ? "rounded-2xl justify-start block"
                  : "rounded full justify-center w-fit "
              }`}
              href={"/notifications"}
            >
              {item.icon}
              {open && <span>{item.label}</span>}
              {notificationCount > 0 && (
                <div
                  className="rounded-full w-5 h-5 p-2 bg-red-500 flex items-center justify-center text-zinc-200
                text-xs font-bold"
                >
                  {notificationCount}
                </div>
              )}
            </Link>
          );
        }
        return (
          <Link
            href={item.href}
            key={item.label}
            className={`flex gap-4 hover:bg-zinc-900 p-4  hover:text-zinc-200 ${
              open
                ? "rounded-2xl justify-start block"
                : "rounded-full justify-center w-fit"
            }`}
          >
            {item.icon}
            {open && <span>{item.label}</span>}
          </Link>
        );
      })}
    </aside>
  );
}

export default LeftSideBar;
