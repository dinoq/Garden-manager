/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useState } from "react";
import { FC } from "react";
import SideBar from "../../features/SideBar";
import Header from "../../features/Header";
import DesignPanel from "../../features/DesignPanel";
import { useAppSelector } from "../../hooks/useAppSelector";
import { toolbarHeightSelector } from "../../features/Header/selectors";

type IDesignPageProps = {
}

const DesignPage: FC<IDesignPageProps> = (props) => {
    const toolbarHeight = useAppSelector(toolbarHeightSelector);
    
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