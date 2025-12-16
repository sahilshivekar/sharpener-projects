import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-slate-900 text-white" >
      <div className="flex justify-between">
        {/* //website name   */}
        <NavLink to={"/"} className=" mt-2 ml-5 mb-2">
          <h1 className="text-2xl font-bold">NIMAP CART</h1>
        </NavLink>

        <div className="flex justify-end">
        <div className="flex items-center mr-6">
            <NavLink to={"/category"}>
            <div>
              
                <h2 className="text-lg font-bold lg:text-xl">Product-Manage</h2>
            </div>
            </NavLink>
        </div>
        <div className="flex items-center mr-6">
            <NavLink to={"/about-us"}>
            <div>
                <h2 className="text-lg font-bold lg:text-xl">About-us</h2>
            </div>
            </NavLink>
        </div>
        </div>
      </div>
  
    </div>
  );
};

export default Navbar;

