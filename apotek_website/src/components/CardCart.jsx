import React from "react";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { toMoneyRP } from "../utils/static";
import ToggleBar from "./interface/ToggleBar";
import { useDispatch } from "react-redux";
import { removeItemsFormCart } from "../features/cart/cartSlice";

const CardCart = ({ data }) => {
  console.log(data, "<<< data");
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row w-full gap-x-4 border-b-[1px] border-gray-300 pb-3 relative h-fit">
      <img
        src={data?.product?.image[0]}
        alt=""
        className="object-cover size-24 rounded-xl"
      />

      <div className="flex flex-col justify-between w-full relative gap-y-5">
        <div className="text-[14px] text-gray-700 flex flex-col">
          <h1 className="truncate-multiline">{data?.product?.name}</h1>
          <div className="flex text-[10px] text-gray-400 gap-x-2">
            <h1>Quantity: {data?.quantity} </h1> |{" "}
            <h1>Harga Satuan: Rp{toMoneyRP(data?.product?.price)}</h1>
          </div>
        </div>
        <div className="flex w-full flex-row justify-between">
          <h1 className="text-[12px] text-gray-500">
            Total - Rp{toMoneyRP(data?.totalPrice)}
          </h1>
          <div className="gap-x-1 flex">
            {/* <ToggleBar title={"Edit"} /> */}
            <div onClick={() => dispatch(removeItemsFormCart(data))}>
              <ToggleBar
                title={"Delete"}
                color={"bg-aam-10/20 border-aam-10 text-aam-10"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCart;
