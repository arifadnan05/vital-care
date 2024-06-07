import { Link, useLocation, useNavigate } from 'react-router-dom'
import './login.css'
import logo from '../../../../public/logo.png'
import SocialLogin from '../SocialLogin/SocialLogin'
import useAuth from '../../../Hooks/useAuth'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logInUser } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            await logInUser(email, password)
            navigate(location?.state ? location.state : '/')
            toast.success('Login Successful')

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='bg-image flex items-center'>
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <div className="hidden bg-cover lg:block lg:w-1/2 bg-[url('https://img.freepik.com/premium-vector/nice-good-looking-young-doctor-standing-show-thumb-up_97632-3425.jpg')]"></div>


                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src={logo} />
                    </div>

                    <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                        Welcome back!
                    </p>

                    <SocialLogin></SocialLogin>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                        <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login
                            with email</a>

                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Email Address</label>
                            <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" {...register("email", { required: true })} />
                            {errors.email && <span>This field is required</span>}
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">Password</label>

                            </div>

                            <input id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" {...register("password", { required: true })} />
                            {errors.password && <span>This field is required</span>}
                        </div>

                        <div className="mt-6">
                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                Sign In
                            </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                            <Link to='/register' href="#" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</Link>

                            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
