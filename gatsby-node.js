const path = require("path");

// Define GraphQL schema for optional SEO fields
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type SanityArticle implements Node {
      customTitle: String
      customH1: String
      metaDescription: String
      canonicalUrl: String
    }

    type SanityMoneyPage implements Node {
      title: String
      slug: SanitySlug
      customTitle: String
      customH1: String
      metaDescription: String
      canonicalUrl: String
      expertiseCategory: String
      _rawMainContent: JSON
      showGoogleReviews: Boolean
      showUpdateDate: Boolean
      enableCustomHTML: Boolean
      customHTML: String
      faqItems: [SanityMoneyPageFaqItem]
      relatedSpecialties: [SanityMoneyPage]
      teamMembers: [SanityTeamMember]
      bottomLinksTitle: String
    }


    type SanityCategory implements Node {
      customH1: String!
      slug: SanitySlug!
      customTitle: String
      metaDescription: String
      canonicalUrl: String
      mainContent: JSON
      _rawMainContent: JSON
    }


    type SanityMoneyPageFaqItem {
      question: String
      _rawAnswer: JSON
    }

    type SanityTeamMember implements Node {
      teamType: String
      name: String
      role: String
      photo: SanityImage
      bio: JSON
      experience: [String]
      engagements: [String]
      linkedIn: String
    }
  `;

  createTypes(typeDefs);
};

// Add resolver for _rawBottomLinks to access the internal Sanity data
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    SanityMoneyPage: {
      _rawBottomLinks: {
        type: "JSON",
        resolve: (source, args, context, info) => {
          // Access the internal Sanity data structure
          // The data is stored in the internal content digest
          return source._rawBottomLinks || source.bottomLinks || null;
        },
      },
    },
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;

  // -----------------------------------------------------------
  // Redirects for /competence/ and /e-services/ sub-pages are
  // handled as server-side 301s in netlify.toml (force = true).
  // Do NOT add createRedirect calls here for those paths —
  // gatsby-plugin-client-side-redirect would generate static HTML
  // files that override the Netlify redirects.
  // -----------------------------------------------------------

  createRedirect({
    fromPath: "/e-services/legal-design/",
    toPath: "/e-services/",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/e-services/pack-rgpd/",
    toPath: "/e-services/",
    isPermanent: true,
  });
  createRedirect({
    fromPath:
      "/competence/droit-de-linformatique-et-des-technologies-ia-blockchain-iot/",
    toPath: "/expertises/",
    isPermanent: true,
  });
  createRedirect({
    fromPath:
      "/competence/droit-de-linternet-e-commerce-plafeforme-infopreneuriat/",
    toPath: "/expertises/",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/competence/droits-a-limage-e-reputation-medias-et-vie-privee/",
    toPath: "/expertises/",
    isPermanent: true,
  });

  // Malformed URLs (typos in Sanity slugs)
  createRedirect({
    fromPath: "/-achat-vente-de-donnees-de-prospection-la-cnil-consacre-l-opt-in-informe/",
    toPath: "/achat-vente-de-donnees-de-prospection-la-cnil-consacre-l-opt-in-informe/",
    isPermanent: true,
  });

  // Duplicate URLs without trailing slash
  createRedirect({
    fromPath: "/regulation-de-l-ia-l-union-europeenne-adopte-son-reglement",
    toPath: "/regulation-de-l-ia-l-union-europeenne-adopte-son-reglement/",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/ces-3-enseignements-cles-de-la-regate-et-des-phases-de-petole-pour-traverser-une-crise-comme-le-covid",
    toPath: "/ces-3-enseignements-cles-de-la-regate-et-des-phases-de-petole-pour-traverser-une-crise-comme-le-covid/",
    isPermanent: true,
  });

  const Article = path.resolve("./src/templates/Article/index.js");

  const articleQuery = await graphql(`
    query {
      allSanityArticle {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);

  if (articleQuery.errors) {
    reporter.panicOnBuild(
      `There was an error loading Sanity articles`,
      articleQuery.errors,
    );
    return;
  }

  const articles = articleQuery.data.allSanityArticle.nodes;
  if (articles.length > 0) {
    articles.forEach((article) => {
      const path = `${article.slug.current}`;
      createPage({
        path,
        component: Article,
        context: {
          slug: article.slug.current,
        },
      });
    });
  }

  // Money Pages
  const MoneyPage = path.resolve("./src/templates/MoneyPage/index.js");

  const moneyPageQuery = await graphql(`
    query {
      allSanityMoneyPage {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);

  if (moneyPageQuery.errors) {
    reporter.panicOnBuild(
      `There was an error loading Sanity Money Pages`,
      moneyPageQuery.errors,
    );
    return;
  }

  const moneyPages = moneyPageQuery.data.allSanityMoneyPage.nodes;
  if (moneyPages.length > 0) {
    moneyPages.forEach((moneyPage) => {
      const pagePath = `/expertises/${moneyPage.slug.current}`;
      createPage({
        path: pagePath,
        component: MoneyPage,
        context: {
          slug: moneyPage.slug.current,
        },
      });
    });
  }

  // Category Pages
  const CategoryPage = path.resolve("./src/templates/CategoryPage/index.js");

  const categoryPageQuery = await graphql(`
    query {
      allSanityCategory {
        nodes {
          _id
          slug {
            current
          }
        }
      }
    }
  `);

  if (categoryPageQuery.errors) {
    reporter.panicOnBuild(
      `There was an error loading Sanity Category Pages`,
      categoryPageQuery.errors,
    );
    return;
  }

  const categories = categoryPageQuery.data.allSanityCategory.nodes;
  if (categories.length > 0) {
    categories.forEach((category) => {
      const pagePath = `/${category.slug.current}`;
      createPage({
        path: pagePath,
        component: CategoryPage,
        context: {
          slug: category.slug.current,
          categoryId: category._id,
        },
      });
    });
  }
};
