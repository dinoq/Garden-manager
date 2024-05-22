/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { zoomedFactory } from '../../../../helpers/functions';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { seedBedSelector } from '../../selectors';
import { ISeedBedProps } from '../SeedBed';
import { ROWDIRECTIONS } from '../../types';


interface ISeedCircle extends ISeedBedProps{
    rowDirection: ROWDIRECTIONS,
    id: number
}
const Plant: React.FC<ISeedCircle> = (props) => {
    
    const zoom = useAppSelector(selector => selector.navigationReducer.zoom);
    const zoomed = zoomedFactory(zoom);

    const seedBed = useAppSelector(state => seedBedSelector(state, props.id));

    
    const plantSpacingMin = props.plantSpacingMin? props.plantSpacingMin : props.plant.PlantSpacingMin;
    const RowSpacingMin = props.rowSpacingMin? props.rowSpacingMin : props.plant.RowSpacingMin;

    const plantSize = 45;
    let marginTB, marginLR;
    if(props.rowDirection === ROWDIRECTIONS.LEFT_TO_RIGHT){
        marginTB = zoomed(RowSpacingMin/2 - plantSize/2);
        marginLR = zoomed(plantSpacingMin/2 - plantSize/2);
    }else{
        marginLR = zoomed(RowSpacingMin/2 - plantSize/2);
        marginTB = zoomed(plantSpacingMin/2 - plantSize/2);
    }
    return (
        <div css={css`
            /*background-color: #00ff5a;*/
            background-image: ${'url("imgs/' + seedBed.plant.icon + '")'};
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