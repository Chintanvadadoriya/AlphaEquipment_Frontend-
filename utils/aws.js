import AWS from "aws-sdk";
import { aws, awsFolder } from "@utils";

export const s3ImageUpload = (fileObj, dir) => {
  return new Promise((resolve) => {
    const fileName = !fileObj.extension
      ? `${new Date().getTime().toString()}.png`
      : `${new Date().getTime().toString()}.${fileObj.extension}`;
    AWS.config.update({
      accessKeyId: aws.ACCESSKEYID,
      secretAccessKey: aws.SECRETACCESSKEYS,
    });
    const s3 = new AWS.S3({
      params: { Bucket: `alphaequipment` },
      // region: "eu-south-1",
    });

    const params = {
      // ACL: "public-read",
      Bucket: "alphaequipment",
      dirName: `alphaequipment/${dir}/`,
      Key: `${dir}/${fileName}`,
      Body: fileObj,
      ContentType: fileObj.extension ? fileObj.type : "image/png",
    };

    const options = { partSize: 500 * 1024 * 1024, queueSize: 1 };

    s3.upload(params, options, (err, data) => {
      if (err) {
        // setIsLoading(false)
        console.log("ERR :: ", err);
        // return err;
        resolve({ status: 401 });
      }
      if (data) {
        // return data;
        resolve({ status: 201, data: data });
      } else {
        resolve({ status: 401 });
        // console.log("error");
        // return 0;
      }
    });
  });
};

export const s3DeleteImage = (key) => {
  return new Promise((resolve) => {
    AWS.config.update({
      accessKeyId: aws.ACCESSKEYID,
      secretAccessKey: aws.SECRETACCESSKEYS,
    });
    const s3 = new AWS.S3({
      params: { Bucket: `alphaequipment` },
      region: "us-east-1",
    });

    const params = {
      Bucket: "alphaequipment",
      Key: key,
    };

    s3.deleteObject(params, (err, data) => {
      if (err) {
        resolve({ success: false });
      } else {
        resolve({ success: true });
      }
    });
  });
};
