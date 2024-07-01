import axios from "axios"
import { useForm } from "react-hook-form"
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import Swal from "sweetalert2"
import { useQuery } from "@tanstack/react-query"
import { FaEdit, FaRegTrashAlt } from "react-icons/fa"
import LoadingSpinner from "../../../Shared/loading/LoadingSpinner"
import { Link } from "react-router-dom"

const ManageCategory = () => {
    const axiosSecure = useAxiosSecure()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        const { image, categoryName } = data
        const formData = new FormData()
        formData.append('image', image[0])


        try {
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)

            const categoryInfo = {
                categoryName: categoryName,
                image: data.data.display_url
            }
            const res = await axiosSecure.post('/manage-category', categoryInfo)
            if (res.data.insertedId) {
                refetch()
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${categoryName} Listed on the shop`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        }
        catch (error) {

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }

    const { data: allCategory = [], refetch, isLoading } = useQuery({
        queryKey: ['allCategory'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/category`)
            return res.data
        }
    })

    const handleDeleteCategory = async id => {
        try {
            await axiosSecure.delete(`/category/${id}`)
            refetch()
            Swal.fire({
                title: "Good job!",
                text: ` This item deleted success `,
                icon: "success"
            });

        }
        catch (error) {
            Swal.fire({
                icon: "error",
                title: "Uhh...",
                text: "You have some problem!",
                footer: '<a href="#">Why do I have this issue?</a>'

            });
        }
    }

    if (isLoading) return <LoadingSpinner />
    return (
        <div>
            <div className="flex justify-center mt-4">
                <h2 className="text-3xl">ADD CATEGORY TO THE WEBSITE</h2>
            </div>

            <div className="flex justify-center my-8">
                <button className="btn btn-active btn-neutral" onClick={() => document.getElementById('my_modal_1').showModal()}>Add Category</button>
            </div>
            <div className="divider"></div>

            <div>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col items-center space-y-5 justify-center px-12">
                                <h2 className="text-2xl">Add Your Category</h2>
                                <div className="w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Category Name</label>
                                    <input type="text" placeholder="Type here" className="input input-bordered w-full" {...register("categoryName", { required: true })} />
                                    {errors.categoryName && <span>This field is required</span>}
                                </div>
                                <div className="w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Upload Category Image</label>
                                    <input type="file" className="file-input file-input-bordered w-full" {...register("image", { required: true })} />
                                    {errors.image && <span>This field is required</span>}
                                </div>
                                <button className="btn btn-neutral w-full">Add Now</button>
                            </div>
                        </form>

                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>


            {/* all category product hare */}

            <div className="overflow-x-auto">
                <h1 className="text-2xl text-center">ALL CATEGORY MEDICINE</h1>
                <div className="divider"></div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allCategory.map(item => <tr key={item._id}>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.categoryName}</div>

                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <Link to={`/dashboard/update-category/${item._id}`}><button className="btn btn-ghost text-2xl"><FaEdit /></button></Link>
                                </td>
                                <th>
                                    <button onClick={() => handleDeleteCategory(item._id)} className="btn btn-ghost text-2xl bg-red-900 text-white"><FaRegTrashAlt /></button>
                                </th>
                            </tr>)
                        }

                    </tbody>


                </table>
            </div>
        </div>
    )
}

export default ManageCategory
