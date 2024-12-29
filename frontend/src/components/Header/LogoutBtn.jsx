import React from "react";
import { useDispatch } from "react-redux";
// import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        // authService.logout().then(() => {
            dispatch(logout());
            navigate("/");
        // })
    }

    return (
        <button 
            onClick={logoutHandler}
            className={`
                px-4 py-2
                md:px-5 md:py-2.5
                rounded-lg 
                font-medium 
                transition-all 
                duration-300
                text-base
                md:text-lg
                relative 
                overflow-hidden 
                group 
                text-gray-300
                hover:text-white
                focus:outline-none 
                focus:ring-2 
                focus:ring-red-500
                hover:transform 
                hover:scale-105
                active:scale-95
            `}
        >
            <span className="relative z-10">Logout</span>
            <div 
                className="
                    absolute 
                    inset-0 
                    h-full 
                    w-full 
                    bg-gradient-to-r 
                    from-red-400 
                    to-red-500 
                    opacity-0 
                    group-hover:opacity-20 
                    transition-opacity 
                    duration-300
                "
            />
        </button>
    );
}

export default LogoutBtn;