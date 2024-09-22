import * as Yup from "yup";

const getErrorText = (message) => {
  return Yup.string().required(message);
};

const getErrorNumber = (message) => {
  return Yup.number().required(message);
};

export const userLoginSchema = Yup.object().shape({
  phoneNumber: getErrorText(`Nomor Telefon Tidak Boleh Kosong`),
  password: getErrorText(`Password Tidak Boleh Kosong`),
});

export const userRegisterSchema = Yup.object().shape({
  fullname: getErrorText(`Nama Lengkap Tidak Boleh Kosong`),
  phoneNumber: getErrorText(`Nomor Telefon Tidak Boleh Kosong`),
  password: getErrorText(`Password Tidak Boleh Kosong`),
});
