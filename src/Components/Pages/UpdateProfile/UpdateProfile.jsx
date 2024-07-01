
import { useForm } from "react-hook-form"
import { Helmet } from "react-helmet-async"
import useAuth from "../../../Hooks/useAuth"
import Container from "../../../Shared/Container/Container"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Swal from "sweetalert2"


const UpdateProfile = () => {
    const { updateUserProfile, user } = useAuth()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const { name, photoUrl } = data;
        const formData = new FormData()
        formData.append('image', photoUrl[0])
        try {
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)

            updateUserProfile(name, data.data.display_url)
            navigate('/')
            toast.success('Profile Update success')
        }
        catch (error) {
            Swal.fire({
                icon: "error",
                title: "Uhh...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }




return (
    <Container>
        <div>
            <Helmet>
                <title>Update Profile</title>
            </Helmet>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <h2 className="text-2xl md:text-3xl">Update your name and photo</h2>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input defaultValue={user.displayName} type="text" placeholder="Your name" className="input input-bordered" required {...register("name", { required: true })} />
                    {errors.name && <span>This field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full" required {...register("photoUrl", { required: true })} />
                    {errors.photoUrl && <span>This field is required</span>}
                </div>
                <button className="btn btn-info mt-5">Update</button>
            </form>
        </div>
    </Container>
)

}
export default UpdateProfile