import {
  AiOutlineMinusCircle,
  AiOutlinePlus,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { toMoneyRP } from "../utils/static";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../features/cart/cartSlice";
import BottomSheet from "./interface/BottomSheet";
import { MdRestore } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { setModalBottom } from "../features/component/componentSlice";
import Button from "./interface/Button";
import { setSelectedItem } from "../features/product/productSlice";

const CardProduct = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-y-3 relative border h-[227px] px-2 py-2 rounded-xl">
        {/* Picture Square */}

        <div className="bg-gray-200 rounded-xl w-full h-full  overflow-hidden">
          <Link to={"/product/" + data?.slug}>
            <img
              src={data?.image[0]}
              alt=""
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
        {/* Description */}
        <Link to={"/product/" + data?.slug}>
          <div className="flex flex-row gap-x-2 justify-between text-[11px] items-end text-gray-700">
            <h1 className="text-[13px] truncate-multiline">{data?.name}</h1>
            <h1 className="font-bold text-[14px]">
              Rp{toMoneyRP(data?.price)}
            </h1>
          </div>
        </Link>

        {/* Button Add to Cart */}
        <div
          onClick={() => {
            dispatch(setModalBottom(true));
            dispatch(setSelectedItem(data));
          }}
          className="absolute z-20 right-4 bottom-10 bg-aam-20 flex justify-center items-center size-[40px] rounded-full active:scale-75 transition-all"
        >
          <AiOutlinePlus className="text-white" />
        </div>
      </div>
    </>
  );
};

export default CardProduct;
