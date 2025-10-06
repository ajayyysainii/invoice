"use client"
import axios from 'axios'
import React, { useEffect } from 'react'
import Image from 'next/image'

const BuyersList = () => {

    interface Buyer { id?: string; _id?: string; name?: string; nameOfBusiness?: string; phone?: number;}

    const [buyers, setBuyers] = React.useState<Buyer[]>([]);

    useEffect(() => {
        getList();
    }, [])

    const getList = async () => {
        const token = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        const response = await axios.get("http://localhost:4000/buyer/list", token)
        console.log(response.data.message)
        setBuyers(response.data.message)
    }

    return (
        <div className='bg-white w-[90%] h-[95%] rounded-md flex flex-col items-center gap-4 pt-6'>
            {buyers.map((buyer) => (
                <div key={buyer.id || buyer._id} className='bg-gray-200 w-[90%] grid grid-cols-[20%_70%_10%] p-3 rounded-lg items-center '>
                    <Image className='rounded-full'
                        src="/user.jpg"
                        width={50}
                        height={50}
                        alt="Picture of the author"
                    />
                    <div >
                        <h1>{buyer.name}</h1>
                        <p>{buyer.nameOfBusiness}</p>
                        <p>{buyer.phone}</p>
                    </div>
                    <div>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BuyersList