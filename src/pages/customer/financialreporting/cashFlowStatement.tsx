import React from "react";
import styled from "styled-components";

const CashFlowStatementText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  height: 70vh;
`;

const CashFlowStatement: React.FunctionComponent = () => {
  return <CashFlowStatementText>Para Akış Durumu</CashFlowStatementText>;
};

export default CashFlowStatement;
