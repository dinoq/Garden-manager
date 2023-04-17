/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { IRect } from "../../helpers/types";
import { useAppSelector } from "../../hooks/useAppSelector";
import { DEPTH } from "../../helpers/constants";
import { zoomedFactory } from "../../helpers/functions";


interface IFIeldProps extends IRect {
    
}

const Field: React.FC<IFIeldProps> = (props) => {
    const zoom = useAppSelector(selector => selector.navigationReducer.zoom);
    const zoomed = zoomedFactory(zoom);
    
    const width = zoomed(props.width);
    const height = zoomed(props.height);
    const x = zoomed(props.x);
    const y = zoomed(props.y);

    return (
        <div>
            <div css={css`
                background-color: #434e43;
                position: relative;
                width: ${width}px;
                height: ${height}px;
                left: ${x}px;
                top: ${y}px;
                z-index: ${DEPTH.FIELD};
            `}>

            </div>
        </div>
    )
}


export default Field;