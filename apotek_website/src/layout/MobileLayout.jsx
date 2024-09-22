import React from "react";

const MobileLayout = ({ children, isNavbar }) => {
  return (
    <>
      <div className="inset-0 flex items-start justify-center">
        <div className="fixed w-screen md:w-[520px] h-full flex justify-center items-center overflow-scroll font-lexendDeca">
          <div className="w-full h-full flex flex-col justify-between items-center px-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileLayout;
