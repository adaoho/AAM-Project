import React from "react";

const ToggleBar = ({ title, description, type, color }) => {
  const renderToggle = (type) => {
    switch (type) {
      case "transaction":
        return (
          <div className="text-[12px] text-aam-20 text-center px-2 bg-aam-20/10 rounded-xl border-aam-20 border flex justify-center items-center">
            {title} {description}
          </div>
        );
      case "card":
        return (
          <div className="bg-aam-20 text-white text-[11px] rounded-lg px-3 py-1 flex justify-center items-center max-h-7">
            {title} {description}
          </div>
        );

      default:
        return (
          <div
            className={`text-[12px] text-center px-2 ${
              color ? color : "bg-aam-20/10 border-aam-20 text-aam-20"
            }  rounded-xl border flex justify-center items-center`}
          >
            {title} {description}
          </div>
        );
    }
  };

  return <>{renderToggle(type)}</>;
};

export default ToggleBar;
