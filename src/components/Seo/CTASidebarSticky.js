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

const SidebarWrapper = styled.div`
  display: none;

  @media ${(props) => props.theme.minWidth.md} {
    display: block;
    position: fixed;
    left: 24px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    transition: opacity 0.3s ease;
    opacity: ${(props) => (props.$isVisible ? "1" : "0")};
    pointer-events: ${(props) => (props.$isVisible ? "auto" : "none")};
    width: auto;
    max-width: 180px;
  }

  @media ${(props) => props.theme.minWidth.lg} {
    left: 32px;
    max-width: 200px;
  }

  @media ${(props) => props.theme.minWidth.xl} {
    left: 45px;
    max-width: 220px;
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.blackLight};
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  padding: 20px 16px;
`;

const GoogleReviewsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 2px;
`;

const StarIcon = styled.span`
  color: ${(props) => (props.$filled ? "#fbbc04" : "rgba(255, 255, 255, 0.3)")};
  font-size: 12px;
`;

const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
`;

const RatingText = styled.span`
  font-family: "Söhne Kräftig";
  font-size: 12px;
  color: white;
`;

const ReviewCount = styled.span`
  font-family: "Signifier Light";
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
`;

const SidebarTitle = styled.h3`
  font-family: "Söhne Kräftig";
  font-size: 16px;
  line-height: 20px;
  color: white;
  margin: 0;
`;

const SidebarDescription = styled.p`
  font-family: "Signifier Light";
  font-size: 14px;
  line-height: 18px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
`;

// Shared button styles
const buttonStyles = `
  display: block;
  padding: 10px 16px;
  border-radius: 100px;
  background-color: white;
  text-decoration: none;
  font-family: "Söhne Kräftig";
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  transition: background-color 0.2s ease, transform 0.2s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

const SidebarCTAInternal = styled(Link)`
  ${buttonStyles}
  color: ${(props) => props.theme.colors.blackLight};

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

const SidebarCTAExternal = styled.a`
  ${buttonStyles}
  color: ${(props) => props.theme.colors.blackLight};

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

// Helper to detect external URLs
const isExternalUrl = (url) =>
  url?.startsWith("http://") || url?.startsWith("https://");

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

const CTASidebarSticky = ({
  title = "Besoin d'un avocat ?",
  description = "Contactez TLMR Avocats pour un premier échange confidentiel.",
  text = "Prendre rendez-vous",
  to = "/contact",
  showGoogleReviews = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const isExternal = isExternalUrl(to);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show after scrolling down 300px
      const shouldShow = scrollY > 300;

      // Hide when near footer (within 200px of bottom)
      const nearBottom = scrollY + windowHeight > documentHeight - 200;

      setIsVisible(shouldShow && !nearBottom);
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
    <SidebarWrapper $isVisible={isVisible}>
      <SidebarContent>
        {showGoogleReviews && reviewData && (
          <GoogleReviewsSection>
            <Stars rating={Math.round(reviewData.averageRating)} />
            <ReviewInfo>
              <RatingText>{reviewData.averageRating}/5</RatingText>
              <ReviewCount>{reviewData.totalReviewCount} avis</ReviewCount>
            </ReviewInfo>
          </GoogleReviewsSection>
        )}
        {title && <SidebarTitle>{title}</SidebarTitle>}
        {description && <SidebarDescription>{description}</SidebarDescription>}
        {isExternal ? (
          <SidebarCTAExternal
            href={to}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </SidebarCTAExternal>
        ) : (
          <SidebarCTAInternal to={to}>{text}</SidebarCTAInternal>
        )}
      </SidebarContent>
    </SidebarWrapper>
  );
};

export default CTASidebarSticky;
