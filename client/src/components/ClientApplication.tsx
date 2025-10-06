"use client"
import { useEffect } from 'react'
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/auth";

const ClientApplication = ({children}) => {

    const router = useRouter();

    useEffect(()=>{
      const token = getToken();
      
      if(token == null){
        router.push("/login")
      }
      
  },[router])
  
  
    return children;
}

export default ClientApplication