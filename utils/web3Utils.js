import axios from "axios";

export const isMetaMaskInstalled = () => {
  return typeof window.web3 !== "undefined";
};

export const pinJSON = async (payload) => {
  console.log("process.env.PINATA_JWT", process.env.PINATA_JWT);
  var config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    data: payload,
  };

  let res = await axios(config);
  res = res?.data;
  return res;
};

export const revertedError = (error, index = 1) => {
  const parsedError = JSON.stringify(error.message);
  const msg = parsedError?.split(`'`);
  let message = [];
  msg?.map((err) => {
    if (!err.includes("\\") && !err.includes('"\\') && !err.includes("[")) {
      !err?.startsWith("\\") && message.push(err);
    }
  });
  console.log("msg", message);
  return message[0];
};
