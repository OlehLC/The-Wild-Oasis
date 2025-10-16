import styled from 'styled-components';

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
     @media (max-width: 700px) {
      flex-direction: column;
    gap: 2.4rem;
  }
`;

export default TableOperations;
