import React from "react";
import styled from "styled-components";

const AddCustomerText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  height: 70vh;
`;

const AddCustomer: React.FunctionComponent = () => {
  return <AddCustomerText>Müşteri Ekle</AddCustomerText>;
};

export default AddCustomer;
