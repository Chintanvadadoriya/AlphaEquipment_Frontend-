import { injected } from "@connection";
import { setAccountAction, setChainIdAction } from "@redux";
import { updateProfile } from "@services";
import { toaster } from "@utils";
import { useWeb3React } from "@web3-react/core";
import { SUPPORTED_CHAINIDS } from "constant";
import { useChain } from "hooks/web3/useChain";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { isMetaMaskInstalled } from "utils/web3Utils";

const ConnectWallet = () => {
  const { active, activate, error, account, deactivate, chainId } = useWeb3React();
  const { chainChange } = useChain();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  useEffect(() => {
    injected?.isAuthorized()?.then((isAuthorized) => {
      if (isAuthorized && !active && !error) {
        activate(injected);
      }
    });
  }, [error, activate]);

  useEffect(() => {
    account && dispatch(setAccountAction(account));
    if (account) {
      let formData = new FormData();
      formData.append("walletId", account);
      updateProfile(formData, {
        Loading: setLoading,
        onSuccess: (res) => {},
        onError: (err) => {
          toaster("error", err.message);
        },
      });
    }
  }, [account]);

  useEffect(() => {
    chainId && dispatch(setChainIdAction(chainId));
  }, [chainId]);

  const handleWallate = () => {
    if (!active) {
      activate(injected);
      return;
    }
    deactivate();
  };
  if (active && !SUPPORTED_CHAINIDS.includes(chainId)) {
    return (
      <li onClick={() => chainChange(process.env.CHAIN_ID)}>
        <a href="#">Select Polygon Testnet</a>
      </li>
    );
  }
  return (
    <li onClick={handleWallate}>
      {isMetaMaskInstalled() ? (
        <a href="#">{account ? account?.slice(0, 7) + "..." : "Connect wallet"}</a>
      ) : (
        <a href="https://metamask.io/" target="_blank">
          Install Metamask
        </a>
      )}
    </li>
  );
};

export default ConnectWallet;
