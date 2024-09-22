import { AiOutlineClose } from "react-icons/ai";
import { BiRightArrowAlt } from "react-icons/bi";
import { AiOutlineEyeInvisible, AiOutlineInfoCircle } from "react-icons/ai";
import React, { useState } from "react";
import MobileLayout from "../layout/MobileLayout";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/interface/Button";
import { AiOutlineEye } from "react-icons/ai";
import { Form, Formik } from "formik";
import { userLoginSchema } from "../utils/schemas";
import { loginValues } from "../utils/initialValues";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { userLogin } from "../features/user/userSlice";
import { addCountryCode } from "../utils/static";
import ErrorInput from "../components/interface/ErrorInput";
import { CgClose } from "react-icons/cg";

const LoginScreen = () => {
  const [seePassword, setSeePassword] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  return (
    <>
      <MobileLayout>
        <div className="w-full h-[100dvh] justify-center items-center fixed flex flex-col gap-y-4 px-8 overflow-hidden">
          <div className="flex flex-col gap-y-1 h-fit text-left items-start justify-start">
            <h1 className="text-[24px] font-bold">Selamat Datang!</h1>
            <p className="text-[14px] text-gray-500">
              Apotek Amanah Magetan mempermudah anda memesan obat melalui
              website ini.
            </p>
          </div>

          <Formik
            initialValues={loginValues}
            validationSchema={userLoginSchema}
            autoComplete={"off"}
            onSubmit={(values, actions) => {
              let phone = addCountryCode(values.phoneNumber);
              values.phoneNumber = phone;
              dispatch(userLogin(values, navigate));
            }}
          >
            {(props) => {
              const { values, handleChange, errors, handleSubmit } = props;

              return (
                <>
                  <Form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col justify-center items-center gap-y-5"
                  >
                    <div className="flex flex-col w-full gap-y-4">
                      <div className="flex flex-col gap-y-1 w-full h-[70px] relative">
                        <h1 className="text-[13px]">Nomor Telefon</h1>
                        <input
                          onChange={handleChange}
                          name="phoneNumber"
                          type="text"
                          placeholder="Ketik nomor telefon kamu .."
                          className="input border-aam-40/20 w-full text-[13px] pl-14 focus-visible:outline-none focus:border-aam-20"
                        />
                        <div className="bg-aam-40 text-[13px] text-white absolute px-2.5 left-0 bottom-0 h-[66%] rounded-l-lg flex justify-center items-center">
                          +62
                        </div>
                      </div>
                      {/* Error */}
                      <ErrorInput text={errors.phoneNumber} />
                      <div className="flex flex-col gap-y-1 w-full h-[70px] relative">
                        <h1 className="text-[13px]">Password</h1>
                        <input
                          onChange={handleChange}
                          name="password"
                          type={seePassword ? "text" : "password"}
                          placeholder="Ketik password kamu .."
                          className="input border-aam-40/20 w-full text-[13px] focus-visible:outline-none focus:border-aam-20"
                        />
                        <div className="z-30 text-gray-700 absolute right-4 bottom-2 size-8 flex justify-center items-center">
                          {seePassword ? (
                            <AiOutlineEyeInvisible
                              className="size-5 z-20 active:scale-90 transition-all"
                              onClick={() => setSeePassword(!seePassword)}
                            />
                          ) : (
                            <AiOutlineEye
                              className="size-5 z-20 active:scale-90 transition-all"
                              onClick={() => setSeePassword(!seePassword)}
                            />
                          )}
                        </div>
                      </div>
                      <ErrorInput text={errors.password} />
                    </div>

                    <div className="text-[12px] text-gray-600 mt-5">
                      Belum Punya Akun?{" "}
                      <Link to={"/register"}>
                        <u>Buat di sini</u>
                      </Link>
                    </div>

                    <div className="flex w-full gap-x-2">
                      <Button
                        icon={<AiOutlineClose className="size-5 ml-2" />}
                        className={"mt-4 bg-aam-40/70 shadow-lg"}
                        btnType={"button"}
                        onClick={() => navigate("/")}
                      />
                      <Button
                        icon={<BiRightArrowAlt className="size-5" />}
                        label={"Masuk"}
                        className={
                          "text-[14px] w-full mt-4 bg-aam-40 shadow-lg"
                        }
                      />
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>
      </MobileLayout>
    </>
  );
};

export default LoginScreen;
