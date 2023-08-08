import React from "react";
import styled from "styled-components";

const BalanceSheetText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  height: 70vh;
`;

const BalanceSheet: React.FunctionComponent = () => {
  return <BalanceSheetText>Bilanço</BalanceSheetText>;
};

export default BalanceSheet;
