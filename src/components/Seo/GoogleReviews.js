import React, { useState, useEffect } from "react";
import styled from "styled-components";
import nbspPonctuation from "components/utils/nbspPonctuation";

const ReviewsWrapper = styled.section`
  margin: 80px 0;
  @media ${(props) => props.theme.minWidth.md} {
    margin: 100px 0;
  }
  @media ${(props) => props.theme.minWidth.lg} {
    margin: 120px 0;
  }
`;

const ReviewsTitle = styled.h2`
  font-size: 28px;
  line-height: 34px;
  margin-bottom: 20px;
  font-family: "Söhne Kräftig";
  text-align: center;
  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 32px;
    line-height: 38px;
  }
  @media ${(props) => props.theme.minWidth.md} {
    font-size: 36px;
    line-height: 42px;
  }
`;

const ReviewsSummary = styled.div`
  text-align: center;
  margin-bottom: 40px;
  @media ${(props) => props.theme.minWidth.md} {
    margin-bottom: 50px;
  }
`;

const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const StarIcon = styled.span`
  color: ${(props) => (props.$filled ? "#fbbc04" : "#e0e0e0")};
  font-size: 24px;
  @media ${(props) => props.theme.minWidth.md} {
    font-size: 28px;
  }
`;

const RatingText = styled.p`
  font-family: "Söhne Kräftig";
  font-size: 18px;
  color: #333;
  margin: 0;
  @media ${(props) => props.theme.minWidth.md} {
    font-size: 20px;
  }
`;

const ReviewCount = styled.p`
  font-family: "Signifier Light";
  font-size: 15px;
  color: #666;
  margin: 5px 0 0;
  @media ${(props) => props.theme.minWidth.md} {
    font-size: 16px;
  }
`;

const GoogleAttribution = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: "Signifier Light";
  font-size: 14px;
  color: #666;
  text-decoration: none;
  margin-top: 10px;

  &:hover {
    color: #333;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ReviewsList = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  gap: 30px;
  @media ${(props) => props.theme.minWidth.md} {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
`;

const ReviewCard = styled.article`
  padding: 24px;
  background: #f9f9f9;
  border-radius: 8px;
  @media ${(props) => props.theme.minWidth.md} {
    padding: 30px;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
`;

const ReviewerAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${(props) =>
    props.$photoUrl ? `url(${props.$photoUrl}) center/cover` : "#ddd"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Söhne Kräftig";
  font-size: 18px;
  color: #666;
`;

const ReviewerInfo = styled.div`
  flex: 1;
`;

const ReviewerName = styled.p`
  font-family: "Söhne Kräftig";
  font-size: 16px;
  margin: 0 0 4px;
  color: #000;
`;

const ReviewDate = styled.time`
  font-family: "Signifier Light";
  font-size: 14px;
  color: #666;
`;

const ReviewStars = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 12px;
`;

const SmallStar = styled.span`
  color: ${(props) => (props.$filled ? "#fbbc04" : "#e0e0e0")};
  font-size: 16px;
`;

const ReviewComment = styled.p`
  font-family: "Signifier Light";
  font-size: 16px;
  line-height: 24px;
  color: #333;
  margin: 0;
  @media ${(props) => props.theme.minWidth.md} {
    font-size: 17px;
    line-height: 26px;
  }
`;

const ReviewReply = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: #fff;
  border-left: 3px solid #e0e0e0;
  border-radius: 0 8px 8px 0;
`;

const ReplyHeader = styled.p`
  font-family: "Söhne Kräftig";
  font-size: 14px;
  color: #333;
  margin: 0 0 8px;
`;

const ReplyText = styled.p`
  font-family: "Signifier Light";
  font-size: 15px;
  line-height: 22px;
  color: #555;
  margin: 0;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 40px 20px;
  font-family: "Signifier Light";
  font-size: 16px;
  color: #666;
`;

// Render star icons
const Stars = ({ rating, size = "normal" }) => {
  const StarComponent = size === "small" ? SmallStar : StarIcon;
  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarComponent key={star} $filled={star <= rating}>
          ★
        </StarComponent>
      ))}
    </>
  );
};

// Format date in French
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

