import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const ErrorInput = ({ text }) => {
  return (
    <>
      {text && (
        <div className="flex flex-row gap-x-1 text-red-600 items-center text-[12px] -mt-2">
          <AiOutlineInfoCircle className="size-4" />
          <p>{text}</p>
        </div>
      )}
    </>
  );
};

export default ErrorInput;
