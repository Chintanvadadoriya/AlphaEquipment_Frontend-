import Head from "next/head";
import { seoDetail } from "@utils";

const PageDetails = ({ metaDetail }) => {
  const title = metaDetail?.title || seoDetail.title;
  const metaTitle = metaDetail?.metaTitle || seoDetail.title;
  const desc = metaDetail?.desc || seoDetail.desc;
  const metDesc = metaDetail?.metDesc || seoDetail.desc;
  const canonical = metaDetail?.canonical || seoDetail.canonical;
  const image = metaDetail?.image || seoDetail.image;
  const metaImage = metaDetail?.metaImage || seoDetail.metaImage;
  const siteKeywords = metaDetail?.keywords || seoDetail.keywords;
  const siteName = seoDetail.siteName;
  const siteIcon = seoDetail.siteIcon;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      {metaDetail?.keywords && <meta name="keywords" content={siteKeywords} />}

      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={metaTitle} />
      <meta name="og:description" property="og:description" content={metDesc} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metDesc} />
      {/* <meta name="twitter:site" content="@propernounco" /> */}
      {/* <meta name="twitter:creator" content="@propernounco" /> */}
      <link rel="icon" sizes="192x192" href={image || siteIcon} />
      <link rel="apple-touch-icon" href={image || siteIcon} />
      <meta property="og:image" content={metaImage} />
      <meta name="twitter:image" content={metaImage} />
      {metaDetail?.canonical && <link rel="canonical" href={canonical} />}
    </Head>
  );
};

export default PageDetails;
