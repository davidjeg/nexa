import { LeftSideBarItem } from "@/app/types/ui/navigation";
import {
  BellIcon,
  LogOutIcon,
  MessageCircle,
  User,
  Home,
  Settings,
  Search,
} from "lucide-react";
export const leftBarNavigation: LeftSideBarItem[] = [
  {
    label: "Home",
    icon: <Home />,
    href: "/",
  },
  {
    label: "Explore",
    icon: <Search />,
    href: "/explore",
  },

  {
    label: "Notifications",
    icon: <BellIcon />,
    href: "/notifications",
  },
  {
    label: "Messages",
    icon: <MessageCircle />,
    href: "/chat",
  },
  {
    label: "Profile",
    icon: <User />,
    href: "/profile",
  },
  {
    label: "Settings",
    icon: <Settings />,
    href: "/settings",
  },
  {
    label: "SingOut",
    icon: <LogOutIcon />,
    href: "",
  },
];
