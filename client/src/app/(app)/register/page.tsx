'use client'
import { useState, ChangeEvent,FormEvent } from "react";
import axios from "axios";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useRouter } from "next/navigation";

export default function Register() {
  useAuthRedirect();
  const router=useRouter()
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, form);
      alert(res.data.message || "Registered successfully");
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
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
}
