"use client"
import React from 'react'
import { createBuyer } from '@/api/buyers'
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    gst: string
    address: string
    nameOfBusiness: string
    email: string
    name: string
    phone: number
}


const BuyerCreate = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

     const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
        try {
            await createBuyer({
                ...data
            })

        } catch (error) {
            alert("There is error" + error)
        }

    }



    return (
        <div className='bg-white w-[90%] h-[95%] rounded-md flex flex-col items-center gap-4 pt-6'>
            <h1>Buyers Creation</h1>
            <div>
                <form className='flex flex-col outline-1' onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder='Name' {...register("name", { required: true })} />
                    <input placeholder='email' {...register("email", { required: true })} />
                    <input placeholder='Name of Business' {...register("nameOfBusiness", { required: true })} />
                    <input placeholder='Phone' {...register("phone", { required: true })} />
                    <input placeholder='Address' {...register("address", { required: true })} />
                    <input placeholder='gst' {...register("gst", { required: true })} />
                    {errors.email && <span>This field is required</span>}

                    <input className='bg-blue-300 p-2 mt-4 cursor-pointer' type="submit" />
                </form>
            </div>
        </div>

    )
}

export default BuyerCreate