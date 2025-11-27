import React, { useState } from "react";
import styled from "styled-components";
import { PortableText } from "@portabletext/react";
import nbspPonctuation from "components/utils/nbspPonctuation";

const FAQWrapper = styled.section`
  margin: 80px 0;
  @media ${(props) => props.theme.minWidth.md} {
    margin: 100px 0;
  }
  @media ${(props) => props.theme.minWidth.lg} {
    margin: 120px 0;
  }
`;

const FAQTitle = styled.h2`
  font-size: 28px;
  line-height: 34px;
  margin-bottom: 40px;
  font-family: "Söhne Kräftig";
  text-align: center;
  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 32px;
    line-height: 38px;
  }
  @media ${(props) => props.theme.minWidth.md} {
    font-size: 36px;
    line-height: 42px;
    margin-bottom: 50px;
  }
`;

const FAQList = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid #e0e0e0;

  &:first-child {
    border-top: 1px solid #e0e0e0;
  }
`;

const Question = styled.button`
  width: 100%;
  text-align: left;
  font-size: 18px;
  line-height: 25px;
  font-family: "Söhne Kräftig";
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0;
  transition: color 0.3s ease;

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 20px;
    line-height: 27px;
    padding: 30px 0;
  }

  @media ${(props) => props.theme.minWidth.md} {
    font-size: 22px;
    line-height: 29px;
  }

  &:hover {
    color: #666;
  }

  &:focus {
    outline: none;
  }
`;

const QuestionText = styled.span`
  flex: 1;
  padding-right: 20px;
`;

const Icon = styled.span`
  font-size: 24px;
  font-weight: 300;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOpen ? "rotate(45deg)" : "rotate(0)")};
  color: #000;

  @media ${(props) => props.theme.minWidth.md} {
    font-size: 28px;
  }
`;

const AnswerWrapper = styled.div`
  max-height: ${(props) => (props.isOpen ? props.maxHeight : "0")};
  overflow: hidden;
  transition: max-height 0.4s ease;
`;

const Answer = styled.div`
  padding: 0 0 30px 0;
  font-family: "Signifier Light";
  font-size: 17px;
  line-height: 26px;

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 18px;
    line-height: 28px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    font-size: 19px;
    line-height: 30px;
    padding: 0 0 35px 0;
  }

  p {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    text-decoration: underline;
    text-decoration-thickness: 0.8px;
    text-underline-offset: 5px;
    color: inherit;

    &:hover {
      color: #666;
    }
  }

  em {
    font-style: normal;
    font-family: "Signifier Light Italic";
  }

  strong {
    font-family: "Söhne Kräftig";
  }
`;

// Portable Text components for rendering answers
const answerComponents = {
  marks: {
    link: ({ value, children }) => (
      <a href={value.href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ),
  },
};

const FAQSection = ({ items, title = "Questions fréquentes" }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [heights, setHeights] = useState({});

  if (!items || items.length === 0) return null;

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate Schema.org FAQPage markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item._rawAnswer
          ? item._rawAnswer
              .map((block) => {
                if (block._type === "block" && block.children) {
                  return block.children.map((child) => child.text).join("");
                }
                return "";
              })
              .join(" ")
          : "",
      },
    })),
  };

  // Measure answer height for smooth animation
  const measureHeight = (index, element) => {
    if (element && !heights[index]) {
      setHeights((prev) => ({
        ...prev,
        [index]: element.scrollHeight,
      }));
    }
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <FAQWrapper>
        <FAQTitle
          dangerouslySetInnerHTML={{ __html: nbspPonctuation(title) }}
        />

        <FAQList>
          {items.map((item, index) => (
            <FAQItem key={index}>
              <Question
                onClick={() => toggleItem(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <QuestionText
                  dangerouslySetInnerHTML={{
                    __html: nbspPonctuation(item.question),
                  }}
                />
                <Icon isOpen={openIndex === index}>+</Icon>
              </Question>

              <AnswerWrapper
                isOpen={openIndex === index}
                maxHeight={
                  openIndex === index ? `${heights[index] || 1000}px` : "0"
                }
              >
                <Answer
                  id={`faq-answer-${index}`}
                  ref={(el) => measureHeight(index, el)}
                >
                  {item._rawAnswer && (
                    <PortableText
                      value={item._rawAnswer}
                      components={answerComponents}
                    />
                  )}
                </Answer>
              </AnswerWrapper>
            </FAQItem>
          ))}
        </FAQList>
      </FAQWrapper>
    </>
  );
};

export default FAQSection;
