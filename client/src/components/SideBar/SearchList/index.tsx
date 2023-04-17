/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { MouseEventHandler } from 'react';
import { IPlant } from '../../../helpers/plant-types';
import { IAppObject } from '../../../helpers/types';
import ListItem from './ListItem';

interface ICategory{
    items: Array<IPlant|IAppObject> ,
    setNewUplacedSeedBed: MouseEventHandler<HTMLLIElement>,
}
const SearchList: React.FC<ICategory> = (props) => {
    console.log('props.items: ', props.items);
    
    return (
        <ul css={css`
            list-style-type: none;
            padding-left: 0;
            height: 100%;
            overflow-y: scroll;
    `}>
            {props.items.map((item, i) => {
                return <ListItem key={"search-list-item-" + i} index={i} isLastItem={i==props.items.length-1} item={item} setNewUplacedSeedBed={props.setNewUplacedSeedBed} />
            })}
        </ul>
    )
}

export default SearchList;