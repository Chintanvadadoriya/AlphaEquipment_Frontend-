import { v4 as uuidv4 } from "uuid";
import { getAalkamContract } from "@contract";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTransaction } from "redux/shop";
import { router, toaster, toWei } from "@utils";
import { pinJSON, revertedError } from "utils/web3Utils";
import { updateProduct } from "@services";

export const editProductAction = createAsyncThunk("shop/editProductActions", async (data, { getState, dispatch, rejectWithValue }) => {
  // const { web3Account } = getState();
  // const { userAccount, currentChainId } = web3Account;

  const _alkamContract = getAalkamContract(data?.chainId);

  if (!data?.account || !data?.chainId || !_alkamContract || !data?.balance) {
    if (!data?.account || !data?.chainId) {
      data?.err(false);
      return rejectWithValue("Please connect wallate");
    }

    if (!_alkamContract) {
      return rejectWithValue("Please select valid chain");
    }

    if (!data?.balance) {
      data?.err(false);
      return rejectWithValue("Please put enough money");
    }
  } else {
    data?.err(true);
  }

  let payload = {
    ...data.payload,
    // isSellUsingCrypto: true,
  };

  try {
    const ipfsUri = await pinJSON(payload);
    payload.IpfsHash = ipfsUri?.IpfsHash;
    let price = payload.price;

    if (payload?.isSellUsingCrypto) {
      price = toWei(payload.price);
      console.log("payload.price", price);
    }

    // const productUpdate = await updateProduct(payload);
    // console.log("productUpdate", productUpdate)
    // if (!productUpdate?.success) {
    //   toaster("error", productUpdate?.errors[0]);
    //   data.err();
    //   return;
    // }
    // return;

    await _alkamContract.methods
      .updateProduct(payload.uuid, price, ipfsUri?.IpfsHash, JSON.stringify(payload))
      .send({ from: data?.account }, function (error, transactionHash) {
        if (error) {
          console.log("error", error);
          return dispatch(
            setTransaction({
              transaction: {
                type: "edit_product",
                hash: transactionHash,
                status: "failed",
                result: {},
              },
              error: revertedError(error),
            })
          );
        } else {
          dispatch(
            setTransaction({
              transaction: {
                type: "edit_product",
                hash: transactionHash,
                status: "pending",
                result: {},
              },
            })
          );
        }
      })
      .on("receipt", async function (receipt) {
        console.log("receipt", receipt);
        // console.log("eventData", eventData);
        dispatch(
          setTransaction({
            transaction: {
              type: "edit_product",
              hash: null,
              status: "success",
              result: receipt,
            },
          })
        );
      })
      .on("error", async function (error) {
        console.log("error", error);
        dispatch(
          setTransaction({
            transaction: {
              type: "edit_product",
              hash: null,
              status: "failed",
              result: {},
            },
            error: revertedError(error, 2),
          })
        );
      });
    // dispatch(addProduct(null));
  } catch (err) {
    console.log("err", err);
    const parsedError = JSON.stringify(err.message);
    if (parsedError.includes("reverted with reason ")) {
      return rejectWithValue(revertedError(err));
    }
  }
});
