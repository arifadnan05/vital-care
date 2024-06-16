import { Outlet } from "react-router-dom";
import Container from "../../Shared/Container/Container";
import DashboardNav from "./DashboardNav/DashboardNav";

const Dashboard = () => {
    const isAdmin = true;
    return (
        <Container>
            <div className="flex">
                <div className="w-64">
                    <DashboardNav></DashboardNav>
                </div>
                <div className="flex-1 ml-28">
                    <Outlet></Outlet>
                </div>

            </div>
        </Container>
    )
}

export default Dashboard
