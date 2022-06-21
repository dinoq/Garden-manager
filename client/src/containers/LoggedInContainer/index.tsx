import { Route, Routes } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Error404 from "../../pages/Error404";
import GardenPage from "../../pages/GardenPage";

function LoggedInContainer() {

    return (
        <>
            <div className="menu-container">
                <SideBar />
            </div>
            <div className="content-container">
                <Routes>
                    <Route path='/' element={<GardenPage />} />
                    <Route path='*' element={<Error404 />} />
                </Routes>
            </div>
        </>
    );
}

export default LoggedInContainer;
