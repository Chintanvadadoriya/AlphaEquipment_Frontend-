import styled from "styled-components";
import { BrotherFont, LateefFont, fontLato } from "./fontStyle";
import { themeColor } from "./theme";

export const CommonInner = styled.div`
  padding: 50px 0px 60px;
  .category-content-about {
    margin-top: 70px;
    @media (max-width: 768px) {
      margin-top: 35px;
    }
    h2 {
      font-size: 32px;
      font-weight: 700;
      line-height: 36px;
      margin-bottom: 20px;
      ${fontLato} color: ${themeColor.themePrimary};
      @media (max-width: 768px) {
        font-size: 20px;
        line-height: 24px;
      }
    }
    h3 {
      font-size: 24px;
      font-weight: 700;
      line-height: 40px;
      margin-bottom: 20px;
      color: ${themeColor.gray950};
      ${fontLato};
      @media (max-width: 768px) {
        font-size: 18px;
        line-height: 22px;
      }
    }
    p {
      font-size: 18px;
      font-weight: 400;
      line-height: 32px;
      margin-bottom: 20px;
      color: ${themeColor.black};
      ${fontLato};
      @media (max-width: 768px) {
        font-size: 16px;
        line-height: 20px;
      }
    }
    h4 {
      font-size: 20px;
      line-height: 34px;
      margin-bottom: 20px;
      ${fontLato} font-weight: 700;
      color: ${themeColor.gray852};
      @media (max-width: 768px) {
        font-size: 18px;
        line-height: 22px;
      }
    }
  }
  .listing-block-category {
    .listing-block-inner {
      border: 1px solid ${themeColor.gray331};
      .listing-top-block {
        padding: 29px 26px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        @media (max-width: 768px) {
          padding: 12px;
        }
        h2 {
          font-size: 28px;
          font-weight: 700;
          line-height: 36px;
          color: ${themeColor.themePrimary};
          margin: 0px;
          ${fontLato};
          @media (max-width: 768px) {
            font-size: 20px;
            line-height: 24px;
          }
        }
        p {
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          color: ${themeColor.gray950};
          margin: 0px;
          ${fontLato};
        }
        .search-block-main {
          .input-group {
            margin-right: 20px;
            @media (max-width: 992px) {
              width: 80%;
            }
            .form-control {
              background: ${themeColor.white};
              border: 1px solid ${themeColor.gray510};
              border-radius: 5px;
              padding: 7px 15px;
              font-weight: 400;
              font-size: 16px;
              font-weight: 400;
              color: ${themeColor.gray520};
              box-shadow: none;
              outline: none;
              &::placeholder {
                /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: ${themeColor.gray520};
              }

              :-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                color: ${themeColor.gray520};
              }

              ::-ms-input-placeholder {
                /* Microsoft Edge */
                color: ${themeColor.gray520};
              }
              @media (max-width: 992px) {
                padding: 7px 15px;
                font-size: 14px;
              }
            }
            .main-button {
              font-weight: 700;
              font-size: 20px;
              color: ${themeColor.white};
              /* border-radius: 5px; */
              background-color: ${themeColor.themePrimary};
              padding: 0px 20px;
              font-family: "Lato", sans-serif;
              font-weight: 700;
              border: none;
              outline: none;
              @media (max-width: 992px) {
                padding: 7px 15px;
                font-size: 14px;
              }
            }
          }
        }
      }
      .listing-block-roller {
        ${fontLato}
        &.inner-spear-parts-block {
          display: flex;
          flex-wrap: wrap;
          padding: 0 10px !important;
          border: none;
          @media (max-width: 992px) {
            justify-content: center;
          }
          .listing-block-roller-inner {
            padding: 0px 10px 20px;
            max-width: 265px;
            width: 100%;
            border: none;
            .listing-block-img-inner {
              background: ${themeColor.white};
              box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.15);
              border-radius: 10px;
              overflow: hidden;
              .listing-block-img {
                display: block;
                width: 100%;
                padding: 0px;
                img {
                  border-radius: 0px;
                  height: 190px;
                }
              }
              .listing-content {
                width: 100%;
                padding: 12px;
                h3 {
                  width: 100%;
                  font-size: 18px;
                  line-height: 24px;
                  margin-bottom: 6px;
                }
                .listing-laction {
                  position: relative;
                  display: block;
                  > p {
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 22px;
                    color: ${themeColor.gray780};
                    width: 100%;
                    overflow: hidden;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    display: block;
                    display: -webkit-box;
                  }
                  .distance-block {
                    position: absolute;
                    top: 23px;
                    right: 0px;
                    background-color: ${themeColor.white};
                    img {
                      width: 20px;
                    }
                    p {
                      font-weight: 500;
                      font-size: 18px;
                      line-height: 18px;
                      color: ${themeColor.black950};
                      padding-left: 8px;
                    }
                  }
                }
                .price-block-listing {
                  p {
                    font-size: 18px;
                    line-height: 24px;
                    color: ${themeColor.themePrimary};
                    margin-bottom: 0px;
                  }
                }
              }
            }
          }

          .last-btn-block {
            width: 100%;
          }
        }
        .listing-block-roller-inner {
          display: flex;
          padding: 20px 14px;
          border-top: 1px solid ${themeColor.gray331};
          @media (max-width: 575px) {
            display: block;
          }
          .listing-block-img {
            max-width: 290px;
            width: 100%;
            padding: 0px 8px;
            @media (max-width: 575px) {
              max-width: unset;
              padding: 0;
              margin-bottom: 20px;
            }
            img {
              width: 100%;
              height: auto;
              border-radius: 5px;
              object-fit: cover;
            }
          }
        }
        .listing-content {
          padding: 0px 8px;
          h3 {
            font-weight: 600;
            font-size: 24px;
            line-height: 30px;
            color: ${themeColor.black};
            margin-bottom: 15px;
            ${fontLato};
          }
          .listing-laction {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            p {
              font-weight: 500;
              font-size: 18px;
              line-height: 23px;
              color: ${themeColor.black};
              margin: 0px;
              width: 85%;
              ${fontLato} span {
                color: ${themeColor.gray796};
              }
            }
            .distance-block {
              display: flex;
              align-items: center;
              p {
                font-weight: 500;
                font-size: 16px;
                line-height: 16px;
                margin: 0px;
                color: ${themeColor.black950};
                padding-left: 4px;
                ${fontLato};
              }
            }
          }
          .hourse-meeter-block {
            margin-bottom: 10px;
            p {
              font-weight: 500;
              font-size: 18px;
              line-height: 23px;
              color: ${themeColor.black};
              margin: 0px;
              width: 85%;
              ${fontLato} span {
                color: ${themeColor.gray796};
              }
            }
          }
          .note-listing {
            margin-bottom: 12px;
            p {
              font-weight: 500;
              font-size: 18px;
              line-height: 25px;
              color: ${themeColor.black};
              ${fontLato} span {
                font-weight: 600;
              }
            }
          }
          .price-block-listing {
            p {
              font-weight: 700;
              font-size: 22px;
              line-height: 22px;
              ${fontLato} color: ${themeColor.themePrimary};
            }
          }
        }
      }
      .last-btn-block {
        text-align: center;
        padding: 30px 0;
        border-top: 1px solid ${themeColor.gray331};
        .main-button {
          font-weight: 400;
          font-size: 18px;
          line-height: 18px;
          font-family: "Lato", sans-serif;
          font-style: normal;
          background: ${themeColor.themePrimary};
          border-radius: 5px;
          border: none;
          padding: 14px 20px;
          outline: none;
        }
      }
    }
  }
  .category-detail {
    .listing-block-roller-inner {
      max-width: 298px !important;
      width: 100% !important;
      padding: 0px 10px 10px !important;
      margin-bottom: 20px;
    }

    .last-btn-block {
      border-top: none !important;
    }
  }

  .category-block-sidebar {
    /* padding: 0px 15px; */
    @media (max-width: 991px) {
      width: 100%;
      margin-bottom: 30px;
    }
    .category-block-sidebar-inner {
      background-color: ${themeColor.white};
      box-shadow: 0px 0px 19px 1px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      position: relative;
      .top-block-sidebar {
        text-align: center;
        padding: 20px;
        background-color: ${themeColor.themePrimary};
        border-bottom: 1px solid ${themeColor.gray309};
        @media (max-width: 768px) {
          padding: 10px 20px;
        }
        h2 {
          font-weight: 700;
          font-size: 23px;
          line-height: 24px;
          color: ${themeColor.white};
          margin: 0px;
          ${fontLato};
          @media (max-width: 768px) {
            font-size: 20px;
          }
        }
      }
      ul {
        margin: 0px;
        padding: 0px;
        list-style: none;
        li {
          a {
            padding: 16px 20px;
            font-weight: 400;
            font-size: 18px;
            line-height: 20px;
            display: block;
            color: ${themeColor.black};
            border: 1px solid ${themeColor.gray309};
            border-top: none;
            transition: 0.5s;
            ${fontLato} span {
              font-weight: 600;
            }
            &:hover {
              background-color: ${themeColor.themePrimary};
              color: ${themeColor.white};
              transition: 0.5s;
              border-color: ${themeColor.themePrimary};
            }
            @media (max-width: 768px) {
              padding: 10px 20px;
            }
          }
        }
      }
      .accordion {
        .accordion__item {
          border-top: 1px solid ${themeColor.gray309};
          .accordion__heading {
            .accordion__button {
              background-color: transparent;
              font-weight: 700;
              font-size: 18px;
              line-height: 24px;
              color: ${themeColor.black};
              padding: 15px 20px;
              border-bottom: 1px solid ${themeColor.gray309};
              position: relative;
              &:before {
                position: absolute;
                right: 15px;
                height: 13px;
                width: 13px;
                top: 20px;
              }
            }
          }
        }
        .accordion__panel {
          padding: 0px;
          a {
            padding: 16px 20px;
            font-weight: 400;
            font-size: 18px;
            line-height: 20px;
            display: block;
            color: ${themeColor.black};
            border: 1px solid ${themeColor.gray309};
            border-top: none;
            -webkit-transition: 0.5s;
            transition: 0.5s;
            font-family: "Lato", sans-serif;
            font-style: normal;
            &:hover {
              color: ${themeColor.white};
              background-color: ${themeColor.themePrimary};
            }
          }
        }
      }
    }
  }
  .category-block-right {
    .category-block-right-inner {
      padding: 30px 30px 0;
      background: ${themeColor.white};
      border: 1px solid ${themeColor.gray309};
      border-radius: 5px;
      .top-block-right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        flex-wrap: wrap;

        h2 {
          font-weight: 700;
          font-size: 32px;
          line-height: 32px;
          color: ${themeColor.white};
          margin: 0px;
          color: ${themeColor.themePrimary};
          ${fontLato};

          @media (max-width: 991px) {
            margin-bottom: 15px;
          }
          @media (max-width: 768px) {
            font-size: 20px;
          }
        }
        .input-group {
          height: 40px;
          max-width: 328px;
          width: 100%;
          .form-control {
            background: ${themeColor.white};
            border: 1px solid ${themeColor.gray510};
            border-radius: 5px;
            padding: 7px 27px 7px 15px;
            font-weight: 400;
            font-size: 16px;
            font-weight: 400;
            box-shadow: none;
            outline: none;
            ${fontLato};
            color: ${themeColor.gray520};
          }
          .main-button {
            background-color: ${themeColor.themePrimary};
            border: none;
          }
        }
      }
      .category-block-list {
        .category-box {
          display: flex;
          flex-wrap: wrap;
          padding: 0px;

          @media (max-width: 768px) {
            justify-content: center;
          }
          .category-box-detail {
            max-width: 265px;
            width: 100%;
            margin-bottom: 30px;
            margin-right: 20px;
            &:last-child {
              margin-right: 0;
            }
            a {
              display: block;
              background-color: ${themeColor.white};
              box-shadow: 0px 0px 19px rgba(0, 0, 0, 0.1);
              border-radius: 10px;
              img {
                width: 100%;
                height: 190px;
                object-fit: cover;
              }
              p {
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                ${fontLato};
                color: ${themeColor.black};
                padding: 12px 5px;
                text-align: center;
                margin: 0px;
              }
            }
          }
        }
      }
    }
    .button-block-last {
      text-align: center;
      margin: 30px 0;
      .main-button {
        font-weight: 400;
        font-size: 18px;
        line-height: 18px;
        ${fontLato};
        background: ${themeColor.themePrimary};
        border-radius: 5px;
        border: none;
        padding: 14px 20px;
        outline: none;
      }
    }
  }
  .category-detail-main {
    .carousel-root {
      .thumbs {
        display: none;
      }
      .carousel-slider {
        .control-dots {
          display: none;
        }
        .carousel-status {
          display: none;
        }
        .control-arrow {
          &.control-prev {
            opacity: 1;
            &:before {
              border: none !important;
              border-bottom-style: solid !important;
              border-bottom-width: 2px !important;
              border-right-style: solid !important;
              border-right-width: 2px !important;
              border-color: ${themeColor.white} !important;
              content: "";
              display: inline-block;
              height: 16px;
              position: absolute;
              width: 16px;
              transform: rotate(135deg);
              left: 15px;
            }
          }
          &.control-next {
            opacity: 1;
            &:before {
              border: none !important;
              border-bottom-style: solid !important;
              border-bottom-width: 2px !important;
              border-right-style: solid !important;
              border-right-width: 2px !important;
              border-color: ${themeColor.white} !important;
              content: "";
              display: inline-block;
              height: 16px;
              position: absolute;
              width: 16px;
              transform: rotate(-45deg);
              right: 15px;
            }
          }
        }
        .slide {
          margin: 0 auto;
          display: table;
          background-color: ${themeColor.black};
          .carousel-slider-img {
            width: 50%;
            margin: 0 auto;

            img {
              width: 100%;
              height: auto;
            }
          }
        }
      }
    }
  }
  .detail-content-inner {
    display: flex;
    border: 1px solid ${themeColor.gray331};
    padding: 40px 30px;
    margin-top: -40px;
    @media (max-width: 575px) {
      padding: 12px;
    }
    .left-detail-content-inner {
      margin-right: 42px;
      @media (max-width: 768px) {
        margin-right: 0;
      }
      h2 {
        font-size: 32px;
        font-weight: 700;
        line-height: 32px;
        color: ${themeColor.black};
        ${fontLato};
        margin-bottom: 27px;
        @media (max-width: 768px) {
          font-size: 20px;
          line-height: 24px;
        }
      }
      .detail-product {
        .located-block {
          margin-bottom: 15px;
          @media (max-width: 768px) {
            margin-bottom: 0;
          }
          p {
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            color: ${themeColor.gray793};
            ${BrotherFont};
            margin-top: 5px;
            margin-bottom: 0;
          }
          .location-detail {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 340px;
            width: 100%;

            .distance-block {
              display: flex;
              align-items: end;
              p {
                font-weight: 500;
                font-size: 20px;
                line-height: 18px;
                ${fontLato};
                color: ${themeColor.black950};
                margin: 0;
                margin-left: 6px;
              }
            }
          }
        }

        .lacted-address {
          display: flex;
          margin-right: 12px;
          h5 {
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            color: ${themeColor.gray950};
            ${fontLato};
            margin: 0px;
            margin-left: 8px;
          }
        }

        .common-block-content {
          padding: 0 35px;
          margin-bottom: 15px;
          border-left: 2px solid ${themeColor.gray310};
          @media (max-width: 575px) {
            border-left: unset !important;
            padding: 10px 0;
            margin-bottom: 0;
          }
          p {
            font-weight: 400;
            font-size: 16px;
            line-height: 18px;
            ${BrotherFont};
            color: ${themeColor.gray793};
            margin-bottom: 5px;
            margin-top: 10px;
          }
          h4 {
            font-size: 16px;
            line-height: 18px;
            color: ${themeColor.gray950};
            ${fontLato};
            font-weight: 700;
          }
        }
      }
      .spare-distance {
        display: flex;
        align-items: end;
        margin-bottom: 15px;
        @media (max-width: 768px) {
          margin-bottom: 0;
        }
        p {
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          color: ${themeColor.gray793};
          ${BrotherFont};
          margin-top: 5px;
          margin-bottom: 0;
          @media (max-width: 768px) {
            font-size: 14px;
          }
        }
        .location-detail {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 340px;
          width: 100%;

          .distance-block {
            display: flex;
            align-items: end;
            p {
              font-weight: 500;
              font-size: 20px;
              line-height: 18px;
              ${fontLato};
              color: ${themeColor.black950};
              margin: 0;
              margin-left: 6px;
            }
          }
        }

        .lacted-address {
          display: block;
          margin-right: 12px;
          span {
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            color: ${themeColor.gray950};
            ${fontLato};
            margin: 0px;
            margin-left: 8px;
          }
        }

        p {
          font-size: 20px;
          font-weight: 500;
          line-height: 18px;
          margin-bottom: 12px;
        }
      }
    }
    .detail-main-block {
      margin-top: 30px;
      border-bottom: 1px solid ${themeColor.gray510};
      padding-bottom: 10px;
      h3 {
        font-size: 28px;
        font-weight: 700;
        line-height: 30px;
        color: ${themeColor.black};
        margin-bottom: 20px;
        @media (max-width: 768px) {
          font-size: 20px;
          line-height: 24px;
        }
      }
      .feature-block-inner {
        display: flex;
        align-items: center;
        margin-bottom: 17px;
        @media (max-width: 575px) {
          display: block;
        }
        h4 {
          font-size: 22px;
          font-weight: 600;
          line-height: 25px;
          ${fontLato};
          color: ${themeColor.black};
          margin: 0px;
          flex-basis: 150px;
          white-space: nowrap;
          @media (max-width: 768px) {
            font-size: 18px;
            line-height: 20px;
          }
        }
        p {
          font-size: 20px;
          font-weight: 400;
          line-height: 30px;
          margin-bottom: 0px;
          color: ${themeColor.gray950};
          ${fontLato};
          @media (max-width: 768px) {
            font-size: 16px;
          }
        }
      }
    }
    .common-details-block-img {
      .common-details-block-img-inner {
        padding-top: 30px;
        padding-bottom: 15px;
        border-bottom: 1px solid ${themeColor.gray510};
        &:last-child {
          padding-bottom: 0px;
          border: none;
        }
        &.border-none-padding {
          border: none;
          padding-bottom: 0px;
        }
        .img-title-top {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          h3 {
            font-size: 28px;
            line-height: 30px;
            font-weight: 700;
            ${fontLato};
            color: ${themeColor.black};
            padding-right: 20px;
            @media (max-width: 768px) {
              font-size: 20px;
              line-height: 24px;
            }
          }
          .img-block-photo {
            display: flex;
            align-items: center;
            p {
              margin: 0px;
              font-weight: 700;
              font-size: 16px;
              line-height: 22px;
              text-decoration-line: underline;
              color: ${themeColor.themePrimary};
              ${fontLato} padding-left: 5px;
            }
          }
        }
        .img-block-inner {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 20px;
          .img-block-slider {
            width: 19%;
            img {
              width: 125px;
              border-radius: 5px;
              height: auto;
            }
          }
          .icon-slider-img {
            width: 5%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .feature-block-inner {
          display: flex;
          margin-bottom: 17px;
          @media (max-width: 575px) {
            display: block;
          }
          &.serial-number-block {
            h4 {
              width: auto;
              padding-right: 15px;
              @media (max-width: 768px) {
                font-size: 18px;
                line-height: 22px;
              }
            }
            p {
              width: auto;
            }
          }
          h4 {
            font-size: 22px;
            font-weight: 600;
            line-height: 25px;
            ${fontLato};
            color: ${themeColor.black};
            margin: 0px;
            white-space: nowrap;
            @media (max-width: 768px) {
              font-size: 20px;
            }
          }
          p {
            font-size: 20px;
            font-weight: 400;
            line-height: 30px;
            margin-bottom: 0px;
            color: ${themeColor.gray950};
            ${fontLato};
            @media (max-width: 768px) {
              font-size: 16px;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
  .right-detail-content-inner {
    .right-left-content {
      background: ${themeColor.white};
      border: 1px solid rgba(219, 219, 219, 0.1);
      box-shadow: 0px 0px 19px 1px rgba(0, 0, 0, 0.1);
      border-radius: 5px;

      &.left-block-tabs {
        .nav-tabs {
          width: 100%;
          border: none;
          .nav-item {
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            .nav-link {
              font-size: 18px;
              line-height: 22px;
              font-weight: 400;
              color: ${themeColor.black};
              ${fontLato};
              background: ${themeColor.gray120};
              border: 1px solid ${themeColor.themePrimary};
              padding: 15px 10px;
              width: 100%;
              border-radius: 0px;
              &.active {
                background: ${themeColor.themePrimary};
                color: ${themeColor.white};
              }
              @media (max-width: 768px) {
                padding: 9px;
                font-size: 16px;
                line-height: 20px;
              }
            }
          }
        }
      }
      h3 {
        font-size: 22px;
        font-weight: 700;
        line-height: 26px;
        ${fontLato} color: ${themeColor.white};
        padding: 14px 51px;
        background-color: ${themeColor.themePrimary};
        border: 1px solid rgba(219, 219, 219, 0.1);
        @media (max-width: 768px) {
          font-size: 18px;
          line-height: 22px;
          padding: 8px 21px;
        }
      }

      .right-left-content-inner {
        padding: 20px 10px;
        .share-block {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 10px;
          .bid-rate {
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            color: ${themeColor.black950};
            background: rgba(227, 227, 227, 0.6);
            border-radius: 30px;
            margin-bottom: 20px;
            width: 108px;
            padding: 4px 24px;
          }
          .high-bid {
            width: 190px;
          }
          p {
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            ${fontLato} color: ${themeColor.gray950};
          }
        }
        .share-block-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 10px;
          margin-bottom: 15px;
          .bid-rate {
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            color: ${themeColor.black950};
            background: rgba(227, 227, 227, 0.6);
            border-radius: 30px;
            margin-bottom: 20px;
            width: 108px;
            padding: 4px 24px;
          }
          .high-bid {
            width: 190px;
          }
          p {
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            ${fontLato} color: ${themeColor.gray950};
          }
        }
        .share-warp {
          height: 250px;
          overflow-y: scroll;
          margin-bottom: 30px;
        }
        .bid-time-detail {
          h6 {
            text-align: right;
          }
        }
        .form-group-main {
          margin-bottom: 15px;
          .form-control {
            &::placeholder {
              font-weight: 400;
              color: ${themeColor.gray600};
            }
            &:focus {
              box-shadow: none;
            }
            &:focus-visible {
              outline: none;
            }
            &:hover,
            &:focus {
              &::-webkit-outer-spin-button,
              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                box-shadow: none !important;
              }
            }
            &[type="number"] {
              -moz-appearance: textfield;
            }
          }
        }
        h2 {
          font-size: 44px;
          font-weight: 700;
          line-height: 44px;
          ${fontLato} color: ${themeColor.themePrimary};
          margin-bottom: 30px;
          @media (max-width: 768px) {
            font-size: 24px;
            line-height: 28px;
          }
        }
        button {
          background-color: ${themeColor.themePrimary};
          border-radius: 10px;
          padding: 14px;
          font-weight: 700;
          font-size: 18px;
          line-height: 18px;
          text-transform: uppercase;
          color: ${themeColor.white};
          width: 100%;
          border: none;
          margin-bottom: 20px;
          @media (max-width: 768px) {
            padding: 11px 14px;
            font-size: 16px;
          }
        }
        p {
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;
          ${fontLato} margin-bottom:0;
          color: ${themeColor.gray793};
        }
        .outline-btn {
          background-color: transparent;
          border: 1px solid ${themeColor.gray510};
          color: ${themeColor.themePrimary};
          padding: 6px 20px;
          h2 {
            font-size: 34px;
            line-height: 44px;
            font-weight: 500;
            color: ${themeColor.black};
            text-align: left;
            margin-bottom: 0;
            @media (max-width: 575px) {
              font-size: 20px;
              line-height: 24px;
            }
            span {
              font-size: 24px;
              line-height: 44px;
              font-weight: 700;
              color: ${themeColor.themePrimary};
              padding-left: 90px;
              @media (max-width: 575px) {
                font-size: 20px;
                line-height: 24px;
                padding-left: 20px;
              }
            }
          }
        }
        .increas-btn {
          background-color: ${themeColor.cream700};
          border-radius: 70px;
          color: ${themeColor.themePrimary};
        }
        .right-bid-time {
          border: 1px solid ${themeColor.gray510};
          margin-bottom: 20px;
          .right-bid-time-detail {
            display: flex;
            padding: 16px;
            align-items: center;
            border-bottom: 1px solid ${themeColor.gray510};
            &:last-child {
              border-bottom: none;
            }
            h6 {
              font-weight: 400;
              font-size: 16px;
              line-height: 24px;
              color: ${themeColor.gray950};
              margin-bottom: 0;
              padding-left: 15px;
              span {
                font-weight: 700;
                font-size: 16px;
                line-height: 24px;
                padding-left: 5px;
              }
              .blue {
                font-weight: 400;
                color: ${themeColor.blue800};
              }
            }
          }
        }
      }
    }
  }
`;
