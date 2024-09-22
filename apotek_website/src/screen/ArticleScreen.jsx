import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import HeaderBack from "../components/HeaderBack";
import { BiSearch } from "react-icons/bi";
import CardProduct from "../components/CardProduct";
import { useNavigate, useSearchParams } from "react-router-dom";
import { product } from "../db/product.json";
import MobileLayout from "../layout/MobileLayout";
import { FiPackage } from "react-icons/fi";
import { MdRestore } from "react-icons/md";
import BottomSheet from "../components/interface/BottomSheet";
import Button from "../components/interface/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../features/cart/cartSlice";
import { setModalBottom } from "../features/component/componentSlice";
import { toast } from "sonner";

const ArticleScreen = () => {
  const { productItems } = useSelector((state) => state.product);
  const [data, setData] = useState();
  const [nameObat, setNameObat] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let name = searchParams.get("produk");
  let category = searchParams.get("kategori");

  useEffect(() => {
    let results = [];

    if (name) {
      results = product.filter((data) =>
        data?.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (category) {
      results = [
        ...results,
        ...product.filter((data) =>
          data?.category.toLowerCase().includes(category.toLowerCase())
        ),
      ];
    }

    setData(results);
  }, [searchParams, product]);

  const handleOnChange = (element) => {
    const { name, value } = element.target;
    setNameObat(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ produk: nameObat });
  };

  return (
    <>
      <MobileLayout>
        <div className="flex flex-col justify-start w-full gap-y-2">
          <HeaderBack
            onClick={() => navigate(-1)}
            title={"Obat untuk Indonesia "}
            subtitle={"Apotek Amanah Magetan Blog"}
          />

          <div className="w-full flex flex-col border-gray-500 px-1">
            {/* Thumbnail */}
            <img
              className="rounded-xl mb-3 -mx-1"
              src="https://asset.kompas.com/crops/vtPTCPLZbvREFgU-1DXGY0Ebn7c=/0x1636:4016x4313/750x500/data/photo/2023/03/06/64056e81630de.jpg"
            />

            {/* Title */}
            <div className="flex flex-col w-full justify-between items-start py-2 gap-y-2 border-b-[1px] pb-3">
              <h1 className="font-bold text-[18px]">
                Mengenal Kopi: Sejarah, Jenis, dan Manfaatnya untuk Kesehatan
              </h1>
            </div>

            {/* Body Article */}
            <div className="grid grid-cols-1 h-[calc(100%)] mb-[2rem]">
              <p className="text-[13px] leading-6 mt-3 text-gray-500 ">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
              </p>
              <p className="text-[13px] leading-6 mt-3 text-gray-500">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
              </p>
              <p className="text-[13px] leading-6 mt-3 text-gray-500">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
              </p>
            </div>
          </div>
        </div>
      </MobileLayout>

      <BottomSheet
        title={"Panadol 500mg 10 Kaplet"}
        height={"h-[calc(20%+3rem)]"}
      >
        <div className="w-full flex flex-col items-start justify-center gap-y-3">
          <div className="w-full flex justify-between items-center mt-4 px-0.5">
            <div className="flex gap-x-4">
              <AiOutlineMinusCircle className="size-6 text-gray-400" />
              <h1 className="font-bold">1</h1>
              <AiOutlinePlusCircle className="size-6 text-gray-800" />
            </div>
            <div className="flex gap-x-6">
              <h1 className="text-[20px] font-semibold">Rp 6.500</h1>
            </div>
          </div>
          <Button
            label={"Keranjang"}
            className={"w-full bg-aam-20"}
            onClick={() => {
              dispatch(addItemsToCart(data));
              dispatch(setModalBottom(false));
              toast.success("Produk berhasil dipilih");
            }}
          />
        </div>
      </BottomSheet>
    </>
  );
};

export default ArticleScreen;
