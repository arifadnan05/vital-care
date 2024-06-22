import { Outlet } from "react-router-dom";
import Container from "../../Shared/Container/Container";
import DashboardNav from "./DashboardNav/DashboardNav";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
    return (
        <Container>
            <Helmet>
                <title>Vital Care | Dashboard</title>
            </Helmet>
            <div className="flex">
                <div className="lg:w-64">
                    <DashboardNav></DashboardNav>
                </div>
                <div className="flex-1 md:ml-28">
                   
                    <Outlet></Outlet>
                </div>

            </div>
        </Container>
    )
}

export default Dashboard
