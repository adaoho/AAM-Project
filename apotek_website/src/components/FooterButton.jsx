import { BsCartPlus } from "react-icons/bs";
import { Outlet } from "react-router-dom";

const FooterButton = ({ children }) => {
  return (
    <div className="inset-0 flex items-start justify-center">
      <div className="fixed bottom-0 w-screen md:w-[520px] h-[80px] bg-gray-50 flex justify-between items-center px-[30px] rounded-t-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        {children}
      </div>
    </div>
  );
};

export default FooterButton;
