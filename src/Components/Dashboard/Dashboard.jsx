import { Outlet } from "react-router-dom";
import Container from "../../Shared/Container/Container";
import DashboardNav from "./DashboardNav/DashboardNav";

const Dashboard = () => {
    return (
        <Container>
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
