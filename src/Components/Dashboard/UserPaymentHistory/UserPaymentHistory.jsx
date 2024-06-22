import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import useAuth from "../../../Hooks/useAuth"

const UserPaymentHistory = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: userHistory = [] } = useQuery({
        queryKey: ['userHistory'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-payment-history/${user.email}`)
            return res.data
        }
    })
    console.log(userHistory)
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">Payment History</h1>
                
                <table className="w-full mb-8">
                    <thead>
                        <tr>
                            <th className="border-b-2 border-gray-300 p-2 text-left">Transaction ID</th>
                            <th className="border-b-2 border-gray-300 p-2 text-left">Payment Status</th>
                            <th className="border-b-2 border-gray-300 p-2 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            userHistory.map(item => <tr className={`${item.status === 'paid' ? 'bg-green-400' : 'bg-red-400'}`} key={item._id}>
                                <td className="border-b border-gray-200 p-2">{item.transactionId}</td>
                                <td className="border-b border-gray-200 p-2">
                                    {item.status === 'paid' ? 'Paid' : 'Pending'}
                                </td>
                                <td className="border-b border-gray-200 p-2 text-right">${item.price}</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserPaymentHistory
