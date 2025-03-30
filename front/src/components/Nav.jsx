import React from "react";

const Navbar = () => {
  const token = localStorage.getItem("token"); // Check if user is authenticated

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="bg-blue-300 h-24 relative">
      <div className="absolute top-0 left-0 w-full h-20 bg-black clip-path-trapezoid flex items-center justify-end text-white px-56">
        <a href="#" className="font-bold mx-4">Teams</a>
        <a href="#" className="font-bold mx-4">College</a>
        <a href="/dashboard" className="font-bold mx-4">Dashboard</a>

        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 shadow-lg text-lg rounded mx-4"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 shadow-lg text-lg rounded mx-4"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
