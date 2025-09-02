"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const GoogleSuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("accessToken", token); 
      router.push("/dashboard"); 
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Logging you in with Google...</p>
    </div>
  );
};

export default GoogleSuccessPage;
