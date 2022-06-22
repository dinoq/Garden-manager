/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/react';
import { ISeedBedProps } from '.';
import { cmToPX } from '../../helpers/functions';
import { useAppSelector } from '../../hooks';

interface ISeedCircle extends ISeedBedProps{

}
const SeedCircle: React.FC<ISeedCircle> = (props) => {

    const zoom = useAppSelector(selector => selector.navigation.zoom);
    const seedSize = 1;
    return (
        <div css={css`
            background-color: red;
            width: ${cmToPX(seedSize, zoom)}px;
            height: ${cmToPX(seedSize, zoom)}px;
            border: 0;
            border-radius: 25%;
            margin: ${cmToPX(props.plant.betweenRowSpacing/2,zoom)}px ${cmToPX(props.plant.inRowSpacing/2, zoom)}px;
        `}>

        </div>
    )
}

export default SeedCircle;