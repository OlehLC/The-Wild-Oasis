import { Outlet } from "react-router-dom";
import Sidebar from "./SIdebar.jsx";
import Header from "./Header.jsx";
import styled from "styled-components";
import { useState } from "react";
import { AiOutlineMenu } from 'react-icons/ai';


const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  scroll-behavior: smooth;
  overflow: scroll;
    @media (max-width: 600px) {
   padding: 4rem 1.8rem 6.4rem;
  }
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  /* Для мобільних пристроїв */
  @media (max-width: 1265px) {
    grid-template-columns: 1fr;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const MobileMenuButton = styled.button`
  display: none;
  position: absolute;
  top: 1.6rem;
  left: 1.6rem;
  background-color: transparent;
  border: none;
  font-size: 2.4rem;
  color: var(--color-grey-600);
  cursor: pointer;

  @media (max-width: 1265px) {
    display: block;
  }
`;

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
   <StyledAppLayout>
      <MobileMenuButton onClick={toggleSidebar}>
        <AiOutlineMenu />
      </MobileMenuButton>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
