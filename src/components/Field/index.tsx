/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { IRect } from "../../helpers/types";
import { useAppSelector } from "../../hooks";


interface IFIeldProps extends IRect {
    
}

const Field: React.FC<IFIeldProps> = (props) => {
    const zoomAmount = useAppSelector(selector => selector.navigation.zoom);
    const width = props.width * (zoomAmount / 100);
    const height = props.height * (zoomAmount / 100);
    const x = props.x * (zoomAmount / 100);
    const y = props.y * (zoomAmount / 100);

    return (
        <div>
            <div css={css`
                background-color: #434e43;
                position: absolute;
                width: ${width}px;
                height: ${height}px;
                left: ${x}px;
                top: ${y}px;
                z-index: 1000;
            `}>

            </div>
        </div>
    )
}


export default Field;