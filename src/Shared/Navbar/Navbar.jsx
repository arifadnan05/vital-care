import { FaCartPlus } from 'react-icons/fa6'
import logo from '../../../public/logo.png'
const Navbar = () => {

    const navLinks = <>
        <li><a>Home</a></li>
        {/* <label className="cursor-pointer grid place-items-center ml-2">
            <input type="checkbox" value="dark" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
            <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
            <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </label> */}

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

        <div>
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

                    <button className="btn">Join Us</button>


                    {/* {
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


                                <p className="ml-4 mb-4">{user?.displayName}</p>

                                <li className='mt-2'>
                                    <button onClick={handleLogOut} className='bg-gray-200 block text-center'>Logout</button>
                                </li>
                            </ul>
                        </div>
                    } */}




                </div>
            </div>
        </div>
    )
}

export default Navbar
