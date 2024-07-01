import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import Swal from "sweetalert2"
import { FaCheck } from "react-icons/fa6"
import LoadingSpinner from "../../../Shared/loading/LoadingSpinner"

const AdminPaymentManage = () => {

    const axiosSecure = useAxiosSecure()
    const { data: pendingStatus = [], refetch, isLoading } = useQuery({
        queryKey: ['pendingStatus'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments')
            return res.data
        }
    })

    const handleChangeStatus = item => {
        axiosSecure.patch(`/payments/${item._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Payment Paid Done`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                // console.log(res.data)
            })

    }
    if(isLoading) return <LoadingSpinner />
    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                    <h1 className="text-3xl font-bold mb-8">Payment History</h1>
                    <table className="w-full mb-8">
                        <thead>
                            <tr>
                                <th className="border-b-2 border-gray-300 p-2 text-left">Transaction ID</th>
                                <th className="border-b-2 border-gray-300 p-2 text-left">Status</th>
                                <th className="border-b-2 border-gray-300 p-2 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                pendingStatus.map(item => <tr className={`${item.status === 'paid' ? 'bg-green-400' : 'bg-red-400'}`} key={item._id}>
                                    <td className="border-b border-gray-200 p-2">{item.transactionId}</td>
                                    <td className="border-b border-gray-200 p-2">
                                        {item.status === 'paid' ? 'Paid' : 'Pending'}
                                        <button onClick={() => handleChangeStatus(item)} className={`ml-5 btn btn-success ${item.status === 'paid' ? 'hidden' : 'show'}`}> <span><FaCheck /></span> Accept</button>
                                    </td>
                                    <td className="border-b border-gray-200 p-2 text-right">${item.price}</td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminPaymentManage
