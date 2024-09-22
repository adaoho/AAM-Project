import React, { useState } from "react";
import BottomSheet from "./interface/BottomSheet";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../features/cart/cartSlice";
import { setModalBottom } from "../features/component/componentSlice";
import { toast } from "sonner";
import Button from "./interface/Button";
import { selectedItemValue } from "../features/product/productSlice";
import { toMoneyRP } from "../utils/static";

const AddCartBottomSheet = () => {
  const dispatch = useDispatch();
  const dataProduct = useSelector(selectedItemValue);
  const [dataQty, setDataQty] = useState(1);

  const onCloseConditional = () => {
    setDataQty(1);
  };

  const onAddToCart = () => {
    dispatch(addItemsToCart({ data: dataProduct, qty: dataQty }));
    dispatch(setModalBottom(false));
    setDataQty(1);
  };

  return (
    <BottomSheet
      title={dataProduct?.name}
      height={"h-[calc(20%+3rem)]"}
      onCloseCondition={onCloseConditional}
    >
      <div className="w-full flex flex-col items-start justify-center gap-y-3">
        <div className="w-full flex justify-between items-center mt-4 px-0.5">
          <div className="flex gap-x-2">
            <AiOutlineMinusCircle
              className={`size-6 active:scale-90 transition-all ${
                dataQty > 1 ? "text-gray-800" : "text-gray-400"
              } `}
              onClick={dataQty > 1 ? () => setDataQty(dataQty - 1) : null}
            />
            <h1 className="font-bold">{dataQty}</h1>
            <AiOutlinePlusCircle
              className={`size-6 active:scale-90 transition-all ${
                dataQty == dataProduct?.qty ? "text-gray-400" : "text-gray-800"
              } `}
              onClick={
                dataQty == dataProduct?.qty
                  ? null
                  : () => setDataQty(dataQty + 1)
              }
            />
          </div>
          <div className="flex gap-x-6">
            <h1 className="text-[20px] font-semibold">
              Rp{toMoneyRP(dataProduct?.price * dataQty)}
            </h1>
          </div>
        </div>
        <Button
          label={"Keranjang"}
          className={"w-full bg-aam-20"}
          onClick={onAddToCart}
        />
      </div>
    </BottomSheet>
  );
};

export default AddCartBottomSheet;
