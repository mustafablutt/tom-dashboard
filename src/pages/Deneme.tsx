import React from 'react'
import styled from 'styled-components'

const DenemeText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 70vh;
`

const Deneme: React.FunctionComponent = () => {
    return (
        <DenemeText>Deneme</DenemeText>
    )
}

export default Deneme