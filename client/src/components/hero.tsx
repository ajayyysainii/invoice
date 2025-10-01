import React from 'react'
import Image from 'next/image';
import { MoveUpRight } from 'lucide-react'

const Hero = () => {
    return (
        <div className='min-h-screen min-w-screen items-center flex flex-col'>
            <header className='flex items-center w-[85vw] justify-between px-6 py-4 mt-6'>
                <div className='text-xl font-bold'>LOGO</div>
                <div className='flex gap-4 font-semibold'>
                    <button className='z-100 px-4 py-2 text-gray-700 hover:text-gray-900'>Login</button>
                    <button className='z-10 px-4 py-2 bg-[#FFF7F1] flex gap-2 items-center justify-center ring-1 ring-white rounded-[8px]'>Try for Free <span><MoveUpRight /></span></button>
                </div>
            </header>
            <main className='flex items-start justify-evenly w-[85vw] mt-10'>
                <section className='flex flex-col gap-4 items-start mt-20'>
                    <h1 className='text-6xl font-bold'>Grow your Presence.
                        <span className='block'>Dominate Reddit.</span>
                    </h1>
                    <h2 className='text-2xl font-semibold'>Your Reddit growth assistant: AI content, <span className='block'>community targeting, real results</span>
                    </h2>
                    <div className='flex flex-col items-end gap-2'>
                        <button className='bg-primaryColor text-white px-4 py-1 rounded-[8px]'>Dominate Reddit Now</button>
                        <p className='text-xs font-normal text-gray-400 '>Start with 5 Free Credits</p>
                    </div>
                </section>
                <section className='flex flex-col items-center pt-10'>
                    <div className="p-5 z-100 bg-white rounded-2xl shadow-[0px_7px_26.100000381469727px_0px_rgba(0,0,0,0.25)] outline-offset-[-2px] outline-4 outline-orange-600/50 inline-flex flex-col justify-start items-start gap-1.5">
                        <div className="flex flex-col justify-start items-start gap-4">
                            <div className="flex flex-col justify-start items-start gap-2">
                                <div className="w-[482.76px] justify-center text-black  font-bold">Every time I turn on the camera, she walks right in front of it, sits down, and stares like she’s the boss. Co-workers now greet her before they greet me.</div>
                            </div>
                            <div className='flex items-center gap-4 -ml-11'>
                                <button className='bg-primaryColor text-white font-semibold py-1 rounded-2xl px-4 shadow-[0px_7px_26.100000381469727px_0px_rgba(0,0,0,0.25)]'>11K</button>
                                <button className='bg-gray-300 py-1 rounded-2xl px-4 shadow-[0px_7px_26.100000381469727px_0px_rgba(0,0,0,0.25)] font-semibold'>2K</button>
                                <button className='bg-gray-300 py-1 rounded-2xl px-4 shadow-[0px_7px_26.100000381469727px_0px_rgba(0,0,0,0.25)] font-semibold'>Share</button>
                            </div>
                        </div>
                    </div>
                    <div className='-m-3 z-0'>
                        <Image src="/skeleteonPost.png" alt='skeleton' width={400} height={200} />
                        {/* <img src="/skeleteonPost.png" alt='skeleton' className='w-[400px] h-[500px]'  /> */}
                    </div>
                </section>
            </main>
            <section className='items-center flex flex-col justify-center mt-10 gap-4  h-[70vh]'>
                <h1 className='text-7xl font-bold text-primaryColor'>110.4 million daily active users</h1>
                <p className='text-4xl font-bold'>Tap into Reddit's ever growing market</p>
                <p className='text-4xl font-bold'>with grow on Reddit</p>

            </section>
        </div>
    )
}

export default Hero