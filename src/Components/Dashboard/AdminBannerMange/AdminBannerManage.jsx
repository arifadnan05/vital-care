import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import Swal from "sweetalert2"
import { FaRegTrashAlt } from "react-icons/fa"

const AdminBannerManage = () => {

    const axiosSecure = useAxiosSecure()
    const { data: bannerPendingStatus = [], refetch } = useQuery({
        queryKey: ['bannerPendingStatus'],
        queryFn: async () => {
            const res = await axiosSecure.get('/advertisement')
            return res.data
        }
    })
    const handleChangeStatus = item => {
        axiosSecure.patch(`/advertisement/${item._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Accept Banner Advertisement`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                console.log(res.data)
            })

    }
    const handleRemoveSlide = async id => {
        try {
            await axiosSecure.delete(`/advertisement/${id}`)
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Remove slide success`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        catch (error) {
            Swal.fire({
                icon: "error",
                title: "Uhh...",
                text: "Some problem!",
                footer: '<a href="#">Why do I have this issue?</a>'

            });
        }
    }




    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Favorite Color</th>
                        <th>Remove From Slide</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bannerPendingStatus.map(item => <tr key={item._id}>

                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{item.medicine_name}</div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                {item.ad_description}

                            </td>
                            <td><button onClick={() => handleChangeStatus(item)} className={`${item.status === 'pending' ? 'btn btn-success' : ''}`}>{item.status === 'accepted' ? 'accepted' : 'Accept'}</button></td>
                            <th>
                                <button onClick={() => handleRemoveSlide(item._id)} className="btn bg-red-900 text-white"><FaRegTrashAlt /></button>
                            </th>
                        </tr>)

                    }

                </tbody>


            </table>
        </div>
    )
}

export default AdminBannerManage
