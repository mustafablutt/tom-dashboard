import React from "react";
import styled from "styled-components";

const ıncomeStatementText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  height: 70vh;
`;

const IncomeStatement: React.FunctionComponent = () => {
  return <ıncomeStatementText>Gelir Durumu</ıncomeStatementText>;
};

export default IncomeStatement;
