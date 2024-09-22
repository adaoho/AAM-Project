import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";
import React, { Fragment } from "react";
import MobileLayout from "../layout/MobileLayout";
import FooterButton from "../components/FooterButton";
import HeaderBack from "../components/HeaderBack";
import { BsCartPlus } from "react-icons/bs";
import Button from "../components/interface/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalPrices,
} from "../features/cart/cartSlice";
import { generateRandomNumber, toMoneyRP } from "../utils/static";
import CardCart from "../components/CardCart";

const ProfileCartScreen = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector(selectCartTotalPrices);

  const handleCheckoutToWhatsapp = () => {
    if (cartItems.length === 0) return;

    const code = generateRandomNumber();
    const phoneNumber = "6281314625260";
    const message = encodeURIComponent(
      `Halo, Saya ingin membeli :\n${cartItems
        .map(
          (product) => `${product.quantity} barang - ${product.product.name}`
        )
        .join(",\n")} \n\nTotal harga Rp${toMoneyRP(
        totalPrice
      )}\nKode Transaksi - ${code}`
    );

    const URL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(URL, "_blank");
    navigate(`/profile/transaction/order-berhasil`, { state: { key: code } });
  };

  return (
    <>
      <MobileLayout>
        <HeaderBack
          onClick={() => navigate("/")}
          title={"Keranjang"}
          subtitle={"Produk semua keranjang"}
        />
        <div className="flex flex-col h-full justify-start w-full">
          <div className="grid grid-cols-1 mt-4 gap-y-3 w-full h-fit">
            {cartItems.length === 0 && (
              <div className="w-full flex flex-col justify-center items-center pt-[55%] text-gray-500">
                Kamu belum memilih produk
              </div>
            )}
            {cartItems?.map((data, index) => (
              <div className="h-[calc(100%+80px)]">
                <CardCart data={data} key={index} />
              </div>
            ))}
          </div>
        </div>

        <FooterButton>
          <div className="flex flex-col">
            <h1 className="text-[12px] text-gray-400">Total Harga</h1>
            <h1 className="font-bold">Rp{toMoneyRP(totalPrice)}</h1>
          </div>

          <Button
            label={"Pesan Obat"}
            btnType={"button"}
            className={"bg-aam-20"}
            onClick={handleCheckoutToWhatsapp}
            icon={<BsCartPlus className="size-4.5 mb-0.5" />}
          />
        </FooterButton>
      </MobileLayout>
    </>
  );
};

export default ProfileCartScreen;
