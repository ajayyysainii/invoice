'use client'
import useAuthRedirect from "@/hooks/useAuthRedirect";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";


const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/google`;
};
export default function Login() {
  useAuthRedirect();
  const router=useRouter()
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`, form);
      localStorage.setItem("accessToken", res.data.token);
      alert("Login successful");
      router.replace("/dashboard");
    } catch (err:unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Error");
      } else {
        alert("Unexpected error");
      }
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>

    <button
        onClick={handleGoogleLogin}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md"
      >
        Sign in with Google
      </button>
    </>
  );
}
