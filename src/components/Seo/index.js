import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        titleTemplate
        description
        siteUrl
        lang
      }
    }
  }
`;

const SEO = ({
  pageTitle,
  customTitle,
  articleDescription,
  customMetaDescription,
  canonicalUrl,
  imageUrl,
  article = false,
}) => {
  const { site } = useStaticQuery(query);
  const { pathname } = useLocation();

  const { title, titleTemplate, description, lang, siteUrl } =
    site.siteMetadata;

  // Priority: customTitle > pageTitle > default title
  const finalTitle = customTitle || pageTitle || title;

  // Priority: customMetaDescription > articleDescription > default description
  const metaDescription =
    customMetaDescription || articleDescription || description;

  const metaImage = imageUrl;

  // Priority: canonicalUrl > current URL
  const finalCanonical = canonicalUrl || `${siteUrl}${pathname}`;

  return (
    <Helmet
      defaultTitle={title}
      title={customTitle || pageTitle || undefined} // Only set if we have a custom/page title
      titleTemplate={customTitle ? null : titleTemplate} // Skip template if custom title is provided
      htmlAttributes={{ lang }}
      link={[
        {
          rel: "canonical",
          href: finalCanonical,
        },
      ]}
      meta={[
        {
          name: `google-site-verification`,
          content: "aLk2ouZ5Z0wTnhGaYSU_g2GuzM4ri4GIocbuVa2wotU",
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: finalTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: article ? `article` : `website`,
        },
        {
          property: `og:url`,
          content: finalCanonical,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          name: `twitter:title`,
          content: finalTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
      ]}
    />
  );
};

export default SEO;

SEO.propTypes = {
  pageTitle: PropTypes.string,
  customTitle: PropTypes.string,
  articleDescription: PropTypes.string,
  customMetaDescription: PropTypes.string,
  canonicalUrl: PropTypes.string,
  imageUrl: PropTypes.string,
  article: PropTypes.bool,
};
SEO.defaultProps = {
  pageTitle: null,
  customTitle: null,
  articleDescription: null,
  customMetaDescription: null,
  canonicalUrl: null,
  imageUrl: null,
  article: false,
};
