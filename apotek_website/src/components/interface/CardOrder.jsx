import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineMedicineBox } from "react-icons/ai";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../features/cart/cartSlice";
import ToggleBar from "./ToggleBar";
import BottomSheet from "./BottomSheet";
import { setModalBottom } from "../../features/component/componentSlice";

const CardOrder = ({ type }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const renderCard = (type) => {
    switch (type) {
      case "compact":
        return (
          <div className="h-fit flex flex-row w-full border relative p-3 rounded-xl">
            <div className="flex w-full justify-between">
              {/* Order Information */}
              <div className="flex w-full gap-x-4">
                <div className="p-2 border rounded-md flex justify-center items-center">
                  <AiOutlineMedicineBox />
                </div>
                <div className="flex flex-col justify-center">
                  <h1 className="text-[13px] -mb-0.5">Obat Kesehatan</h1>
                  <p className="text-[13px] text-gray-500">3 Agustus 2024</p>
                </div>
              </div>

              <div className="flex flex-col text-[12px] text-gray-500 w-full items-end">
                <h1>Harga Total</h1>
                <h1 className="text-[14px] text-gray-600">Rp 120.000</h1>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="h-fit flex flex-row w-full border relative p-3 rounded-xl">
            <div className="flex flex-col w-full">
              <div className="flex w-full border-b-[1px] mb-3 pb-3 justify-between">
                {/* Order Information */}
                <div className="flex w-full gap-x-4">
                  <div className="p-2 border rounded-md flex justify-center items-center">
                    <AiOutlineMedicineBox />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-[13px] -mb-0.5">Obat Kesehatan</h1>
                    <p className="text-[13px] text-gray-500">3 Agustus 2024</p>
                  </div>
                </div>
                {/* Transaction Status */}
                <div className="flex gap-x-1 justify-end items-start w-full">
                  <ToggleBar type={"card"} title={"Berhasil"} />
                  <SlOptionsVertical
                    className="text-aam-40 mt-1 size-4"
                    onClick={() => dispatch(setModalBottom(true))}
                  />
                </div>
              </div>
              <div className="flex w-full gap-x-4 ">
                <div className="size-24 flex overflow-hidden rounded-lg">
                  <img
                    src="/sample/test_med_photo.jpg"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-y-1 justify-between">
                  <div className="flex flex-wrap w-[200px] h-fit">
                    <h1 className="text-[14px] text-gray-700 font-bold">
                      Jellybee Multivitamin + Panadol Cold + Panadol ...
                    </h1>
                  </div>
                  <div className="flex flex-col text-[12px] text-gray-500">
                    <h1>Harga Total</h1>
                    <h1 className="text-[14px] text-gray-600">Rp 120.000</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return <>{renderCard(type)}</>;
};

export default CardOrder;
