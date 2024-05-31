/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { cmToPX, zoomedFactory } from '../../../../helpers/functions';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { IPlantSectionProps } from '../PlantSection';
import { ROWDIRECTIONS } from '../../types';
import { plantSectionSelector } from '../../../../store/reducers/DesignSlice/selectors';
import { zoomSelector } from '../../../../store/reducers/ViewNavigationSlice/selectors';


interface ISeedCircle extends IPlantSectionProps {
    rowDirection: ROWDIRECTIONS,
    id: number
}
const Plant: React.FC<ISeedCircle> = (props) => {

    const zoom = useAppSelector(zoomSelector);
    const zoomed = zoomedFactory(zoom);

    const plantSection = useAppSelector(state => plantSectionSelector(state, props.id));

    const showBorderInPlants = false;


    const plantSpacingMin = props.plantSpacingMin ? props.plantSpacingMin : props.plant.PlantSpacingMin;
    const RowSpacingMin = props.rowSpacingMin ? props.rowSpacingMin : props.plant.RowSpacingMin;

    const plantSize = plantSpacingMin;
    let marginTB, marginLR;
    if (props.rowDirection === ROWDIRECTIONS.LEFT_TO_RIGHT) {
        marginTB = cmToPX(zoomed(RowSpacingMin / 2 - plantSize / 2), zoom);
        marginLR = cmToPX(zoomed(plantSpacingMin / 2 - plantSize / 2), zoom);
    } else {
        marginLR = zoomed(RowSpacingMin / 2 - plantSize / 2);
        marginTB = zoomed(plantSpacingMin / 2 - plantSize / 2);
    }
    return (
        <div css={css`
        padding: ${marginTB}px ${marginLR}px;
        border: ${showBorderInPlants? "1px dashed #0000003b" : "none"};
        `}>
            <div css={css`
            /*background-color: #00000065;*/
            background-image: ${'url("imgs/' + plantSection.plant.icon + '")'};
            background-size: contain;
            width: ${cmToPX(zoomed(plantSize), zoom) - (showBorderInPlants? 2 : 0)}px;
            height: ${cmToPX(zoomed(plantSize), zoom) - (showBorderInPlants? 2 : 0)}px;
            border: 0;
            /*border-radius: 25%;*/
        `}>

            </div>
        </div>
    )
}

export default Plant;