import { LucideIcon } from "lucide-react";
export interface PostActions {
  label: string;
  icon: LucideIcon;
  action: string;
  count: number;
  component?: (post_id: string) => React.ReactNode;
}
