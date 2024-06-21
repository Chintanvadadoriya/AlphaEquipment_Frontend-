import { ALKAMABI } from "@abi";
import { CONTRACT_ADDRESS } from "@constant";
import { isMetaMaskInstalled } from "utils/web3Utils";
import Web3 from "web3";

const getWeb3Contract = (abi, contractAddress) => {
  if (isMetaMaskInstalled()) {
    const web3 = new Web3(window.ethereum);
    return new web3.eth.Contract(abi, contractAddress);
  }
  return null;
};

export const getAalkamContract = (chainId) => {
  const address = CONTRACT_ADDRESS[chainId];
  if (!address) {
    return;
  }
  return getWeb3Contract(ALKAMABI, address);
};
