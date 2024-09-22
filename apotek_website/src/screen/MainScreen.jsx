import { BiLogIn } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import React, { useState } from "react";
import Button from "../components/interface/Button";
import CardProduct from "../components/CardProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isObjectEmpty } from "../utils/static";
import { product } from "../db/product.json";
import "swiper/css";
import "swiper/css/pagination";
import "../index.css";

const MainScreen = () => {
  const userData = useSelector((state) => state.user.userData);
  const [nameObat, setNameObat] = useState("");
  let navigate = useNavigate();

  const carouselData = [
    {
      title: "Polysilane Suspensi",
      subtitle:
        "obat yang digunakan untuk meredakan gejala kelebihan gas dalam perut",
      onClick: () => navigate("/article/polysilane"),
    },
    {
      title: "Vitamin & Suplemen",
      subtitle: "Kandungan vitamin yang mudah dicerna",
      onClick: () => navigate("/article/polysilane"),
    },
    {
      title: "Flu Batuk & Alregi",
      subtitle: "Kandungan vitamin yang mudah dicerna",
      onClick: () => navigate("/article/polysilane"),
    },
  ];

  const category = [
    {
      name: "Lambung/ Kembung/" + "\n" + "Maag",
      icon: "/icon/lambung.png",
      onClick: () => navigate(`/search?kategori=LambungKembungMaag`),
    },
    {
      name: "Demam/" + "\n" + "Nyeri/Sakit Kepala",
      icon: "/icon/demam.png",
      onClick: () => navigate(`/search?kategori=DemamNyeriSakitKepala`),
    },
    {
      name: "Flu/Batuk/" + "\n" + "Alergi",
      icon: "/icon/flu_batuk.png",
      onClick: () => navigate(`/search?kategori=FlugBatukAlergi`),
    },
    {
      name: "Vitamin & Suplemen",
      icon: "/icon/vitamin.png",
      onClick: () => navigate(`/search?kategori=VitaminDanSuplemen`),
    },
    {
      name: "Diare",
      icon: "/icon/diare.png",
      onClick: () => navigate(`/search?kategori=Diare`),
    },
    {
      name: "Salep & Krim",
      icon: "/icon/salep_krim.png",
      onClick: () => navigate(`/search?kategori=SalepDanKrim`),
    },
    {
      name: "Ibu & Anak",
      icon: "/icon/ibu_anak.png",
      onClick: () => navigate(`/search?kategori=IbuDanAnak`),
    },
    {
      name: "Herbal",
      icon: "/icon/herbal.png",
      onClick: () => navigate(`/search?kategori=Herbal`),
    },
    {
      name: "Kesehatan" + "\n" + "Kulit",
      icon: "/icon/kulit.png",
      onClick: () => navigate(`/search?kategori=KesehatanKulit`),
    },
    {
      name: "Kesehatan Mata",
      icon: "/icon/mata.png",
      onClick: () => navigate(`/search?kategori=KesehatanMata`),
    },
    {
      name: "THT",
      icon: "/icon/tht.png",
      onClick: () => navigate(`/search?kategori=Tht`),
    },
    {
      name: "P3K",
      icon: "/icon/p3k.png",
      onClick: () => navigate(`/search?kategori=P3k`),
    },
    {
      name: "Alat" + "\n" + "Kesehatan",
      icon: "/icon/alat_kesehatan.png",
      onClick: () => navigate(`/search?kategori=AlatKesehatan`),
    },
    {
      name: "Lain-Lain",
      icon: "/icon/lain_lain.png",
      onClick: () => navigate(`/search?kategori=LainLain`),
    },
  ];

  const onLogin = () => {
    if (isObjectEmpty(userData)) {
      navigate("/login");
    }
  };

  const handleOnChange = (element) => {
    const { name, value } = element.target;
    setNameObat({ ...nameObat, [name]: value });
  };

  const replaceBR = (input) => {
    return input.replace(/\n/g, "<br/>");
  };

  return (
    <>
      <div className="w-full flex justify-start items-start flex-col gap-y-5 p-4">
        {/* Section Header */}
        <div className="flex flex-row w-full justify-between items-center">
          {/* Profile */}
          <div className="flex flex-row gap-x-2 h-full">
            <div className="w-12 h-full flex justify-center items-center border rounded-lg">
              <img
                src="/logo_icon.png"
                alt=""
                className="size-8 object-contain"
              />
            </div>
            <div className="flex flex-col text-[14px]">
              <h1 className="text-[12px]">Selamat Datang</h1>
              <div className="flex -mt-0.5">
                <h1 className="text-gray-800 text-[16px]">
                  {isObjectEmpty(userData)
                    ? "Apotek Amanah Magetan"
                    : userData?.fullname}
                </h1>
              </div>
            </div>
          </div>

          {/* Notification */}
          <div
            onClick={onLogin}
            className="border-gray-200 active:bg-aam-40 group h-full border-[1px] w-10 rounded-md size-8 justify-center items-center flex"
          >
            <BiLogIn className="size-5 text-gray-700 mr-1 group-active:text-white" />
          </div>
        </div>

        {/* Section Search Bar */}
        <div className="flex flex-row gap-x-2 w-full justify-between items-center sticky z-30 bg-white pb-5 pt-4 -my-5 top-0">
          <form
            className="w-full relative"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/search?produk=${nameObat.produk}`);
            }}
          >
            <BiSearch className="absolute left-4 top-3.5 size-5 text-aam-40 focus-visible:text-aam-20" />
            <input
              onChange={handleOnChange}
              name="produk"
              type="text"
              className="input border-aam-40/20 w-full text-[14px] pl-11 focus-visible:outline-none focus:border-aam-20"
              placeholder="Cari Obat Kamu"
            />
          </form>
        </div>

        {/* Section Carousel */}
        <div className="w-full h-[140px] rounded-lg flex flex-col relative">
          <Swiper
            style={{
              "--swiper-pagination-right": "20px",
              "--swiper-pagination-left": "auto",
              "--swiper-pagination-top": "auto",
              "--swiper-pagination-bottom": "12px",
              "--swiper-pagination-color": "#3c2020",
              "--swiper-pagination-bullet-inactive-color": "#e6e6e6",
              "--swiper-pagination-bullet-inactive-opacity": "1",
              "--swiper-pagination-bullet-size": "8px",
              "--swiper-pagination-bullet-horizontal-gap": "3px",
            }}
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            speed={1200}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            initialSlide={1}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {carouselData.map((data, index) => (
              <SwiperSlide key={index}>
                <div className="flex relative w-full h-full rounded-xl overflow-hidden">
                  <img src="/sample/test_med_photo.jpg" className="" />
                  <div className="z-10 absolute bottom-0 left-7 flex flex-col h-full justify-center text-white">
                    <div className="flex flex-col mb-4">
                      <h1 className="font-bold">{data.title}</h1>
                      <p className="text-[12px] w-[20rem] text-white">
                        {data.subtitle}
                      </p>
                    </div>
                    <Button
                      label={"Jelajahi"}
                      className={"h-[20px] text-[10px] w-fit bg-aam-10"}
                      onClick={data.onClick}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Section Kategori */}
        <div className="grid grid-cols-1 w-full gap-y-5">
          <h1 className="text-gray-800 font-bold -mb-2 text-[18px]">
            Kategori Obat
          </h1>
          <div className="grid grid-cols-4 gap-X-4 gap-y-4 w-[calc(100%+1.2rem)] -ml-3">
            {category.map((data, index) => (
              <div className="h-[calc(100%+100px)]" key={index}>
                <div
                  key={index}
                  onClick={data.onClick}
                  className="flex flex-col gap-y-2 justify-start items-center w-full"
                >
                  <div className="bg-aam-20 size-[70px] rounded-xl flex justify-center items-center text-white text-[14px] text-center overflow-hidden">
                    {/* {data.icon} */}
                    <img
                      src={data.icon}
                      alt="icon"
                      className="size-14 object-contain"
                    />
                  </div>
                  <h1 className="text-gray-800 text-[12px] w-full flex justify-center text-center">
                    <div
                      dangerouslySetInnerHTML={{ __html: replaceBR(data.name) }}
                    />
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Product */}
        <section id="produk" className="hidden">
          <div className="flex flex-col mt-4">
            <h1 className="text-gray-800 font-bold -mb-2 text-[18px]">
              Produk
            </h1>
          </div>

          {/* Section Card Product */}
          <div className="grid grid-cols-2 gap-2 w-full">
            {product.map((data, index) => (
              <div key={index} className="h-[calc(100%+100px)]">
                <CardProduct data={data} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default MainScreen;
