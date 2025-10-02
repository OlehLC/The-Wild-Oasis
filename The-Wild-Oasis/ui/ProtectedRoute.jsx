import styled from "styled-components";
import { useUser } from "../features/authentication/useUser.js";
import Spinner from "./Spinner"; // додано імпорт
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types"; // додано імпорт

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex; 
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { isLoading, isAuthenticated } = useUser();

    useEffect(function () {
        if (!isAuthenticated && !isLoading) navigate("/login");
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) return (
        <FullPage>
            <Spinner />
        </FullPage>
    );

    if (isAuthenticated) return children;

    return null; // на випадок, якщо жодна умова не спрацювала
}
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired, // вказуємо тип для children
};

export default ProtectedRoute;
