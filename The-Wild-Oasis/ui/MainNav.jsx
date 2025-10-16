import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers
} from 'react-icons/hi2';
import PropTypes from "prop-types";  // Імпортуємо PropTypes

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav({ onLinkClick }) {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard" onClick={onLinkClick}>
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
          <StyledNavLink to="/bookings" onClick={onLinkClick}>
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
          <StyledNavLink to="/cabins" onClick={onLinkClick}>
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
          <StyledNavLink to="/users" onClick={onLinkClick}>
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
          <StyledNavLink to="/settings" onClick={onLinkClick}>
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

// Додаємо перевірку для пропсу onLinkClick
MainNav.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
};

export default MainNav;
