import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

export default function Empty({ message, address, label }) {


    return (
        <div className='min-h-[calc(100vh-116px)] gap-5 flex flex-col justify-center items-center pb-16 '>
            <p className='text-gray-600 text-xl lg:text-3xl'>{message}</p>

            <NavLink to={address} className="btn  hover:outline text-[16px] bg-purple-500 hover:bg-transparent text-white hover:text-black mr-3"><IoMdArrowRoundBack></IoMdArrowRoundBack>{label}</NavLink>
        </div>
    )
}