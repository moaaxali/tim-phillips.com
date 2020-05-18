import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

import Image from "gatsby-image";
import React from "react";
import styled from "styled-components";

const BackgroundImage = styled(Image)`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 3px;
`;

const BackgroundImageList = styled.ul`
  position: relative;
  flex: 1;
  display: flex;
  margin-top: 24px;
`;

const BackgroundImageListItem = styled.li`
  opacity: ${props => (props.visible ? 1 : 0)};
  margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: opacity 0.5s, max-width 0.5s, margin-left 0.5s, margin-right 0.5s,
    left 0.5s, right 0.5s;

  /* https://css-tricks.com/full-width-containers-limited-width-parents/#article-header-id-6 */
  max-width: ${props => (props.expanded ? "100vw" : "800px")};
  left: ${props => (props.expanded ? "50%" : "0")};
  right: ${props => (props.expanded ? "50%" : "0")};
  margin-left: ${props => (props.expanded ? "-50vw" : "0")};
  margin-right: ${props => (props.expanded ? "-50vw" : "0")};
`;

const ExpandButton = styled(({ expandIconColor, ...rest }) => (
  <button {...rest} />
))`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  position: absolute;
  top: 5px;
  right: 5px;
  color: ${props => props.expandIconColor}};
`;

export const Background = ({ currentId, images }) => {
  const [expanded, setExpanded] = React.useState(false);
  const ExpandIcon = expanded ? MdFullscreenExit : MdFullscreen;
  return (
    <BackgroundImageList>
      {images.map(({ id, image, style, position, expandIconColor }) => (
        <BackgroundImageListItem
          key={id}
          expanded={expanded}
          visible={id === currentId}
        >
          <BackgroundImage
            imageStyle={style}
            fluid={image.childImageSharp.fluid}
            style={{ position: "absolute" }}
            imgStyle={{
              userSelect: "none",
              objectPosition: position || "center 30%"
            }}
          />
          <ExpandButton
            expandIconColor={expandIconColor}
            onClick={() => setExpanded(!expanded)}
          >
            <ExpandIcon size={30} />
          </ExpandButton>
        </BackgroundImageListItem>
      ))}
    </BackgroundImageList>
  );
};

const StyledUnorderedList = styled.ol`
  display: flex;
  justify-content: flex-start;
`;

const StyledListItem = styled.li`
  margin-right: 8px;
`;

const StyledButton = styled.button`
  height: 18px;
  width: 18px;
  cursor: pointer;
  border-radius: 10px;
  border: 3px solid ${props => props.theme.color.main};
  background-color: ${props =>
    props.active ? props.theme.color.main : "transparent"};
  outline: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props =>
      props.active ? props.theme.color.main : props.theme.color.hover};
  }
`;

export const BackgroundPicker = ({ imageIds, currentId, onChange }) => (
  <StyledUnorderedList>
    {imageIds.map(id => (
      <StyledListItem key={id}>
        <StyledButton
          active={currentId === id}
          onClick={() => onChange(id)}
          aria-label={`Set background to ${id}`}
        />
      </StyledListItem>
    ))}
  </StyledUnorderedList>
);
