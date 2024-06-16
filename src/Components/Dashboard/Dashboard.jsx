import { Outlet } from "react-router-dom";
import Container from "../../Shared/Container/Container";
import DashboardNav from "./DashboardNav/DashboardNav";

const Dashboard = () => {
    const isAdmin = true;
    return (
        <Container> 
            <div>
                <DashboardNav></DashboardNav>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </Container>
    )
}

export default Dashboard
