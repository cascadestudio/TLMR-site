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

const StickyWrapper = styled.div`
  position: fixed;
  bottom: 16px;
  left: 16px;
  right: 16px;
  z-index: 1000;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: translateY(${(props) => (props.$isVisible ? "0" : "120%")});
  opacity: ${(props) => (props.$isVisible ? "1" : "0")};

  @media ${(props) => props.theme.minWidth.md} {
    display: none;
  }
`;

const StickyCard = styled.div`
  background-color: ${(props) => props.theme.colors.blackLight};
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const GoogleReviewsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-bottom: 12px;
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
  gap: 1px;
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

const StickyButton = styled(Link)`
  display: block;
  padding: 14px 20px;
  border-radius: 100px;
  background-color: white;
  color: ${(props) => props.theme.colors.blackLight};
  text-align: center;
  text-decoration: none;
  font-family: "Söhne Kräftig";
  font-size: 16px;
  line-height: 1.4;
  position: relative;
  overflow: hidden;
  transition: background-color 0.2s ease;

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

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 17px;
    padding: 16px 24px;
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

const CTASticky = ({
  text = "Prendre rendez-vous",
  to = "/contact",
  showGoogleReviews = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      // Hide when footer is visible
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const isFooterVisible = footerRect.top < window.innerHeight;
        setIsVisible(!isFooterVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          console.error("Error fetching reviews for CTA:", err);
        }
      };
      fetchReviews();
    }
  }, [showGoogleReviews]);

  return (
    <StickyWrapper $isVisible={isVisible}>
      <StickyCard>
        {showGoogleReviews && reviewData && (
          <GoogleReviewsSection>
            <Stars rating={Math.round(reviewData.averageRating)} />
            <ReviewInfo>
              <RatingText>{reviewData.averageRating}/5</RatingText>
              <ReviewCount>{reviewData.totalReviewCount} avis Google</ReviewCount>
            </ReviewInfo>
          </GoogleReviewsSection>
        )}
        <StickyButton to={to}>{text}</StickyButton>
      </StickyCard>
    </StickyWrapper>
  );
};

export default CTASticky;
