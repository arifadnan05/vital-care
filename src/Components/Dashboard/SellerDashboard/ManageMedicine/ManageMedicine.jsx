import { useForm } from "react-hook-form"
import useAuth from "../../../../Hooks/useAuth"
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import useAxiosSecure from "../../../../Hooks/useAxiosSecure"
import useAxiosPublic from "../../../../Hooks/useAxiosPublic"
import { useQuery } from "@tanstack/react-query"

const ManageMedicine = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const { item_name, item_generic_name, item_image, unit_price, company_name, mg, discount, category, item_description } = data;
        const formData = new FormData()
        formData.append('image', item_image[0])

        try {
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)

            const medicineInfo = {
                item_name: item_name,
                item_generic_name: item_generic_name,
                item_image: data.data.display_url,
                unit_price: unit_price,
                company_name: company_name,
                mg: mg,
                discount: discount,
                category: category,
                item_description: item_description,
                seller_email: user?.email
            }
            const res = await axiosPublic.post('/medicine', medicineInfo)
            if (res.data.insertedId) {
                reset()
                navigate('/dashboard/manage-medicine')
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${item_name} Listed on the shop`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        }
        catch (error) {

            console.log(error.message)
        }
    }
    const { data: medicine = [] } = useQuery({
        queryKey: ['medicine'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/medicine/${user?.email}`)
            return res.data
        }
    })




    return (
        <div>
            <div className="flex justify-center mt-4">
                <h2 className="text-3xl">ADD MEDICINE TO THE WEBSITE</h2>
            </div>
            
            <div className="flex justify-center my-8">
                <button className="btn btn-active btn-neutral" onClick={() => document.getElementById('my_modal_4').showModal()}>Add Medicine</button>
            </div>
            <div className="divider"></div>
            <div>
                <h2 className="text-center my-8 text-3xl">YOUR ADDED MEDICINE</h2>
                <div className="divider"></div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>

                                <th>Name</th>
                                <th>Category</th>
                                <th>Mg</th>
                                <th>Company</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                medicine.map(item => <tr key={item._id}>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.item_image} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.item_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.category}
                                    </td>
                                    <td>{item.mg}mg</td>
                                    <td>{item.company_name}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    {/* Modal content hare */}

                    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account settings</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200">Item Name</label>
                                    <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder="Item Name" {...register("item_name", { required: true })} />

                                    {errors.item_name && <span>This field is required</span>}
                                </div>

                                <div>
                                    <label className="text-gray-700 dark:text-gray-200">Item Generic Name</label>
                                    <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder="Item Generic Name" {...register("item_generic_name", { required: true })} />
                                    {errors.item_generic_name && <span>This field is required</span>}
                                </div>

                                <div>
                                    <label className="text-gray-700 dark:text-gray-200">Upload Photo</label>
                                    <input type="file" className="file-input file-input-bordered block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" {...register("item_image", { required: true })} />
                                    {errors.item_image && <span>This field is required</span>}
                                </div>

                                <div>
                                    <label className="text-gray-700 dark:text-gray-200">Price</label>
                                    <input type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder="Price" {...register("unit_price", { required: true })} />
                                    {errors.unit_price && <span>This field is required</span>}
                                </div>
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200">Company Name</label>
                                    <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder="Company Name" {...register("company_name", { required: true })} />
                                    {errors.company_name && <span>This field is required</span>}
                                </div>

                                <div>
                                    <label className="text-gray-700 dark:text-gray-200">Medicine mg Or ml</label>
                                    <input type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder="mg or ml" {...register("mg", { required: true })} />
                                    {errors.mg && <span>This field is required</span>}
                                </div>

                                <div>
                                    <select className="select select-bordered w-full block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" {...register("discount")}>
                                        <option value="0">No Discount</option>
                                        <option value="5">5%</option>
                                        <option value="10">10%</option>
                                        <option value="15">15%</option>
                                        <option value="20">20%</option>
                                    </select>
                                    {errors.discount && <span>This field is required</span>}
                                </div>
                                <div>
                                    <select className="select select-bordered w-full block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" {...register("category")}>
                                        <option disabled selected>Select Category</option>
                                        <option value="tablet">Tablet</option>
                                        <option value="syrup">Syrup</option>
                                        <option value="capsule">Capsule</option>
                                        <option value="injection">Injection</option>
                                        <option value="saline">Saline</option>
                                        <option value="suppository">Suppository</option>
                                    </select>
                                    {errors.category && <span>This field is required</span>}
                                </div>

                                <div>
                                    <label className="text-gray-700 dark:text-gray-200">Seller Email</label>
                                    <input defaultValue={user.email} disabled type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder="Seller Email" />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-500 dark:text-gray-300">Description</label>

                                    <textarea placeholder="Short Description" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" {...register("item_description", { required: true })}></textarea>
                                    {errors.item_description && <span>This field is required</span>}
                                </div>
                            </div>

                            <div className="flex justify-center mt-6">
                                <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Add medicine</button>
                            </div>
                        </form>
                    </section>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )

}

export default ManageMedicine
