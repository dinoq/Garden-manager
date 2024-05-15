/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from "../../../hooks/useAppSelector";
import { setIsMovingAppViewAction } from '../../../store/reducers/ViewNavigationSlice';
import LabeledCard from '../../GUI/LabeledCard';


interface IManipulationToolsProps {

}

const ManipulationTools: React.FC<IManipulationToolsProps> = (props) => {
    const dispatch = useAppDispatch();
    const isMovingAppView = useAppSelector(selector => selector.navigationReducer.isMovingAppView)
    return (
        <LabeledCard label="Manipulation tools">
            <button onClick={(e) => {
                dispatch(setIsMovingAppViewAction(true));
            }} css={css`
                background-color: ${isMovingAppView ? "green" : "initial"};
            `}>M</button>
        </LabeledCard>
    )
}

export default ManipulationTools;