// Get initials from name
const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Remove "(Translated by Google)" and the translation from comments
const cleanComment = (comment) => {
  if (!comment) return "";
  // Remove everything after "(Translated by Google)" including the translation
  const translatedIndex = comment.indexOf("(Translated by Google)");
  if (translatedIndex > 0) {
    return comment.substring(0, translatedIndex).trim();
  }
  return comment;
};

// Google "G" logo SVG
const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const GoogleReviews = ({ sectionTitle }) => {
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const title = sectionTitle || "Avis de nos clients";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/.netlify/functions/google-reviews");

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.message || data.error);
        }

        setReviewData(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Generate Schema.org structured data
  const generateSchemaMarkup = () => {
    if (!reviewData || reviewData.reviews.length === 0) return null;

    const schema = {
      "@context": "https://schema.org",
      "@type": "LegalService",
      name: "Cabinet TLMR Avocats",
      image: "https://www.tlmr-avocats.com/og-image.jpg",
      address: {
        "@type": "PostalAddress",
        streetAddress: "80 avenue de la Grande Armée",
        addressLocality: "Paris",
        postalCode: "75017",
        addressCountry: "FR",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: reviewData.averageRating.toString(),
        bestRating: "5",
        worstRating: "1",
        ratingCount: reviewData.totalReviewCount.toString(),
        reviewCount: reviewData.reviews.length.toString(),
      },
      review: reviewData.reviews.slice(0, 10).map((review) => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: review.reviewer.displayName,
        },
        datePublished: review.createTime,
        reviewBody: cleanComment(review.comment),
        reviewRating: {
          "@type": "Rating",
          ratingValue: review.starRating.toString(),
          bestRating: "5",
          worstRating: "1",
        },
      })),
    };

    return schema;
  };

  // Show loading state
  if (loading) {
    return (
      <ReviewsWrapper>
        <ReviewsTitle
          dangerouslySetInnerHTML={{ __html: nbspPonctuation(title) }}
        />
        <LoadingState>Chargement des avis...</LoadingState>
      </ReviewsWrapper>
    );
  }

  // Don't render section if there's an error or no reviews
  if (error || !reviewData || reviewData.reviews.length === 0) {
    return null;
  }

  const schemaMarkup = generateSchemaMarkup();

  // Filter reviews to only show those with comments (non-empty)
  const reviewsWithComments = reviewData.reviews.filter(
    (review) => review.comment && cleanComment(review.comment).length > 0
  );

  return (
    <>
      {/* Schema.org JSON-LD */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}

      <ReviewsWrapper>
        <ReviewsTitle
          dangerouslySetInnerHTML={{ __html: nbspPonctuation(title) }}
        />

        <ReviewsSummary>
          <StarsContainer>
            <Stars rating={Math.round(reviewData.averageRating)} />
          </StarsContainer>
          <RatingText>{reviewData.averageRating} sur 5</RatingText>
          <ReviewCount>
            Basé sur {reviewData.totalReviewCount} avis Google
          </ReviewCount>
          <GoogleAttribution
            href="https://g.page/r/CZ7gkwT2bQdkEAE/review"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GoogleLogo />
            Voir tous les avis sur Google
          </GoogleAttribution>
        </ReviewsSummary>

        <ReviewsList>
          {reviewsWithComments.slice(0, 6).map((review, index) => (
            <ReviewCard key={review.reviewId || index}>
              <ReviewHeader>
                <ReviewerAvatar $photoUrl={review.reviewer.profilePhotoUrl}>
                  {!review.reviewer.profilePhotoUrl &&
                    getInitials(review.reviewer.displayName)}
                </ReviewerAvatar>
                <ReviewerInfo>
                  <ReviewerName>{review.reviewer.displayName}</ReviewerName>
                  <ReviewDate dateTime={review.createTime}>
                    {formatDate(review.createTime)}
                  </ReviewDate>
                </ReviewerInfo>
              </ReviewHeader>

              <ReviewStars>
                <Stars rating={review.starRating} size="small" />
              </ReviewStars>

              <ReviewComment>{cleanComment(review.comment)}</ReviewComment>

              {review.reviewReply && (
                <ReviewReply>
                  <ReplyHeader>Réponse de TLMR Avocats</ReplyHeader>
                  <ReplyText>{review.reviewReply.comment}</ReplyText>
                </ReviewReply>
              )}
            </ReviewCard>
          ))}
        </ReviewsList>
      </ReviewsWrapper>
    </>
  );
};

export default GoogleReviews;