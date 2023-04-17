/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/react';
import { ISeedBedProps } from '.';
import { zoomedFactory } from '../../helpers/functions';
import { useAppSelector } from '../../hooks/useAppSelector';

export enum ROWDIRECTIONS{
    LEFT_TO_RIGHT,
    TOP_TO_DOWN
}
interface ISeedCircle extends ISeedBedProps{
    rowDirection: ROWDIRECTIONS,
    id: number
}
const Plant: React.FC<ISeedCircle> = (props) => {
    
    const zoom = useAppSelector(selector => selector.navigationReducer.zoom);
    const zoomed = zoomedFactory(zoom);

    const seedBed = useAppSelector(state => state.seedBedsReducer.seedBeds[props.id]);

    const plantSize = 45;
    let marginTB, marginLR;
    if(props.rowDirection === ROWDIRECTIONS.LEFT_TO_RIGHT){
        marginTB = zoomed(props.plant.betweenRowSpacingMin/2 - plantSize/2);
        marginLR = zoomed(props.plant.inRowSpacingMin/2 - plantSize/2);
    }else{
        marginLR = zoomed(props.plant.betweenRowSpacingMin/2 - plantSize/2);
        marginTB = zoomed(props.plant.inRowSpacingMin/2 - plantSize/2);
    }
    return (
        <div css={css`
            /*background-color: #00ff5a;*/
            background-image: url("imgs/potato.png");
            background-size: contain;
            width: ${zoomed(plantSize)}px;
            height: ${zoomed(plantSize)}px;
            border: 0;
            /*border-radius: 25%;*/
            margin: ${marginTB}px ${marginLR}px;
        `}>

        </div>
    )
}

export default Plant;