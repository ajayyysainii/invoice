"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { getBuyers, Buyer } from '@/api/buyers'
import {Trash,SquarePen} from 'lucide-react'
import axios from 'axios'

// interface Prop{
//     onclick: ()=>void
// }


const BuyersList = () => {

    const [buyers, setBuyers] = React.useState<Buyer[]>([]);

    useEffect(() => {
        getList();
    }, [])

    const getList = async () => {
        const list = await getBuyers()
        setBuyers(list)
    }

    const handleDeleteBuyer = async (id)=>{
        console.log("delete buyer", id)

        await axios.patch('http://localhost:4000/buyer/delete/'+id)

    }
    return (
        <div className='bg-white w-[90%] h-[95%] rounded-md flex flex-col items-center gap-4 pt-6 overflow-auto'>
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
                    <div className='flex flex-col items-center gap-3'>
                        <p><Trash onClick={() => handleDeleteBuyer(buyer._id)} /></p>
                        <p><SquarePen /></p>
                    </div>
                </div>
            ))}
             {buyers.length===0 && <div>No Buyers Found</div>}
        </div>

       
    )
}

export default BuyersList