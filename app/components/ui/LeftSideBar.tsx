"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { leftBarNavigation } from "@/app/configs/auth/ui/navigation";
function LeftSideBar() {
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

  return (
    <aside className={`${open ? "w-full max-w-70" : "w-fit"} `}>
      <span className="pl-4 font-bold">Nexa</span>
      {leftBarNavigation.map((item) => {
        return (
          <Link
            href={item.href}
            key={item.label}
            className={`flex gap-4  hover:bg-zinc-900 p-4 transition 
              ${open ? "rounded-2xl justify-start block" : "rounded-full justify-center w-fit"}
             hover:text-zinc-200`}
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
