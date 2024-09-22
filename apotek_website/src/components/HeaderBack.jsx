import { BiLeftArrowAlt } from "react-icons/bi";
import React from "react";

const HeaderBack = ({ title, onClick, backButton = true, subtitle }) => {
  return (
    <>
      {/* Header */}
      <div className="w-full flex h-fit py-3 justify-start items-start gap-x-3 sticky top-0 bg-white z-40">
        {backButton ? (
          <>
            <div className="flex justify-center items-center h-full w-10 active:scale-90 transition-all border rounded-lg">
              <BiLeftArrowAlt
                onClick={onClick}
                className="w-12 size-7 text-gray-900"
              />
            </div>
            <div className="flex flex-col pr-8">
              <h1 className="text-gray-600 font-bold text-[18px] truncate-singleline">
                {title}
              </h1>
              <h1 className="text-gray-400 text-[11px]">{subtitle}</h1>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <h1 className="text-gray-600 font-bold text-[18px]">{title}</h1>
              <h1 className="text-gray-400 text-[11px]">{subtitle}</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HeaderBack;
