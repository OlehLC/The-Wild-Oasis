import styled from "styled-components";
import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";
import PropTypes from "prop-types"; // Імпортуємо PropTypes

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;


  @media (max-width: 1265px) {
    position: fixed;
    top: 0;
    left: ${(props) => (props.isOpen ? "0" : "-100%")};
    width: 100%;
    height: 100vh;
    transition: left 0.3s ease-in-out;
    z-index: 100;
  }
`;

function Sidebar({ isOpen, closeSidebar }) {
  const handleLinkClick = () => {
    closeSidebar(); // Закриваємо меню при натисканні на елемент меню
  };

  return (
    <StyledSidebar isOpen={isOpen}>
      <Logo />
      <MainNav onLinkClick={handleLinkClick} />
    </StyledSidebar>
  );
}


Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
