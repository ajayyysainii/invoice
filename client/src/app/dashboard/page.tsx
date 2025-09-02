"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { removeToken } from "@/utils/auth";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const Dashboard = () => {
  useAuthRedirect();
  const router = useRouter();

  const handleLogout = () => {
    removeToken(); 
    router.push("/"); 
  };

  return (
    <div>
      <p>Welcome to Dashboard!</p>
      <button
        onClick={handleLogout}
        className="cursor-pointer border-2 px-4 py-2 rounded-md hover:bg-gray-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
