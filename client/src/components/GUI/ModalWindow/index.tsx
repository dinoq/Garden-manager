/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { DEPTH } from '../../../helpers/constants';

export interface IModalWindowProps {
    children: React.ReactNode;
    closeModal: React.MouseEventHandler<HTMLDivElement>
}

const BORDER_RADIUS = 15;
const ModalWindow: React.FC<IModalWindowProps> = (props) => {

    return (
        <div css={css`
            width: 500px;
            height: 500px;
            background-color: #535353;
            z-index: ${DEPTH.MODAL_WINDOW};
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: ${BORDER_RADIUS}px;
        
        `}>
            <div css={css`
                border-radius: 15px 15px 0 0;
                background-color: #232323;
                color: white;


            `}>
                <div css={css`                
                    text-align: end;
                    padding: 15px;
                    width:20px;
                    border: 1px solid white;
                    position: relative;
                    right: 0;                
                `} onClick={props.closeModal}>X</div>

            </div>
            <div>

            </div>

        </div>

    )
}


export default ModalWindow;