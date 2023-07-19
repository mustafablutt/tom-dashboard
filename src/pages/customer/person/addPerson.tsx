import React from "react";
import styled from "styled-components";

const AddPersonText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  height: 70vh;
`;

const AddPerson: React.FunctionComponent = () => {
  return <AddPersonText>Kişi Ekle</AddPersonText>;
};

export default AddPerson;
