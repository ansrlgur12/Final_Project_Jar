import React, { useState } from 'react';
import styled from 'styled-components';

const QuantityInputWrapper = styled.div`
  display: flex;
  
  align-items: center;
  gap: 10px;

`;

const Button = styled.button`
  background:  #2D6247;
  color: #fff;
  border: none;
 width: 40px;
  cursor: pointer;
  font-size: 26px;
  font-weight: bold;

`;

const Input = styled.input`
border: none;
  width: 80px;
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
 
`;

const QuantityInput = ({ quantity, setQuantity }) => {

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <QuantityInputWrapper>
      <Button onClick={handleDecrease}>-</Button>
      <Input type="number" value={quantity} readOnly />
      <Button onClick={handleIncrease}>+</Button>
    </QuantityInputWrapper>
  );
};

export default QuantityInput;
