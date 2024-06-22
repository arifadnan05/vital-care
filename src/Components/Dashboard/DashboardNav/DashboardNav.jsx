import { HiMenuAlt1 } from "react-icons/hi"
import { NavLink } from "react-router-dom"
import useAdmin from "../../../Hooks/useAdmin"
import useSeller from "../../../Hooks/useSeller";
import useUser from "../../../Hooks/useUser";
import logo from '../../../../public/logo.png'

const DashboardNav = () => {
    const [isAdmin] = useAdmin();
    const [isSeller] = useSeller()
    const [isUser] = useUser()
    return (
        <div>
            <div className="drawer lg:drawer-open z-50">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-end justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn text-2xl drawer-button lg:hidden"><HiMenuAlt1 /></label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-[#6861CE] text-base-content text-lg gap-y-6">
                        <img className="w-[220px]" src={logo} />
                        {/* Admin Routes */}
                        {
                            isAdmin && <>
                                <NavLink to="/dashboard/admin-statistics"><li>Statistics</li></NavLink>
                                <NavLink to="/dashboard/manage-users"><li>Manage Users</li></NavLink>
                                <NavLink to="/dashboard/manage-category"><li>Manage Category</li></NavLink>
                                <NavLink to="/dashboard/manage-payment"><li>Payment Management</li></NavLink>
                                <NavLink to="/dashboard/sales-report"><li>Sales Report</li></NavLink>
                                <NavLink to='/dashboard/manage-advertisement'><li>Manage banner Advertise</li></NavLink>
                            </>
                        }

                        {/* Seller Routes */}

                        {
                            isSeller && <>
                                <NavLink to="/dashboard/statistics"><li>Statistics</li></NavLink>
                                <NavLink to='/dashboard/manage-medicine'><li>Manage Medicines</li></NavLink>
                                <NavLink to="/dashboard/payment-history"><li>Payment History</li></NavLink>
                                <NavLink to='/dashboard/request-advertisement'><li>Ask For Advertisement</li></NavLink>
                            </>





                        }
                        {/* user routes */}
                        {
                            isUser && <>
                                <NavLink to='/dashboard/user-payment-history'><li>Payment history</li></NavLink>
                            </>
                        }



                    </ul>

                </div>
            </div>
        </div>
    )
}

export default DashboardNav
