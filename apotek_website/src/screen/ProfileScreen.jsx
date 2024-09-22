import { AiOutlineEdit } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { AiOutlineCalendar } from "react-icons/ai";
import React from "react";
import MobileLayout from "../layout/MobileLayout";
import { useSelector } from "react-redux";
import { isObjectEmpty } from "../utils/static";
import HeaderBack from "../components/HeaderBack";
import ToggleBar from "../components/interface/ToggleBar";
import CardOrder from "../components/interface/CardOrder";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const userData = useSelector((state) => state.user.userData);
  let navigate = useNavigate();
  return (
    <>
      <MobileLayout isNavbar={true}>
        <div className="flex flex-col h-full justify-start w-full">
          <HeaderBack
            onClick={() => navigate(-1)}
            title={"Akun Saya"}
            subtitle={"Ini adalah page dari Akun Kamu"}
          />

          {/* User Photo */}
          <div className="flex justify-between items-start mt-3 w-full border-2 px-3 py-3 rounded-xl bg-gray-100">
            {/* Profile Rounded */}
            <div className="size-20 relative flex gap-x-4 items-center">
              <img
                src="/sample/test_med_photo.jpg"
                className="object-cover rounded-full size-20"
              />
              <div className="absolute right-0 bottom-0">
                <AiOutlineEdit className="bg-gray-600 size-7 z-40 text-white rounded-full px-1.5 py-1.5 hover:scale-105 active:scale-90 hover:bg-gray-800 transition-all" />
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold">Nugroho Adnan</h1>
                <h1 className="text-[13px] text-gray-500">081230972328</h1>
                <h1 className="text-[13px] text-gray-500">
                  9nugroho@gmail.com
                </h1>
              </div>
            </div>

            <div className="h-full flex items-center">
              <ToggleBar type={"card"} title={"Edit"} />
            </div>
          </div>

          {/* Transaction History */}
          <div className="flex justify-between items-start mt-3 w-full flex-col gap-y-3 ">
            <h1 className="font-bold">Pembelian Saya</h1>
            <div className="grid grid-cols-3 w-full border-2 px-3 py-3 rounded-xl bg-gray-100">
              <div className="flex flex-col items-center">
                <h1 className="text-[12px]">Semua</h1>
                <h1 className="font-bold text-[26px]">20</h1>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-[12px]">Berhasil</h1>
                <h1 className="font-bold text-[26px]">20</h1>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-[12px]">Tidak Berhasil</h1>
                <h1 className="font-bold text-[26px]">20</h1>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="flex flex-col justify-between items-start mt-3 w-full gap-y-3 pb-[calc(100%-75%)]">
            <div className="flex justify-between w-full items-center">
              <h1 className="font-bold">Transaksi Saya Sebelumnya</h1>
              <div
                onClick={() => navigate("/order")}
                className="text-[12px] underline"
              >
                Lihat Semua
              </div>
            </div>
            <CardOrder type={"compact"} />
            <CardOrder type={"compact"} />
            <CardOrder type={"compact"} />
            <CardOrder type={"compact"} />
            <CardOrder type={"compact"} />
            <CardOrder type={"compact"} />
          </div>
        </div>
      </MobileLayout>
    </>
  );
};

export default ProfileScreen;
