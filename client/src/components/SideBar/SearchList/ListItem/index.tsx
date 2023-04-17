/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/react';
import { MouseEventHandler } from 'react';
import { IPlant } from '../../../../helpers/plant-types';
import { IAppObject } from '../../../../helpers/types';

interface IListItem{
    index: number,
    item: IPlant | IAppObject,
    setNewUplacedSeedBed: MouseEventHandler<HTMLLIElement>,
    isLastItem: boolean
}
const ListItem: React.FC<IListItem> = (props) => {

    return (<
        li key={"plant-" + props.index} draggable="false" onClick={props.setNewUplacedSeedBed} css={css`
    cursor: pointer;
    padding: 15px;
    margin: 5px 0;
    margin-bottom: ${props.isLastItem? "17px" : "5px"};
    background-color: #626262;
    //color: white;
    color: rgba(255, 255, 255, 0.1);
    text-align: center;
    border-radius: 10px;
    user-select: none;
`}>{props.item.name/*.substring(0,1)*/}</li>
    )
}

export default ListItem;