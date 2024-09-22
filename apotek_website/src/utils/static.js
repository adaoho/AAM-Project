export function addCountryCode(phoneNumber) {
  if (phoneNumber.startsWith("0")) {
    return "+62" + phoneNumber.slice(1);
  } else if (!phoneNumber.startsWith("+62")) {
    return "+62" + phoneNumber;
  }

  return phoneNumber;
}

export const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0;
};

export const isObjectLength = (objectName, length) => {
  return Object.keys(objectName).length === length;
};

export function toMoneyRP(money) {
  if (typeof money === "undefined") {
    return "Rp 0";
  }
  let moneyFormat = new Number(money).toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return moneyFormat;
}

export function generateRandomNumber() {
  return Math.floor(Math.random() * 90000) + 10000;
}
