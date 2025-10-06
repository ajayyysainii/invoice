"use client"

import Image from "next/image";
import Hero from "@/components/hero";
import Procedure from "@/components/steps";

export default function Home() {
 
  
  

  return (
    // <div className="min-w-screen flex flex-col justify-between overflow-hidden">
    //   <p className=" text-center text-3xl">Aa gaya bhai kitna kaam kiya tumne</p>
    //   <Simple1 />

    // </div>
    <div className="flex flex-col items-center">
      <div className="relative bg-[url('/lines_upper.svg')] bg-cover bg-center">
        <Image src="/gradient.png" alt="" width={1920} height={1080} className="absolute" />
        <Hero />
      </div>
      
      <Procedure />
      

    </div>

  );
}
