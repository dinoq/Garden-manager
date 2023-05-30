/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { DEPTH } from '../../../helpers/constants';

export interface IModalWindowProps {
    children: React.ReactNode;
    closeModalHandler?: React.MouseEventHandler<HTMLDivElement>,
    position: {left: string, top: string, right: string, bottom: string},
    dimension: {width: string, height: string}
}

const BORDER_RADIUS = 15;
const ModalWindow: React.FC<IModalWindowProps> = (props) => {

    return (
        <div css={css`
            width: ${props.dimension.width};
            height: ${props.dimension.height};
            top: ${props.position.top};
            left: ${props.position.left};
            right: ${props.position.right};
            bottom: ${props.position.bottom};
            background-color: #535353;
            z-index: ${DEPTH.MODAL_WINDOW};
            position: fixed;
            transform: translate(-50%, -50%);
            border-radius: ${BORDER_RADIUS}px;
            display: flex;  
            flex-direction: column;     
        `}>
            <div css={css`
                border-radius: 15px 15px 0 0;
                background-color: #232323;
                color: white;
                display: flex;
            `}>
                <div css={css`          
                    text-align: end;
                    padding: 5px;
                    margin: 7px;
                    border: 1px solid white;
                    position: relative;
                    right: 0;
                    margin-left: auto;
                    border-radius: 5px;             
                    cursor: pointer;
                `} onClick={props.closeModalHandler}>X</div>

            </div>
            <div css={css`
                color: white;                
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                padding: 15px;
            `}>
                {props.children}
            </div>

        </div>

    )
}


export default ModalWindow;