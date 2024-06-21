import Form from "react-bootstrap/Form";
import Image from "next/image";
import { FiveImgWrap } from "@style";
import { setImageUpload } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addProduct } from "@redux";

const FiveImgCmp = ({ formik, name }) => {
  const dispatch = useDispatch();
  const getImgData = useSelector((store) => store.shop.shopDetail);

  const validationError = formik?.errors?.[name];

  const blobGenerate = async (param, nameKey) => {
    let res = await setImageUpload(param);

    formik.setFieldValue(nameKey, res);
  };

  return (
    <FiveImgWrap>
      <div className="equipment-picture-upload" key={`${name}[0]`}>
        <Image
          src={
            formik?.values?.[name]?.[0]?.file
              ? formik?.values?.[name]?.[0]?.file
              : getImgData?.[name]?.[0]
              ? getImgData?.[name]?.[0]
              : "/assets/addproduct/DetInEquipPic.svg"
          }
          width={90}
          height={90}
          alt="Addimageequipmentpic"
          className="imgmain"
        />
        <div className="input-type-block">
          <input
            type="file"
            name={`${name}[0]`}
            className="file-input__input"
            id={`${name}[0]`}
            onChange={(e) => blobGenerate(e, `${name}[0]`)}
          ></input>
          <label className="file-input__label" htmlFor={`${name}[0]`}>
            <Image
              src="/assets/addproduct/DetInEquipAdPic.svg"
              width={20}
              height={21}
              alt="Addimageequipmentpic"
              className="imgadd"
            />
          </label>
        </div>
      </div>
      <div className="equipment-picture-upload" key={`${name}[1]`}>
        <Image
          src={
            formik?.values?.[name]?.[1]?.file
              ? formik?.values?.[name]?.[1]?.file
              : getImgData?.[name]?.[1]
              ? getImgData?.[name]?.[1]
              : "/assets/addproduct/DetInEquipPic.svg"
          }
          width={90}
          height={90}
          alt="Addimageequipmentpic"
          className="imgmain"
        />
        <div className="input-type-block">
          <input
            type="file"
            name={`${name}[1]`}
            className="file-input__input"
            id={`${name}[1]`}
            onChange={(e) => blobGenerate(e, `${name}[1]`)}
          ></input>
          <label className="file-input__label" htmlFor={`${name}[1]`}>
            <Image
              src="/assets/addproduct/DetInEquipAdPic.svg"
              width={20}
              height={21}
              alt="Addimageequipmentpic"
              className="imgadd"
            />
          </label>
        </div>
      </div>
      <div className="equipment-picture-upload" key={`${name}[2]`}>
        <Image
          src={
            formik?.values?.[name]?.[2]?.file
              ? formik?.values?.[name]?.[2]?.file
              : getImgData?.[name]?.[2]
              ? getImgData?.[name]?.[2]
              : "/assets/addproduct/DetInEquipPic.svg"
          }
          width={90}
          height={90}
          alt="Addimageequipmentpic"
          className="imgmain"
        />
        <div className="input-type-block">
          <input
            type="file"
            name={`${name}[2]`}
            className="file-input__input"
            id={`${name}[2]`}
            onChange={(e) => blobGenerate(e, `${name}[2]`)}
          ></input>
          <label className="file-input__label" htmlFor={`${name}[2]`}>
            <Image
              src="/assets/addproduct/DetInEquipAdPic.svg"
              width={20}
              height={21}
              alt="Addimageequipmentpic"
              className="imgadd"
            />
          </label>
        </div>
      </div>
      <div className="equipment-picture-upload" key={`${name}[3]`}>
        <Image
          src={
            formik?.values?.[name]?.[3]?.file
              ? formik?.values?.[name]?.[3]?.file
              : getImgData?.[name]?.[3]
              ? getImgData?.[name]?.[3]
              : "/assets/addproduct/DetInEquipPic.svg"
          }
          width={90}
          height={90}
          alt="Addimageequipmentpic"
          className="imgmain"
        />
        <div className="input-type-block">
          <input
            type="file"
            name={`${name}[3]`}
            className="file-input__input"
            id={`${name}[3]`}
            onChange={(e) => blobGenerate(e, `${name}[3]`)}
          ></input>
          <label className="file-input__label" htmlFor={`${name}[3]`}>
            <Image
              src="/assets/addproduct/DetInEquipAdPic.svg"
              width={20}
              height={21}
              alt="Addimageequipmentpic"
              className="imgadd"
            />
          </label>
        </div>
      </div>
      <div className="equipment-picture-upload" key={`${name}[4]`}>
        <Image
          src={
            formik?.values?.[name]?.[4]?.file
              ? formik?.values?.[name]?.[4]?.file
              : getImgData?.[name]?.[4]
              ? getImgData?.[name]?.[4]
              : "/assets/addproduct/DetInEquipPic.svg"
          }
          width={90}
          height={90}
          alt="Addimageequipmentpic"
          className="imgmain"
        />
        <div className="input-type-block">
          <input
            type="file"
            name={`${name}[4]`}
            className="file-input__input"
            id={`${name}[4]`}
            onChange={(e) => blobGenerate(e, `${name}[4]`)}
          ></input>
          <label className="file-input__label" htmlFor={`${name}[4]`}>
            <Image
              src="/assets/addproduct/DetInEquipAdPic.svg"
              width={20}
              height={21}
              alt="Addimageequipmentpic"
              className="imgadd"
            />
          </label>
        </div>
      </div>
      {validationError && <p>{validationError}</p>}
    </FiveImgWrap>
  );
};

export default FiveImgCmp;
