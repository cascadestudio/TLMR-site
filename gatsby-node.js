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

  createRedirect({
    fromPath:
      "/e-services/generateur-de-politique-de-confidentialite-conforme-rgpd/",
    toPath:
      "/e-services#Générateur de politique de confidentialité conforme RGPD/",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/e-services/protection-des-creations/",
    toPath: "/e-services#Protection des créations/",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/e-services/signatureelectronique/",
    toPath: "/e-services#Signature électronique/",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/e-services/legal-design/",
    toPath: "/e-services#Legal design/",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/e-services/pack-rgpd/",
    toPath: "/e-services/",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/e-services/avomarque-fr/",
    toPath: "/e-services/",
    isPermanent: true,
  });
  createRedirect({
    fromPath:
      "/competence/droit-de-linformatique-et-des-technologies-ia-blockchain-iot/",
    toPath:
      "/expertises#Informatique, logiciel, Intelligence artificielle, Blockchain",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/competence/propriete-intellectuelle-et-industrielle/",
    toPath: "/expertises#Innovation, Propriété intellectuelle et industrielle",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/competence/donnees-personnelles-et-conformite-cnil-rgpd/",
    toPath: "/expertises#Données personnelles et conformité CNIL/RGPD",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/competence/penal-et-cybercriminalite/",
    toPath: "/expertises#Pénal, Cybercriminalité et e‑réputation",
    isPermanent: true,
  });
  createRedirect({
    fromPath:
      "/competence/droit-de-linternet-e-commerce-plafeforme-infopreneuriat/",
    toPath: "/expertises#Internet, plateformes et e‑commerce",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/competence/droits-a-limage-e-reputation-medias-et-vie-privee/",
    toPath: "/expertises#Pénal, Cybercriminalité et e‑réputation",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/competence/fiscalite-du-web-et-de-linnovation/",
    toPath: "/expertises#Innovation, Propriété intellectuelle et industrielle",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/competence/droit-des-affaires-et-des-entreprises/",
    toPath: "/expertises#Affaires complexes et contentieux à risque",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/competence/droit-immobilier/",
    toPath: "/expertises#Droit immobilier, copropriété, baux et construction",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/competence/droit-du-travail-et-numerique/",
    toPath: "/expertises#Droit du travail numérique et de la formation",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/competence/droit-de-la-formation/",
    toPath: "/expertises#Droit du travail numérique et de la formation",
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
