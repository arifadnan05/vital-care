import { FaCartPlus } from 'react-icons/fa6'
import logo from '../../../public/logo.png'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../Hooks/useAuth'
import Container from '../Container/Container'
const Navbar = () => {
    const { user, logOut } = useAuth()

    const navLinks = <>
        <NavLink to="/"> <li><a>Home</a></li></NavLink>
        <li><a>Shop</a></li>
        <li>
            <details>
                <summary>Languages</summary>
                <ul className="w-64">

                    <li><a>Bangla</a></li>

                    <li><a>Hindi</a></li>

                    <li><a>Arabic</a></li>

                </ul>
            </details>
        </li>
        <li className='text-3xl'><a><FaCartPlus /></a></li>
    </>

    return (

        <Container>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-64">

                            {navLinks}
                        </ul>
                    </div>
                    <img className='w-[220px]' src={logo} />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 z-50">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">

                    {
                        !user && <Link to='/login'><button className="btn">Join Us</button></Link>
                    }


                    {
                        user && <div className='dropdown dropdown-end z-50'>
                            <div
                                tabIndex={0}
                                role='button'
                                className='btn btn-ghost btn-circle avatar'
                            >
                                <div className='w-10 rounded-full' title={user?.displayName}>
                                    <img
                                        referrerPolicy='no-referrer'
                                        alt='User Profile Photo'
                                        src={user?.photoURL}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>


                                <p className="ml-4 mb-4 cursor-pointer hover:bg-gray-200 block py-1 hover:rounded-md">Update Profile</p>
                                <Link to='/dashboard'>
                                    <p className="ml-4 mb-4 cursor-pointer hover:bg-gray-200 block py-1 hover:rounded-md">Dashboard</p>
                                </Link>

                                <li className='mt-2'>
                                    <button onClick={logOut} className='bg-gray-200 block text-center'>Logout</button>
                                </li>
                            </ul>
                        </div>
                    }




                </div>
            </div>
        </Container>
    )
}

export default Navbar
