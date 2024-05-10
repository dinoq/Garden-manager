/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { DEPTH } from '../../../helpers/constants';
import { useRef, useState } from 'react';

export interface IModalWindowProps {
    children: React.ReactNode;
    closeModalHandler?: React.MouseEventHandler<HTMLDivElement>,
    position: { left: string, top: string },
    dimension: { width: string, height: string }
}

const BORDER_RADIUS = 15;
const ModalWindow: React.FC<IModalWindowProps> = (props) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(props.position);
    const [modalDragStartPosition, setModalDragStartPosition] = useState({ left: 0, top: 0 });
    const [mouseStartPosition, setMouseStartPosition] = useState({ left: 0, top: 0 });
    const [collapsed, setCollapsed] = useState(false);
    const [modalHeight, setModalHeight] = useState(0);

    const dragStartHandler = (e: React.MouseEvent) => {
        const rect = modalRef.current?.getBoundingClientRect();
        if (rect) {
            setPosition({ top: rect.top + "px", left: rect.left + "px" })
            setModalDragStartPosition({ top: rect.top, left: rect.left })
            setMouseStartPosition({ left: e.clientX, top: e.clientY });
        }
    }
    const dragHandler = (e: React.MouseEvent) => {
        const mouseXDiff = e.clientX - mouseStartPosition.left;
        const mouseYDiff = e.clientY - mouseStartPosition.top;
        setPosition({ left: (modalDragStartPosition.left + mouseXDiff) + "px", top: (modalDragStartPosition.top + mouseYDiff) + "px" })
    }
    const dragEndHandler = (e: React.MouseEvent) => {
    }

    const toggleCollapse = (e: React.MouseEvent) => {
        if(!collapsed){
            const rect = modalRef.current?.getBoundingClientRect();
            setModalHeight(rect?.height || 0);
        }
        setCollapsed(prevVal => !prevVal);
    }

    return (
        <div css={css`
            width: ${props.dimension.width};
            height: ${props.dimension.height};
            top: ${position.top};
            left: ${position.left};
            background-color: #535353;
            z-index: ${DEPTH.MODAL_WINDOW};
            position: fixed;
            //transform: translate(-50%, -50%);
            border-radius: ${BORDER_RADIUS}px;
            display: flex;  
            flex-direction: column;     
        `} ref={modalRef}>
            <div css={css`
                border-radius: ${collapsed ? "15px 15px 15px 15px" : "15px 15px 0 0"};
                transition: border-radius .1s ease-out ${collapsed ? "0.2s" : ""};
                background-color: #232323;
                color: white;
                display: flex;
                justify-content: space-between;
                cursor: move;
            `} draggable="true" onDragStart={dragStartHandler} onDrag={dragHandler} onDragEnd={dragEndHandler}>
                <div css={css`          
                    text-align: end;
                    padding: 5px;
                    margin: 7px;
                    border: 1px solid white;
                    position: relative;
                    border-radius: 5px;             
                    cursor: pointer;
                `} onClick={toggleCollapse}>{collapsed ? "→" : "↓"}</div>
                <div css={css`          
                    text-align: end;
                    padding: 5px;
                    margin: 7px;
                    border: 1px solid white;
                    position: relative;
                    border-radius: 5px;             
                    cursor: pointer;
                `} onClick={props.closeModalHandler}>X</div>

            </div>
            <div css={css`
                color: white;                
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                padding:  ${collapsed ? "0px 15px 0px 15px" : "15px 15px 15px 15px"};
                transition: padding .3s ease-out, height .3s ease-out;
                height: ${collapsed ? "0px" : (modalHeight? modalHeight + "px" : "auto")};
                overflow: hidden;
            `}>
                {props.children}
            </div>

        </div>

    )
}


export default ModalWindow;