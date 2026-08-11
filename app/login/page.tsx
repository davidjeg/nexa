"use client";
import { authFields } from "../configs/auth/forms";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthForm from "../components/auth/AuthForm";
import { login } from "../actions/auth";
function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      await login(email, password);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };
  return (
    <div className="min-h-[calc(100vh-4rem)]  flex items-center justify-center">
      <AuthForm
        title="Login to your account"
        fields={authFields.login}
        submitText="Login"
        action="Sign Up"
        actionUrl="/signup"
        onSubmit={handleLogin}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default Login;
