import React from "react";
import { Grid, User, LogOut } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/cube.png'

const AdminSidebar = () => {
  const navigate = useNavigate();
  
  const navItems = [
    { to: "/admin", label: "Dashboard", icon: Grid },
  ];

  function handleLogout() {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('profileImage');
    
    // Redirect to landing page
    navigate('/');
  }

  return (
    <div className="basis-[16%] relative px-4 py-6 min-h-[100vh] bg-[#09090B] text-white">
      <Link to='/admin' className="flex items-center gap-x-3">
        <img src={Logo} alt="" />
        <h1 className="font-bold text-2xl text-white">Deliveroo</h1>
      </Link>
      <nav>
        <ul>
          {navItems.map(({ label, icon: Icon }) => {
            return (
              <li
                key={label}
                className="cursor-pointer hover:bg-[#18181A] p-2 mb-5"
              >
                <Link to="/admin" className="flex items-center space-x-2">
                  <Icon />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button 
        className="text-sm hover:bg-[#18181A] w-[90%] cursor-pointer absolute bottom-5 p-2"
        onClick={handleLogout}
      >
        <span className="flex items-center space-x-2">
          <LogOut className="mx-3" />
          Logout
        </span>
      </button>
    </div>
  );
};

export default AdminSidebar;
