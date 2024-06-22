import axios from "axios"
import { useForm } from "react-hook-form"
import useAxiosSecure from "../../../../Hooks/useAxiosSecure"
import Swal from "sweetalert2"
import useAuth from "../../../../Hooks/useAuth"

const ReqAdvertisement = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const { image, ad_description, medicine_name } = data
        const formData = new FormData()
        formData.append('image', image[0])


        try {
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)

            const categoryInfo = {
                ad_description: ad_description,
                medicine_name: medicine_name,
                image: data.data.display_url,
                seller_email: user?.email,
                status: 'pending'

            }
            const res = await axiosSecure.post('/advertisement', categoryInfo)
            if (res.data.insertedId) {
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Request success wait for confirmation`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        }
        catch (error) {

            console.log(error.message)
        }
    }
    return (
        <div>
            <div className="flex justify-center my-8">
                <button className="btn btn-active btn-neutral" onClick={() => document.getElementById('my_modal_1').showModal()}>Request For Ads</button>
            </div>
            <div className="divider"></div>

            <div>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col items-center space-y-5 justify-center px-12">
                                <h2 className="text-2xl">Request Banner Advertisement</h2>
                                <div className="w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Medicine Name</label>
                                    <input type="text" placeholder="Medicine Name" className="input input-bordered w-full"  {...register("medicine_name", { required: true })} />
                                    {errors.medicine_name && <span>This field is required</span>}
                                </div>
                                <div className="w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Medicine Description</label>
                                    <input type="text" placeholder="Medicine Description" className="input input-bordered w-full"  {...register("ad_description", { required: true })} />
                                    {errors.ad_description && <span>This field is required</span>}
                                </div>
                                <div className="w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Upload Photo</label>
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
        </div>
    )
}

export default ReqAdvertisement
