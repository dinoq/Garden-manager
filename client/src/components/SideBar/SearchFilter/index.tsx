/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import FilterSwitch from '../FilterSwitch';

interface ISearchFilterProps {
    selectionChanged: Function
}

const SearchFilter: React.FC<ISearchFilterProps> = (props) => {

    return (
        <div>
            <FilterSwitch options={["plants.png", "objects.png"]} optionType={'imgSrc'} selectionChanged={props.selectionChanged}/>
        </div>
    )
}

export default SearchFilter;