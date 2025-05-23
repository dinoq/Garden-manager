/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { MouseEventHandler } from 'react';
import { IPlant } from '../../../helpers/plant-types';
import { IAppObject } from '../../../helpers/types';
import ListItem from './ListItem';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { hideGUISelector } from '../../../store/reducers/GUISlice/selectors';

interface ICategory {
    items: Array<IPlant | IAppObject>,
    setNewUplacedPlantSection: MouseEventHandler<HTMLLIElement>,
}
const SearchList: React.FC<ICategory> = (props) => {
    const hideGUI = useAppSelector(hideGUISelector);

    const items = hideGUI ? props.items.slice(0, 5) : props.items;
    return (
        <ul css={css`
            list-style-type: none;
            padding-left: 0;
            height: 100%;
            overflow-y: scroll;
    `}>
            {items.map((item, i) => {
                return <ListItem key={"search-list-item-" + item.id} isLastItem={i === props.items.length - 1} item={item} setNewUplacedPlantSection={props.setNewUplacedPlantSection} />
            })}
        </ul>
    )
}

export default SearchList;