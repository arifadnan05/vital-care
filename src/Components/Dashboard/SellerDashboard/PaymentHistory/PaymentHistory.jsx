import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../../Hooks/useAxiosSecure"
import useAuth from "../../../../Hooks/useAuth";

const PaymentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: payment = [] } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSecure.get('payments')
            return res.data
        }
    })
    const userPayments = payment.filter(paymentData => paymentData.seller_email && paymentData.seller_email.includes(user.email));


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">Payment History</h1>
                <table className="w-full mb-8">
                    <thead>
                        <tr>
                            <th className="border-b-2 border-gray-300 p-2 text-left">Transaction ID</th>
                            <th className="border-b-2 border-gray-300 p-2 text-left">Paid</th>
                            <th className="border-b-2 border-gray-300 p-2 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            userPayments.map(item => <tr key={item._id}>
                                <td className="border-b border-gray-200 p-2">{item.transactionId}</td>
                                <td className="border-b border-gray-200 p-2">{item.status === 'paid' ? 'Paid' : 'Pending'}</td>
                                <td className="border-b border-gray-200 p-2 text-right">${item.price}</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PaymentHistory
