import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../../Shared/Navbar/Navbar'

const Root = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div>
            {noHeaderFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
        </div>
    )
}

export default Root
