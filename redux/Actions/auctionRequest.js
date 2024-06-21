import { v4 as uuidv4 } from "uuid";
import { getAalkamContract } from "@contract";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTransaction } from "redux/shop";
import { router, toaster, toWei } from "@utils";
import { pinJSON, revertedError } from "utils/web3Utils";
import { getBuyReqAcceptDeny, updateProduct } from "@services";
import { useCheckAccount } from "@hooks";



export const auctionRequestAction = createAsyncThunk("shop/auctionRequestAction", async (data, { getState, dispatch, rejectWithValue }) => {
  console.log("databuyrequest", data);


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
  // await checkWeb3Account()
  try {
    // const ipfsUri = await pinJSON(payload);
    // payload.IpfsHash = ipfsUri?.IpfsHash;
    // let price = payload.price;

    // if (payload?.isSellUsingCrypto) {
    //   price = toWei(payload.price);
    //   console.log("payload.price", price)
    // }

    const productBuyRequest = await  getBuyReqAcceptDeny(data?.payload);
    console.log("productBuyRequest", productBuyRequest)
    if (!productBuyRequest?.success) {
      toaster("error", productBuyRequest?.errors[0]);
      return;
    }
    else{

      data.getData()
    await _alkamContract.methods
      .requests(data.productUuid, payload.uuid, data?.account)
      .send({ from: data?.account }, function (error, transactionHash) {
        if (error) {
          console.log("error", error);
          return dispatch(
            setTransaction({
              transaction: {
                type: "auction_request",
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
                type: "auction_request",
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
              type: "auction_request",
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
              type: "auction_request",
              hash: null,
              status: "failed",
              result: {},
            },
            error: revertedError(error, 2),
          })
        );
      });
    }
  } catch (err) {
    console.log("err", err);
    const parsedError = JSON.stringify(err.message);
    if (parsedError.includes("reverted with reason ")) {
      return rejectWithValue(revertedError(err));
    }
  }
});
