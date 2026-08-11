"use client";
import { useState } from "react";
import { authFields } from "../configs/auth/forms";
import AuthForm from "../components/auth/AuthForm";
import { register } from "../actions/auth";
function Register() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleRegister = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;
    try {
      await register(email, password, username);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };
  return (
    <div className="min-h-[calc(100vh-4rem)]  flex items-center justify-center">
      <AuthForm
        title="Create an account"
        fields={authFields.register}
        submitText="Register"
        action="Sign In"
        actionUrl="/login"
        onSubmit={handleRegister}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default Register;
