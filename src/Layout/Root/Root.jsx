import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../../Shared/Navbar/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../Shared/Footer/Footer';

const Root = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div>
            {noHeaderFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
            {noHeaderFooter} || <Footer></Footer>
            <div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Root
