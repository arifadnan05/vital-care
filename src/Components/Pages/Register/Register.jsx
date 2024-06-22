import './register.css'
import logo from '../../../../public/logo.png'
import { useForm } from 'react-hook-form'
import useAuth from '../../../Hooks/useAuth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import SocialLogin from '../SocialLogin/SocialLogin'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { Helmet } from 'react-helmet-async'

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure()

    const { createUser, updateUserProfile } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const { email, password, photo, name, role } = data;
        const formData = new FormData()
        formData.append('image', photo[0])
        try {

            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)

            await createUser(email, password)

            await updateUserProfile(name, data.data.display_url)
            const userInfo = {
                name: name,
                email: email,
                image: data.data.display_url,
                role: role
            }
            axiosSecure.post('/users', userInfo)
            navigate(location?.state ? location.state : '/')
            toast.success('SignUp Success')

        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div className='bg-image'>
            <Helmet>
                <title>Vital Care | Register</title>
            </Helmet>
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-5xl">
                <div className="hidden bg-cover lg:block lg:w-1/2 bg-[url('https://img.freepik.com/premium-vector/nice-good-looking-young-doctor-standing-show-thumb-up_97632-3425.jpg')]"></div>

                <section className="bg-white mx-auto dark:bg-gray-900">
                    <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
                            <div className="flex justify-center mx-auto">
                                <img className="w-auto h-7 sm:h-8" src={logo} />
                            </div>

                            <SocialLogin></SocialLogin>
                            <div className='divider'>OR</div>
                            <div className="relative flex items-center mt-8">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>

                                <input type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="UserName" {...register("name", { required: true })} />
                                {errors.name && <span>This field is required</span>}
                            </div>

                            <label htmlFor="dropzone-file" className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>

                                <h2 className="mx-3 text-gray-400">Profile Photo</h2>

                                <input id="dropzone-file" type="file" className="hidden" {...register("photo", { required: true })} />
                                {errors.photo && <span>This field is required</span>}
                            </label>

                            <div className="relative flex items-center mt-6">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>

                                <input type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" {...register("email", { required: true })} />
                                {errors.email && <span>This field is required</span>}
                            </div>
                            <div className="relative flex items-center mt-4">

                                <select className='block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40' {...register("role")}>
                                    <option disabled>Select Role</option>
                                    <option value="user">User</option>
                                    <option value="seller">Seller</option>
                                </select>
                            </div>

                            <div className="relative flex items-center mt-4">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>

                                <input type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" {...register("password", { required: true })} />
                                {errors.password && <span>This field is required</span>}
                            </div>

                            <div className="mt-6">
                                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    Sign Up
                                </button>

                                <div className="mt-6 text-center ">
                                    <Link to='/login' href="#" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                        Already have an account?
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Register
