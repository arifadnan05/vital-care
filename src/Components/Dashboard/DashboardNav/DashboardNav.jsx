import { HiMenuAlt1 } from "react-icons/hi"
import { NavLink } from "react-router-dom"

const DashboardNav = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-end justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn text-2xl drawer-button lg:hidden"><HiMenuAlt1 /></label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-lg gap-y-6">
                        {/* Admin Routes */}
                        <NavLink to="/dashboard/com"><li>Statistics</li></NavLink>
                        <NavLink to="/dashboard/manage-users"><li>Manage Users</li></NavLink>
                        <NavLink><li>Manage Category</li></NavLink>
                        <NavLink><li>Payment Management</li></NavLink>
                        <NavLink><li>Sales Report</li></NavLink>
                        <NavLink><li>Manage banner Advertise</li></NavLink>
                        <div className="divider"></div>

                        {/* Seller Routes */}
                        <li>Statistics</li>
                        <li>Manage Medicines</li>
                        <li>Payment History</li>
                        <li>Ask For Advertisement</li>
                        {/* User Routes */}
                        <div className="divider"></div>
                        <li>Payment history</li>

                    </ul>

                </div>
            </div>
        </div>
    )
}

export default DashboardNav
