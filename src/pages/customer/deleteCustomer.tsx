import React from "react";
import styled from "styled-components";

const DeleteCustomerText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  height: 70vh;
`;

const DeleteCustomer: React.FunctionComponent = () => {
  return <DeleteCustomerText>Müşteri Sil</DeleteCustomerText>;
};

export default DeleteCustomer;
