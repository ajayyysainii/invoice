"use client"
import React, {useEffect, useState} from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation'
import axios from "axios";
import { getToken } from "@/utils/auth";

type Inputs = {
    email: string
    password: string
}

const Login = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const token = getToken();
        if(token){
            router.push("/dashboard")
        } else {
            setIsLoading(false);
        }
    },[router])

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)

        try {
            const response = await axios.post("http://localhost:4000/user/login", {
                email: data.email,
                password: data.password
            })

            console.log(response.data)
            const token = response.data.token;
            localStorage.setItem("accessToken", token);

            
            if (response.data.success) {
              router.push("/dashboard")
            }
        } catch (error) {
            console.error("Login failed:", error)
        }
    }



    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <>
        <div>Login</div>
        <form onSubmit={handleSubmit(onSubmit)}>
      
        <input className="border p-2" placeholder="email" {...register("email")} /> <br />
        <input className="border p-2" placeholder="password" {...register("password")} /> <br />
  
        <input className="bg-blue-400 m-2 p-2 cursor-pointer" type="submit" />
  
      </form>
      </>
    )
}

export default Login