import BuyersList from '@/components/BuyersList'
import BuyerCreate from '@/components/BuyerCreate'
const ManageBuyers = () => {
    

       return (
        <div className='flex max-w-screen h-screen'>
            <div className='w-[50%] bg-red-200 flex flex-col justify-center items-center'>
                <BuyerCreate/>
            </div>
            <div className='w-[50%] bg-orange-200 flex flex-col justify-center items-center'>
               <BuyersList/>
            </div>
        </div>
    )
}

export default ManageBuyers