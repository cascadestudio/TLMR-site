/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Touati La Motte Rouge Avocats`,
    titleTemplate: "Touati La Motte Rouge Avocats - %s",
    siteUrl: "https://www.tlmr-avocats.com",
    description:
      "Vous simplifier l’accès à l’excellence en particulier dans les domaines des technologies, de l’informatique de l’innovation, du digital, et d’internet.",
    author: "Adrien Lapasset",
    lang: "fr",
  },
  developMiddleware: (app) => {
    app.get("/.netlify/functions/google-reviews", async (req, res) => {
      try {
        const { handler } = require("./netlify/functions/google-reviews");
        const result = await handler({
          httpMethod: "GET",
          headers: req.headers,
          queryStringParameters: req.query,
        });

        if (result && result.headers) {
          Object.entries(result.headers).forEach(([key, value]) => {
            if (typeof value !== "undefined") {
              res.setHeader(key, value);
            }
          });
        }

        res.status(result?.statusCode || 200).send(result?.body || "");
      } catch (error) {
        res.status(500).json({
          error: "Failed to fetch reviews",
          message: error.message,
        });
      }
    });

    app.options("/.netlify/functions/google-reviews", (req, res) => {
      res.status(200).send("");
    });
  },
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "i7u835te",
        dataset: "production",
        token: process.env.SANITY_TOKEN,
        watchMode: true,
        overlayDrafts: true,
      },
    },
    {
      resolve: "gatsby-plugin-sanity-image",
      options: {
        projectId: "i7u835te",
        dataset: "production",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/imgs/favicon.svg",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-styled-components",
      options: {
        displayName: true,
        fileName: true,
      },
    },
    "gatsby-plugin-root-import",
    "gatsby-plugin-netlify",
    "gatsby-plugin-react-helmet",
    "gatsby-adapter-netlify",
    "gatsby-plugin-client-side-redirect",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.tlmr-avocats.com",
        sitemap: "https://www.tlmr-avocats.com/sitemap-index.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
};
