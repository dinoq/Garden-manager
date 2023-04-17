/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from "../../../hooks/useAppSelector";
import { setIsMovingAppViewAction } from '../../../store/reducers/ViewNavigationSlice';


interface IManipulationToolsProps{

}

const ManipulationTools: React.FC<IManipulationToolsProps> = (props) => {
    const dispatch = useAppDispatch();
    const isMovingAppView = useAppSelector(selector => selector.navigationReducer.isMovingAppView)
    return (
        <div aria-label="Manipulation tools" css={css`
                :before {
                    content: attr(aria-label);
                    font-size: 0.8rem;
                    position: absolute;
                    top: 3px;
                    background-color: #727272;
                    padding: 3px;
                    border-radius: 5px
                };
                width: 200px;
                height: 100px;
                background: #969696;
                border-radius: 10px;
                margin: 15px;
                padding: 15px;

            `}>
            <button onClick={(e) => {
                dispatch(setIsMovingAppViewAction(true));
            }} css={css`
                    background-color: ${isMovingAppView ? "green" : "initial"};
                `}>M</button>

        </div>
    )
}

export default ManipulationTools;