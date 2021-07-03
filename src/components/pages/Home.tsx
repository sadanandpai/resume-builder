import React from 'react'
import { Resume } from './Resume'
import { Sidebar } from './Sidebar'
import { Flex } from "../common/styles"

export const Home = () => {
    return (
        <Flex>
            <Resume />
            <Sidebar />
        </Flex>
    )
}
