import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

const activeClassName = "link-active";

const Title = styled.h1`
  border-radius: 4px;
  letter-spacing: 2px;
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const StyledHeader = styled.header`
  grid-area: header;
  font-family: "Quando", serif;
  margin: 60px 0 10px 0;
  color: ${props => props.theme.color.main};
`;

const NavLinkListItem = styled.li`
  margin-left: 60px;
  display: flex;
  align-items: flex-end;

  @media (max-width: 720px) {
    margin-left: 0;
  }
`;

const NavArrow = styled.div`
  width: 1px;
  padding-top: 5px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid ${props => props.theme.color.main};
  visibility: hidden;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  box-shadow: none;
  font-size: large;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.color.main};
  transition: opacity 0.6s ease 0s;
  align-items: center;

  &.${activeClassName} > ${NavArrow} {
    visibility: unset;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const StyledNav = styled.nav`
  display: grid;
  grid-template-columns: 1fr auto;
  border-bottom: 3px solid ${props => props.theme.color.main};
  overflow: hidden;
  transition: height 0.4s;

  @media (max-width: 720px) {
    grid-template-rows: auto 45px;
    height: ${props => (props.open ? "90px" : "44px")};
  }
`;

const NavLinks = styled.ol`
  display: flex;
  padding: 0;
  justify-content: space-between;
`;

const MenuButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  color: ${props => props.theme.color.main};
  display: none;
  padding: 0;
  cursor: pointer;
  margin-left: 20px;

  @media (max-width: 720px) {
    display: unset;
  }
`;

const NavLink = ({ children, to }) => (
  <NavLinkListItem>
    <StyledLink activeClassName={activeClassName} to={to}>
      <div>{children}</div>
      <NavArrow />
    </StyledLink>
  </NavLinkListItem>
);

const Header = () => {
  const [open, setOpen] = React.useState();

  const links = [
    { label: "about", to: "/about" },
    { label: "notes", to: "/blog" },
    { label: "projects", to: "/projects" }
  ];

  return (
    <StyledHeader>
      <StyledNav open={open}>
        <StyledLink to="/" style={{ alignItems: "flex-start" }}>
          <Title>Tim Phillips</Title>
        </StyledLink>
        <MenuButton onClick={() => setOpen(!open)}>
          {open ? <AiOutlineCloseCircle size="35" /> : <FiMenu size="35" />}
        </MenuButton>
        <NavLinks open={open}>
          {links.map(({ label, to }) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
        </NavLinks>
      </StyledNav>
    </StyledHeader>
  );
};

export default Header;