import React, { useState } from "react";
import MobileLayout from "../layout/MobileLayout";
import HeaderBack from "../components/HeaderBack";
import CardOrder from "../components/interface/CardOrder";
import { useNavigate } from "react-router-dom";
import { FiPackage } from "react-icons/fi";
import { MdRestore } from "react-icons/md";
import BottomSheet from "../components/interface/BottomSheet";

const TransactionScreen = () => {
  const [selected, setSelected] = useState(1);
  let navigate = useNavigate();

  const buttonActive =
    "flex text-[15px] justify-center items-center px-3 py-1 bg-aam-20 rounded-xl border-aam-20 text-white border";
  const buttonInactive =
    "flex text-[15px] justify-center items-center px-3 py-1 bg-aam-20/10 rounded-xl border border-aam-20 text-aam-20";

  return (
    <>
      <MobileLayout isNavbar={true}>
        <div className="flex flex-col h-full justify-start w-full">
          <HeaderBack
            onClick={() => navigate(-1)}
            title={"Transaksi Saya"}
            subtitle={"Semua transaksi saya di Keranjang"}
          />

          <div className="flex w-full gap-x-2 mt-2">
            <div
              className={`${selected === 1 ? buttonActive : buttonInactive}`}
              onClick={() => setSelected(1)}
            >
              Semua
            </div>
            <div
              className={`${selected === 2 ? buttonActive : buttonInactive}`}
              onClick={() => setSelected(2)}
            >
              Berhasil
            </div>
            <div
              className={`${selected === 3 ? buttonActive : buttonInactive}`}
              onClick={() => setSelected(3)}
            >
              Tidak Berhasil
            </div>
          </div>

          <div className="w-full mt-4 gap-y-4 overflow-auto grid grid-cols-1">
            <div className="flex gap-y-3 flex-col max-h-[calc(100%+90px)] pb-24">
              <CardOrder />
              <CardOrder />
              <CardOrder />
            </div>
          </div>
        </div>
      </MobileLayout>

      <BottomSheet title={"Transaksi Saya"} height={"h-[calc(20%+80px)]"}>
        <div className="w-full flex flex-col items-start justify-center gap-y-3">
          <div className="flex gap-x-2 items-center border-b-[1px] w-full py-2">
            <MdRestore className="size-5" /> Beli Kembali
          </div>
          <div className="flex gap-x-2 items-center border-b-[1px] w-full py-2">
            <FiPackage className="size-5" /> Lihat Produk
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default TransactionScreen;
