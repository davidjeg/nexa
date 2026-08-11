import { AuthFields } from "@/app/types/auth";
export const authFields: AuthFields = {
  login: [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email address...",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password...",
    },
  ],

  register: [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter your username...",
    },

    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email address...",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Create a strong password...",
    },
  ],
};
