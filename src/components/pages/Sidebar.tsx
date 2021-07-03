import React, { useState } from 'react'
import styled from "styled-components";
import { SideDrawer } from "../widgets/SideDrawer";

import {MdEdit, MdColorLens, MdCloudDownload, MdLibraryBooks} from "react-icons/md"


const Sider = styled.nav`
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    font-size: 1.4rem;
    padding: 8px;
    background: #eff1f5;
    border-left: 1px solid rgba(0,0,0,0.25);
`;

const IconWrapper = styled.div`
    outline-color: transparent;
    margin-bottom: 1rem;
`;

const IconButton = styled.button`
    position: relative;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 40px;
    background: transparent;
    border 0;
    border-radius: 2px;
    pading: 0;
    color: rgb(230, 230, 230);
`;

export const Sidebar = () => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    return (
        <div style={{width: "640px"}}>
            <Sider>
                <IconWrapper>
                    <IconButton onClick={showDrawer}>
                        <MdEdit fill="#1890ff" />
                    </IconButton>
                </IconWrapper>
                <IconWrapper>
                    <IconButton>
                        <MdColorLens fill="#1890ff" />
                    </IconButton>
                </IconWrapper>
                <IconWrapper>
                    <IconButton>
                        <MdLibraryBooks fill="#1890ff" />
                    </IconButton>
                </IconWrapper>
                <IconWrapper>
                    <IconButton>
                        <MdCloudDownload fill="#1890ff" />
                    </IconButton>
                </IconWrapper>
            </Sider>
            <SideDrawer open={visible} onClose={onClose} />
        </div>
    );
}
