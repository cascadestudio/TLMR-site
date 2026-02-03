import React from "react";
import styled from "styled-components";
import slugify from "components/utils/slugify";

const TOCWrapper = styled.nav`
  background: #f8f8f8;
  border-radius: 8px;
  padding: 24px 28px;
  margin-bottom: 40px;

  @media ${(props) => props.theme.minWidth.md} {
    margin-bottom: 50px;
  }
`;

const TOCTitle = styled.p`
  font-family: "Söhne Kräftig";
  font-size: 18px;
  margin-bottom: 16px;
`;

const TOCList = styled.ol`
  list-style: decimal;
  padding-left: 20px;
  margin: 0;
`;

const TOCItem = styled.li`
  margin-bottom: 10px;
  line-height: 1.5;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TOCLink = styled.a`
  color: ${(props) => props.theme.colors.blue};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const extractHeadingsFromPortableText = (content) => {
  if (!content || !Array.isArray(content)) return [];

  return content
    .filter((block) => block._type === "block" && block.style === "h2")
    .map((block) => {
      const text = block.children
        ?.map((child) => child.text || "")
        .join("")
        .trim();
      return {
        text,
        id: slugify(text),
      };
    })
    .filter((heading) => heading.text);
};

const TableOfContents = ({ content }) => {
  const headings = extractHeadingsFromPortableText(content);

  if (headings.length === 0) return null;

  return (
    <TOCWrapper aria-label="Sommaire">
      <TOCTitle>Sommaire</TOCTitle>
      <TOCList>
        {headings.map((heading, index) => (
          <TOCItem key={index}>
            <TOCLink href={`#${heading.id}`}>
              {heading.text}
            </TOCLink>
          </TOCItem>
        ))}
      </TOCList>
    </TOCWrapper>
  );
};

export default TableOfContents;
