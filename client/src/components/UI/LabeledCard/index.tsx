/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

interface ILabeledCardProps {
    children: JSX.Element[] | JSX.Element,
    label: string
}

const LabeledCard: React.FC<ILabeledCardProps> = (props) => {

    return (
        <div aria-label={props.label} css={css` 
            :before {
                content: attr(aria-label);
                font-size: 0.8rem;
                position: absolute;
                top: -0.5rem;
                background-color: #727272;
                padding: 3px;
                border-radius: 5px
            };
            width: 200px;
            height: 130px;
            background: #969696;
            border-radius: 10px;
            margin: 15px;
            padding: 15px;
            position: relative;
        `}>
            {props.children}
        </div>

    )
}

export default LabeledCard;