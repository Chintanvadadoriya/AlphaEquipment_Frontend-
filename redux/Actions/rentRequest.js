import { v4 as uuidv4 } from "uuid";
import { getAalkamContract } from "@contract";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTransaction } from "redux/shop";
import { router, toaster, toWei } from "@utils";
import { pinJSON, revertedError } from "utils/web3Utils";
import { updateProduct } from "@services";

export const rentRequestAction = createAsyncThunk("shop/rentRequestAction", async (data, { getState, dispatch, rejectWithValue }) => {
  console.log("datarentrequest", data);
  const _alkamContract = getAalkamContract(data?.chainId);

  if (!data?.account || !data?.chainId) {

    return rejectWithValue("Please connect wallate");
  }

  if (!_alkamContract) {
    return rejectWithValue("Please select valid chain");
  }

  if (!data?.balance) {

    return rejectWithValue("Please put enough money");
  }

  let payload = {
    ...data.payload,
    uuid: uuidv4(),
    // isSellUsingCrypto: true,
  };
  console.log("payload", payload);

  try {
    // const ipfsUri = await pinJSON(payload);
    // payload.IpfsHash = ipfsUri?.IpfsHash;
    // let price = payload.price;

    // if (payload?.isSellUsingCrypto) {
    //   price = toWei(payload.price);
    //   console.log("payload.price", price)
    // }

    // const productUpdate = await updateProduct(payload);
    // console.log("productUpdate", productUpdate)
    // if (!productUpdate?.success) {
    //   toaster("error", productUpdate?.errors[0]);
    //   data.err();
    //   return;
    // }
    // return;

    await _alkamContract.methods
      .rentRequest(data.productUuid, payload.uuid, userAccount)
      .send({ from: userAccount }, function (error, transactionHash) {
        if (error) {
          console.log("error", error);
          return dispatch(
            setTransaction({
              transaction: {
                type: "rent_request",
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
                type: "rent_request",
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
              type: "rent_request",
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
              type: "rent_request",
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
