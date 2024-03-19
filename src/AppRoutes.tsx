import { Navigate, Route, Routes } from "react-router-dom";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<span>Home Page</span>} />
            <Route path="/user-profile" element={<span>User Profile</span>} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}