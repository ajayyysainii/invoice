'use client'

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { getToken, removeToken } from "../utils/auth";

export default function useAuthRedirect() {
  const router = useRouter();
  const pathname=usePathname();

  useEffect(() => {
    const checkToken = async () => {
      const token = getToken();
      if (!token) {
        //current route if it was '/dashboard' then move it to '/login'
        if (pathname === "/dashboard") {
            router.replace("/login");
        }
        return;
      } 

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/validate`,
          { headers: { token } }
        );

        if (res.data.success) {
          router.replace("/dashboard");
        } else {
          removeToken();
        }
      } catch (err) {
        console.log(err)
        removeToken();
      }
    };

    checkToken();
  }, [router]);
}
