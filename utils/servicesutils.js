import { AxiosError } from "axios";

const cbFuncTypeCheck = (cbObj, funcName, args) => {
	if (cbObj && cbObj[funcName] && typeof cbObj[funcName] === "function") {
		return cbObj[funcName](args);
	}
	return args;
};

export const catchAsyncError = (func) => async (payload, cbObj) => {
	try {
		cbFuncTypeCheck(cbObj, "Loading", true);
		const data = await func(payload, cbObj);
		return cbFuncTypeCheck(cbObj, "onSuccess", data);
	} catch (err) {
		if (err instanceof AxiosError) {
			return cbFuncTypeCheck(cbObj, "onError", err.response?.data);
		}
		return cbFuncTypeCheck(cbObj, "onError", err);
	} finally {
		cbFuncTypeCheck(cbObj, "Loading", false);
	}
};
