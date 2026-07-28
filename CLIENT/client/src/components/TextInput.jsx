import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  padding: 0 4px;
  text-transform: uppercase;
`;

const StyledInput = styled.input`
  width: 100%;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 8px;
  outline: none;
  padding: 14px;
  font-size: 18px;             
  color: ${({ theme }) => theme.text_primary};
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 200px;           
  background: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 8px;
  outline: none;
  padding: 16px;
  font-size: 18px;          
  color: ${({ theme }) => theme.text_primary};
  resize: vertical;            
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TextInput = ({
  label,
  placeholder,
  name,
  value,
  handleChange,     
  textArea,
  rows,
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      {textArea ? (
        <StyledTextArea
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}      
          rows={rows}
        />
      ) : (
        <StyledInput
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}       
        />
      )}
    </Container>
  );
};

export default TextInput;