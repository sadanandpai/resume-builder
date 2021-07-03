import React from 'react'
import styled from "styled-components";
import { Resume } from './Resume'
import { Sidebar } from './Sidebar'

const HomeWrapper = styled.div`
    display: flex;
`;

export const Home = () => {
    return (
        <HomeWrapper>
            <Resume />
            <Sidebar />
        </HomeWrapper>
    )
}
