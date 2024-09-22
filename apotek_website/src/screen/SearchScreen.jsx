import React, { useEffect, useState } from "react";
import HeaderBack from "../components/HeaderBack";
import { BiSearch } from "react-icons/bi";
import CardProduct from "../components/CardProduct";
import { useNavigate, useSearchParams } from "react-router-dom";
import { product } from "../db/product.json";
import MobileLayout from "../layout/MobileLayout";
import { useDispatch, useSelector } from "react-redux";
import AddCartBottomSheet from "../components/AddCartBottomSheet";

const SearchScreen = () => {
  const { productItems } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);

  console.log(cartItems, "<<< cart");

  const [data, setData] = useState();
  const [nameObat, setNameObat] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();
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
        <HeaderBack
          onClick={() => navigate("/")}
          title={"Cari Obat"}
          subtitle={"Pilihan produk berdasarkan pencarianmu"}
        />

        {/* Section Search Bar */}
        <form
          className="flex flex-row w-full relative pt-1.5 mb-5"
          onSubmit={handleSubmit}
        >
          <BiSearch className="absolute left-4 top-5 size-5 text-aam-40 focus-visible:text-aam-20" />
          <input
            onChange={handleOnChange}
            type="text"
            defaultValue={name}
            className="input border-aam-40/20 w-full text-[14px] pl-11 focus-visible:outline-none focus:border-aam-20"
            placeholder="Cari Obat Kamu"
          />
        </form>

        {/* Section Card Product */}
        {data?.length === 0 && (
          <div className="w-full">
            <p className="text-center w-full flex justify-center">
              Produk belum hadir
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 w-full h-full pb-[15%]">
          {data?.map((data, index) => (
            <div key={index} className="h-[calc(100%+3rem)]">
              <CardProduct data={data} />
            </div>
          ))}
        </div>
      </MobileLayout>

      <AddCartBottomSheet />
    </>
  );
};

export default SearchScreen;
