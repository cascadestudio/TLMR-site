import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import nbspPonctuation from "components/utils/nbspPonctuation";

const TeamWrapper = styled.section`
  margin: 80px 0;

  @media ${(props) => props.theme.minWidth.md} {
    margin: 100px 0;
  }

  @media ${(props) => props.theme.minWidth.lg} {
    margin: 120px 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h2`
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px 20px;

  @media ${(props) => props.theme.minWidth.sm} {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px 25px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    grid-template-columns: repeat(4, 1fr);
    gap: 50px 30px;
  }
`;

const MemberCard = styled(Link)`
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const PhotoWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  margin-bottom: 15px;
  overflow: hidden;
  border-radius: 50%;
  background: #f0f0f0;

  @media ${(props) => props.theme.minWidth.md} {
    margin-bottom: 20px;
  }
`;

const Photo = styled(GatsbyImage)`
  width: 100%;
  height: 100%;
`;

const Name = styled.h3`
  font-size: 16px;
  line-height: 21px;
  margin-bottom: 5px;
  font-family: "Söhne Kräftig";

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 17px;
    line-height: 22px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 8px;
  }
`;

const Role = styled.p`
  font-size: 14px;
  line-height: 19px;
  color: #666;
  margin: 0;
  font-family: "Söhne Buch";

  @media ${(props) => props.theme.minWidth.md} {
    font-size: 15px;
    line-height: 20px;
  }
`;

const ViewAllLink = styled(Link)`
  display: inline-block;
  margin: 50px auto 0;
  padding: 14px 30px;
  border: 1px solid #000;
  text-decoration: none;
  color: #000;
  font-family: "Söhne Kräftig";
  font-size: 14px;
  transition: all 0.3s ease;
  text-align: center;

  @media ${(props) => props.theme.minWidth.md} {
    padding: 16px 35px;
    font-size: 15px;
    margin-top: 60px;
  }

  &:hover {
    background: #000;
    color: #fff;
  }
`;

const ViewAllWrapper = styled.div`
  text-align: center;
`;

const TeamSection = ({
  members,
  title = "Notre équipe",
  showViewAllLink = true,
}) => {
  if (!members || members.length === 0) return null;

  // Filter to only show core team members (those with photos)
  const coreTeamMembers = members.filter(
    (member) => member.teamType === "core" && member.photo?.asset
  );

  if (coreTeamMembers.length === 0) return null;

  return (
    <TeamWrapper>
      <Container>
        <Title dangerouslySetInnerHTML={{ __html: nbspPonctuation(title) }} />

        <Grid>
          {coreTeamMembers.map((member, index) => {
            const image = getImage(member.photo.asset);

            return (
              <MemberCard key={index} to="/l-equipe">
                {image && (
                  <PhotoWrapper>
                    <Photo image={image} alt={member.name} />
                  </PhotoWrapper>
                )}
                <Name
                  dangerouslySetInnerHTML={{
                    __html: nbspPonctuation(member.name),
                  }}
                />
                {member.role && (
                  <Role
                    dangerouslySetInnerHTML={{
                      __html: nbspPonctuation(member.role),
                    }}
                  />
                )}
              </MemberCard>
            );
          })}
        </Grid>

        {showViewAllLink && (
          <ViewAllWrapper>
            <ViewAllLink to="/l-equipe">Découvrir toute l'équipe</ViewAllLink>
          </ViewAllWrapper>
        )}
      </Container>
    </TeamWrapper>
  );
};

export default TeamSection;
