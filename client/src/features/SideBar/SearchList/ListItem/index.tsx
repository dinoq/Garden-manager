/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { MouseEventHandler } from 'react';
import { IPlant } from '../../../../helpers/plant-types';
import { IAppObject } from '../../../../helpers/types';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { hideGUISelector } from '../../../DesignPanel/selectors';

interface IListItem{
    item: IPlant | IAppObject,
    setNewUplacedSeedBed: MouseEventHandler<HTMLLIElement>,
    isLastItem: boolean
}
const ListItem: React.FC<IListItem> = (props) => {
    const hideGUI = useAppSelector(hideGUISelector);
    const name = hideGUI? props.item.name.substring(0,2) : props.item.name;
    return (<
        li key={"plant-" + props.item.id} id={"plant-" + props.item.id} draggable="false" onClick={props.setNewUplacedSeedBed} css={css`
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
`}>{name}</li>
    )
}

export default ListItem;