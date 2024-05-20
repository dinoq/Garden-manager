/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useState } from "react";
import { FC } from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import DesignPanel from "../../components/AppView";
import { useAppSelector } from "../../hooks/useAppSelector";

type IDesignPageProps = {
}

const DesignPage: FC<IDesignPageProps> = (props) => {
    const toolbarHeight = useAppSelector(state => state.guiReducer.toolbarHeight);
    
    const [mouseMove, setMouseMove] = useState<React.MouseEvent<HTMLDivElement, MouseEvent>>();
    return (
        <React.Fragment>
            <div css={css`
                height: ${toolbarHeight}px;
                width: 100vw;
                background-color: #00182e;
            `}>
                <Header />
            </div>
            <div css={css`
                width: 100vw;
            `} onMouseMove={e=>setMouseMove(e)}>
                {<SideBar />}
                <div css={css`
                    overflow: hidden;
                    width: 100%;
                    height: 100%;
                    position: relative;
                    left: 0;
                    top: 0;
                `}>
                    <DesignPanel mouseMove={mouseMove}/>
                </div>
            </div>

        </React.Fragment>
    )
}

export default DesignPage;