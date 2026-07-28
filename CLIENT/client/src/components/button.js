import React from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

const StyledButton = styled.div`
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: min-content;
  padding: 10px 24px;

  @media (max-width: 600px) {
    padding: 8px 20px;
  }

  ${({ type, theme }) =>
    type === "secondary"
      ? `background: ${theme.secondary};`
      : `background: ${theme.primary};`}

  ${({ isDisabled }) =>
    isDisabled &&
    `
    opacity: 0.4;
    cursor: not-allowed;
  `}

  ${({ isLoading }) =>
    isLoading &&
    `
    opacity: 0.8;
    cursor: not-allowed;
  `}

  ${({ flex }) =>
    flex &&
    `
    flex: 1;
  `}
`;

const Button = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
}) => {
  return (
    <StyledButton
      onClick={() => !isDisabled && !isLoading && onClick?.()}
      type={type}
      isDisabled={isDisabled}
      isLoading={isLoading}
      flex={flex}
    >
      {isLoading && (
        <CircularProgress style={{ width: "18px", height: "18px", color: "#fff" }} />
      )}
      {leftIcon}
      {text}
      {isLoading && <>...</>}
      {rightIcon}
    </StyledButton>
  );
};

export default Button;
