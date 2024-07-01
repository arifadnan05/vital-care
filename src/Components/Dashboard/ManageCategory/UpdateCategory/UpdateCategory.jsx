import axios from "axios"
import { useForm } from "react-hook-form"
import { useLoaderData } from "react-router-dom"
import useAxiosSecure from "../../../../Hooks/useAxiosSecure"
import Swal from "sweetalert2"

const UpdateCategory = () => {
    const category = useLoaderData()
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
            const res = await axiosSecure.put(`/update-category/${category._id}`, categoryInfo)
            if (res.data.modifiedCount > 0) {
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${categoryName} updated on the shop`,
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
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center space-y-5 justify-center px-12">
                    <h2 className="text-2xl">Update {category.categoryName} Category</h2>
                    <div className="w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Category Name</label>
                        <input defaultValue={category.categoryName} type="text" placeholder="Type here" className="input input-bordered w-full" {...register("categoryName", { required: true })} />
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
        </div>
    )
}

export default UpdateCategory
