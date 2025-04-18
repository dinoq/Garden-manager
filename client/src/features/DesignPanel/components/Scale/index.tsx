/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { DEPTH } from '../../../../helpers/constants';
import MovePoint from '../../../../components/UI/MovePoint';
import { zoomSelector } from '../../../../store/reducers/ViewNavigationSlice/selectors';

const Scale: React.FC<{}> = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const zoom = useAppSelector(zoomSelector);

    return (
        <div css={css`
            width: 150px;
            height: 4px;
            background-color: #404040;
            position: fixed;
            right: ${50 - position.x}px;
            bottom: ${50 - position.y}px;
            padding: 0;
            margin: 0;
            z-index: ${DEPTH.SCALE};
        
        `}>
            <MovePoint setPosition={setPosition} />
            <div css={css`
            width: 4px;
            height: 15px;
            background-color: #cacaca;
            position: relative;
            left: 0px;
            bottom: 5px;
            padding: 0;
            margin: 0;
        
        `}></div>
            <div css={css`
            width: 4px;
            height: 15px;
            background-color: #cacaca;
            position: relative;
            left: 150px;
            bottom: 20px;
            padding: 0;
            margin: 0;
        
        `}></div>
            <span css={css`
            width: 4px;
            height: 15px;
            background-color: #cacaca;
            position: relative;
            left: 65px;
            bottom: 60px;
            padding: 0;
            margin: 0;
        
        `}>{(1 / zoom).toFixed(2)}m</span>

        </div>
    )
}

export default Scale;