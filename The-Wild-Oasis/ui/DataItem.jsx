import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

function DataItem({ icon, label, children }) {
  // Перевірка типу icon, щоб бути впевненим, що це React елемент
  if (!React.isValidElement(icon)) {
    console.error("Icon prop must be a valid React element");
  }

  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
}

DataItem.propTypes = {
  icon: PropTypes.element.isRequired, // icon має бути React елементом
  label: PropTypes.string.isRequired, // label має бути рядком
  children: PropTypes.node, // children можуть бути будь-якими дочірніми елементами
};

export default DataItem;
