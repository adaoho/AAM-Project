import React from "react";
import { BiCart, BiHomeAlt } from "react-icons/bi";
import { CgNotes, CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";

const NavBarLayout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  let location = useLocation();
  let loc = location.pathname;

  let activeStyle =
    "text-aam-20 transition-all active:scale-90 flex flex-col justify-center items-center font-bold w-[60px]";
  let pathStyle =
    "text-gray-400 transition-all active:scale-90 flex flex-col justify-center items-center font-bold w-[60px]";
  return (
    <div className="inset-0 flex items-start justify-center">
      <div className="w-screen md:w-[520px] h-full flex justify-center items-center fixed overflow-scroll font-lexendDeca ">
        <div className="w-full h-full flex flex-col justify-between items-center">
          <Outlet />
        </div>

        {/* Navbar */}
        <div className="fixed bottom-0 w-screen md:w-[520px] h-[75px] px-4 z-30 pb-3 bg-gradient-to-t from-aam-20 to-transparent">
          <div className="bg-white rounded-[20px] h-full w-full flex gap-x-3 px-[1.5rem] justify-between items-center shadow-lg">
            <div className="flex gap-x-6 w-full justify-center">
              <Link to={"/"}>
                <div className={`${loc === "/" ? activeStyle : pathStyle}`}>
                  <BiHomeAlt className="size-6 mb-0.5" />
                  <p className="text-[10px]">Home</p>
                </div>
              </Link>
              <div className="relative">
                <Link to={"/profile/cart"}>
                  <div
                    className={`${
                      loc === "/profile/cart" ? activeStyle : pathStyle
                    }`}
                  >
                    <BiCart className="size-6 mr-1 mb-0.5" />
                    <p className="text-[10px]">Keranjang</p>
                  </div>
                </Link>
                {cartItems?.length > 0 && (
                  <div className="size-4 rounded-full bg-red-500 absolute right-2 -top-1 flex justify-center items-center text-white text-[9px]">
                    {cartItems?.length}
                  </div>
                )}
              </div>
              <Link to={"/order"}>
                <div
                  className={`${loc === "/order" ? activeStyle : pathStyle}`}
                >
                  <CgNotes className="size-6 mb-0.5" />
                  <p className="text-[10px]">Transaksi</p>
                </div>
              </Link>
              <Link to={"/profile"}>
                <div
                  className={`${loc === "/profile" ? activeStyle : pathStyle}`}
                >
                  <CgProfile className="size-6 mb-0.5" />
                  <p className="text-[10px]">Profil</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarLayout;
