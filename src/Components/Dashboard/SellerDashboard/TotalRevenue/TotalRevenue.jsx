import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../../Hooks/useAxiosSecure"
import useAuth from "../../../../Hooks/useAuth"
import { FaDollarSign } from "react-icons/fa6"

const TotalRevenue = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: totalRevenue = [] } = useQuery({
        queryKey: ['totalRevenue'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/seller-revenue/${user.email}`)
            return res.data
        }
    })

    const totalPaidPrice = totalRevenue.reduce((total, item) => {
        return item.status === 'paid' ? total + parseInt(item.price) : total;
    }, 0);

    const totalPendingPrice = totalRevenue.reduce((total, item) => {
        return item.status === 'pending' ? total + parseInt(item.price) : total;
    }, 0);


    return (
        <div className="mt-10">
            <div className="flex justify-around">


                <div className="w-[300px] h-[150px] bg-gray-300 rounded-lg flex justify-around items-center">
                    <div>
                        <p className="p-5 bg-green-600 text-white text-2xl rounded-lg"><FaDollarSign /></p>
                    </div>
                    <div>
                        <p className="text-lg">Paid Total</p>
                        <p className="text-2xl">${totalPaidPrice}</p>
                    </div>

                </div>
                <div className="w-[300px] h-[150px] bg-gray-300 rounded-lg flex justify-around items-center">
                    <div>
                        <p className="p-5 bg-red-600 text-white text-2xl rounded-lg"><FaDollarSign /></p>
                    </div>
                    <div>
                        <p className="text-lg">Pending Total</p>
                        <p className="text-2xl">${totalPendingPrice}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TotalRevenue