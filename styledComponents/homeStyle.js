import styled from "styled-components";
// import { HomeMain } from "./homeStyle";
import { fontLato, BrotherFont, Urbanist } from "./fontStyle";
import { themeColor } from "./theme";

export const HomeMain = styled.div`
  .banner-img-block {
    width: 100%;
    img {
      width: 100%;
      height: auto;
    }
  }
`;
export const CommonContent = styled.div`
  position: relative;
  .common-padding-block {
    margin-bottom: 30px;
    background-color: rgba(255, 255, 255, 0.4);
    padding: 40px 0;
  &:last-child{
    margin-bottom: 0;
  }
  }
  .common-title-view {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    h2 {
      font-size: 32px;
      line-height: 36px;
      font-weight: 700;
      color: ${themeColor.themePrimary};
      ${fontLato}
      margin: 0px;
       @media (max-width: 768px){
        font-size: 20px;
        line-height: 24px;
       }
    }
    .button-border {
      border: 1px solid ${themeColor.themePrimary};
      border-radius: 10px;
      color: ${themeColor.themePrimary};
      font-weight: 400;
      font-size: 18px;
      line-height: 20px;
      background: transparent;
      padding: 9px 22px;
      ${fontLato}
       @media (max-width: 768px){
        font-size: 15px;
        line-height: 18px;
        padding:6px 12px;
       }
      &:hover {
        color: ${themeColor.white};
        background-color: ${themeColor.themePrimary};
      }
    }
  }
`;
export const AuctionBLock = styled.div``;
export const AuctionBLockFlex = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  margin: 0px -15px; */
`;
export const AuctionBLockFlexInner = styled.div`
  /* padding: 0px 0 30px; */
  /* width: 33.33%; */
  .action-block {
    background-color: ${themeColor.white};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 17px 15px;
    height: 100%;
    margin-bottom: 20px;
    .img-block-action {
      margin-bottom: 12px;
      img {
        width: 100%;
        height: 220px;
        border-radius: 10px;
        object-fit: cover;
      }
    }
    .action-content {
      .action-content-title {
        position: relative;
        margin-bottom: 10px;
        height: 58px;
        h3 {
          font-weight: 500;
          font-size: 24px;
          line-height: 32px;
          color: ${themeColor.black};
          margin-bottom: 0px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          ${fontLato}
        }
        .distance-block {
          position: absolute;
          z-index: 9;
          display: flex;
          align-items: center;
          top: 31px;
          right: 0px;
          p {
            margin: 0px;
            padding: 0px;
            font-weight: 500;
            font-size: 18px;
            line-height: 18px;
            color: ${themeColor.black950};
            padding-left: 5px;
            ${fontLato}
          }
        }
      }
      .location-disc {
        font-weight: 500;
        font-size: 20px;
        line-height: 26px;
        color: ${themeColor.gray780};
        margin-bottom: 12px;
        ${fontLato}
      }
      .meter-disc {
        font-weight: 500;
        font-size: 20px;
        line-height: 21px;
        color: ${themeColor.gray796};
        margin-bottom: 10px;
        ${fontLato}
      }
      .online-action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        a {
          font-weight: 600;
          font-size: 18px;
          line-height: 22px;
          color: ${themeColor.themePrimary};
          ${fontLato}
        }
        .last-date {
          font-weight: 500;
          font-size: 18px;
          line-height: 22px;
          color: ${themeColor.black};
          margin: 0px;
          ${fontLato}
          span {
            color: ${themeColor.gray780};
          }
        }
        .last-date-rented {
          font-weight: 500;
          font-size: 18px;
          line-height: 22px;
          color: ${themeColor.gray780};
          margin: 0px;
          ${fontLato}
        }
        .day-block-main {
          margin: 0px;
          padding: 0px;
          font-weight: 500;
          font-size: 20px;
          line-height: 22px;
          color: ${themeColor.themePrimary};
          ${fontLato}
        }
      }
    }
  }
`;
export const CategoriesBlock = styled.div``;
export const CategoriesFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* margin: 0px -15px; */
`;
export const CategoriesFlexInner = styled.div`
  /* padding: 0px 15px 20px; */
  /* width: 25%; */
  .categories-block {
    background: ${themeColor.white};
    box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 100%;
    margin-bottom: 20px;

    .img-block-categories {
      img {
        border-radius: 10px;
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
    }
    h2 {
      padding: 8px 20px;
      font-weight: 600;
      font-size: 24px;
      line-height: 30px;
      ${fontLato}
      color: ${themeColor.black};
      font-weight: 700;
      @media (max-width: 768px){
        font-size:18px;
        line-height: 22px;
      }
      span {
        font-size: 18px;
        line-height: 20px;
        font-weight: 500;
      }
    }
  }
`;
export const SparePartsBLock = styled.div``;

export const SparePartsFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* margin: 0px -15px; */
`;
export const SparePartsFlexInner = styled.div`
  padding: 0px 20px 0 0;
  width: 20%;
  @media (max-width:768px){
    width: 50%;
  }
  @media (max-width:575px){
    width: 100%;
  }

  .spareparts-block {
    background: ${themeColor.white};
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
    /* @media (max-width:575px){
    } */
    .img-block-spareparts {
      img {
        width: 100%;
        height: 190px;
        object-fit: cover;
      }
    }
    .spareparts-block-content {
      padding: 12px;
      h3 {
        font-weight: 500;
        font-size: 17px;
        line-height: 24px;
        margin-bottom: 7px;
        color: ${themeColor.black};
        ${fontLato}
      }
      p {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: ${themeColor.gray780};
        ${fontLato}
        margin-bottom: 8px;
      }
      .price-distance {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price-tag {
          margin-bottom: 0px;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: ${themeColor.themePrimary};
          ${fontLato}
        }
        .distance-block {
          display: flex;
          align-items: center;
          p {
            margin: 0px;
            padding: 0px;
            font-weight: 500;
            font-size: 18px;
            line-height: 18px;
            color: ${themeColor.black950};
            padding-left: 5px;
            ${fontLato}
          }
        }
      }
    }
  }
`;
