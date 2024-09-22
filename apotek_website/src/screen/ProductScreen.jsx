import { BsCartPlus } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import HeaderBack from "../components/HeaderBack";
import FooterButton from "../components/FooterButton";
import MobileLayout from "../layout/MobileLayout";
import { useNavigate, useParams } from "react-router-dom";
import { product } from "../db/product.json";
import { toMoneyRP } from "../utils/static";
import ToggleBar from "../components/interface/ToggleBar";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { addItemsToCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const Product = () => {
  const [showImage, setShowImage] = useState(0);
  const [dataQty, setDataQty] = useState(1);
  const { slug } = useParams();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const dataProduct = product.find((data) => data.slug.includes(slug));

  const onAddToCart = () => {
    dispatch(addItemsToCart({ data: dataProduct, qty: dataQty }));
    setDataQty(1);
  };

  return (
    <>
      <MobileLayout>
        {/* Body of Description */}
        <div className="flex flex-col justify-start w-full gap-y-2">
          <HeaderBack
            onClick={() => navigate(-1)}
            title={dataProduct?.name}
            subtitle={"Produk Kategori " + dataProduct?.category}
            backButton={true}
          />
          <div className="flex w-full relative overflow-hidden ">
            <img
              src={dataProduct?.image[showImage]}
              className="object-cover w-full h-[350px] rounded-xl"
            />

            <div className="absolute flex gap-x-3 w-full justify-center items-center bottom-3">
              {dataProduct?.image.map(
                (image, index) =>
                  showImage !== index && (
                    <div
                      key={index}
                      className="size-14 rounded-lg overflow-hidden border-[1px] border-gray-600"
                      onClick={() => setShowImage(index)}
                    >
                      <img
                        src={image}
                        alt=""
                        className="object-cover w-full h-full active:scale-90 transition-all"
                      />
                    </div>
                  )
              )}
            </div>
          </div>

          {/* Description Section */}
          <div className="w-full flex flex-col border-gray-500 px-1">
            <div className="flex flex-col w-full justify-between items-start py-2 gap-y-2">
              <h1 className="font-bold text-[18px]">{dataProduct?.name}</h1>
              {/* List of Availbility */}
              <div className="flex gap-x-2">
                <ToggleBar
                  title={"Kategori: "}
                  description={dataProduct?.category}
                />
                <div className="text-[12px] text-aam-10 text-center px-2 py-1 bg-aam-10/10 rounded-xl border-aam-10 border">
                  Stok: Tersedia
                </div>
              </div>
            </div>

            {/* divider */}
            <div className="border-b-[1px] border-gray-200 mb-4 pt-2"></div>

            <div className="grid grid-cols-1">
              <h1 className=" text-gray-800 text-[13px] font-bold">
                Deskripsi Produk
              </h1>
              <p className="text-[12px] leading-6 mt-3 text-gray-500 h-[calc(100%+90px)]">
                {dataProduct?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Add to Cart Section */}
        <FooterButton>
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

          {/* Button Add to Cart */}
          <div
            onClick={onAddToCart}
            className="bg-aam-20 flex justify-center items-center gap-x-2 px-5 py-2 text-white rounded-xl active:scale-90 transition-all"
          >
            <BsCartPlus className="size-4.5 mb-0.5" />
            <h1 className="text-[15px]">
              Tambahkan Rp{toMoneyRP(dataProduct?.price * dataQty)}
            </h1>
          </div>
        </FooterButton>
      </MobileLayout>
    </>
  );
};

export default Product;
