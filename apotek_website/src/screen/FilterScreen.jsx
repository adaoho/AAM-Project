import React from "react";
import MobileLayout from "../layout/MobileLayout";
import HeaderBack from "../components/HeaderBack";
import FooterButton from "../components/FooterButton";
import Button from "../components/interface/Button";
import { useNavigate } from "react-router-dom";

const FilterScreen = () => {
  let navigate = useNavigate();
  return (
    <>
      <MobileLayout>
        <HeaderBack onClick={() => navigate(-1)} title={"Filter"} />

        <div className="flex flex-col w-full h-full justify-start gap-y-2 mt-8">
          <h1>Urutkan</h1>
          <div className="flex flex-row gap-2 w-full flex-wrap">
            {/* Selected Option */}
            <div className="bg-gray-500 rounded-2xl text-[14px] px-3 py-1 text-white">
              Terbaru
            </div>
            <div className="bg-gray-300 rounded-2xl text-[14px] px-3 py-1 text-gray-800">
              Harga Tertinggi
            </div>
            <div className="bg-gray-300 rounded-2xl text-[14px] px-3 py-1 text-gray-800">
              Populer
            </div>
            <div className="bg-gray-300 rounded-2xl text-[14px] px-3 py-1 text-gray-800">
              Harga Terendah
            </div>
          </div>
        </div>

        <FooterButton>
          <div className="w-full gap-x-2 flex">
            <Button className={"w-full"} label={"Reset Filter"} />
            <Button label={"Apply"} className={"w-full"} />
          </div>
        </FooterButton>
      </MobileLayout>
    </>
  );
};

export default FilterScreen;
