import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "gatsby";

// Shine animation for the button
const shineAnimation = keyframes`
  0% {
    left: -100%;
  }
  20% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
`;

const CardWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.blackLight};
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const GoogleReviewsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 2px;
`;

const StarIcon = styled.span`
  color: ${(props) => (props.$filled ? "#fbbc04" : "rgba(255, 255, 255, 0.3)")};
  font-size: 14px;
`;

const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const RatingText = styled.span`
  font-family: "Söhne Kräftig";
  font-size: 13px;
  color: white;
`;

const ReviewCount = styled.span`
  font-family: "Signifier Light";
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
`;

const ContentSection = styled.div`
  text-align: center;
`;

const CardTitle = styled.h3`
  font-family: "Söhne Kräftig";
  font-size: 17px;
  line-height: 22px;
  color: white;
  margin: 0 0 8px;
`;

const CardDescription = styled.p`
  font-family: "Signifier Light";
  font-size: 14px;
  line-height: 19px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
`;

const CtaButton = styled(Link)`
  display: block;
  padding: 12px 16px;
  border-radius: 100px;
  background-color: white;
  color: ${(props) => props.theme.colors.blackLight};
  text-decoration: none;
  font-family: "Söhne Kräftig";
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  transition: background-color 0.2s ease, transform 0.2s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.5),
      transparent
    );
    animation: ${shineAnimation} 3s infinite;
  }

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.02);
  }
`;

// Stars component
const Stars = ({ rating }) => {
  return (
    <StarsContainer>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} $filled={star <= rating}>
          ★
        </StarIcon>
      ))}
    </StarsContainer>
  );
};

const SidebarCtaCard = ({
  title = "Besoin d'un avocat ?",
  description = "Contactez TLMR Avocats pour un premier echange confidentiel.",
  buttonText = "Prendre rendez-vous",
  buttonLink = "/contact",
  showGoogleReviews = true,
}) => {
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    if (showGoogleReviews) {
      const fetchReviews = async () => {
        try {
          const response = await fetch("/.netlify/functions/google-reviews");
          if (response.ok) {
            const data = await response.json();
            if (!data.error && data.averageRating) {
              setReviewData(data);
            }
          }
        } catch (err) {
          console.error("Error fetching reviews for sidebar CTA:", err);
        }
      };
      fetchReviews();
    }
  }, [showGoogleReviews]);

  return (
    <CardWrapper>
      {showGoogleReviews && reviewData && (
        <GoogleReviewsSection>
          <Stars rating={Math.round(reviewData.averageRating)} />
          <ReviewInfo>
            <RatingText>{reviewData.averageRating}/5</RatingText>
            <ReviewCount>{reviewData.totalReviewCount} avis Google</ReviewCount>
          </ReviewInfo>
        </GoogleReviewsSection>
      )}
      <ContentSection>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </ContentSection>
      <CtaButton to={buttonLink}>{buttonText}</CtaButton>
    </CardWrapper>
  );
};

export default SidebarCtaCard;