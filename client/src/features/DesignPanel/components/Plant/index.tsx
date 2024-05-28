/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { zoomedFactory } from '../../../../helpers/functions';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { IPlantSectionProps } from '../PlantSection';
import { ROWDIRECTIONS } from '../../types';
import { plantSectionSelector } from '../../../../store/reducers/DesignSlice/selectors';
import { zoomSelector } from '../../../../store/reducers/ViewNavigationSlice/selectors';


interface ISeedCircle extends IPlantSectionProps{
    rowDirection: ROWDIRECTIONS,
    id: number
}
const Plant: React.FC<ISeedCircle> = (props) => {
    
    const zoom = useAppSelector(zoomSelector);
    const zoomed = zoomedFactory(zoom);

    const plantSection = useAppSelector(state => plantSectionSelector(state, props.id));

    
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
            background-image: ${'url("imgs/' + plantSection.plant.icon + '")'};
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