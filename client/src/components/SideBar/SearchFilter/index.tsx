/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import FilterSwitch from './FilterSwitch';

interface ISearchFilterProps {

}

const SearchFilter: React.FC<ISearchFilterProps> = (props) => {

    return (
        <div>
            <FilterSwitch options={["plants.png", "plant_objects.png", "objects.png"]} optionType={'imgSrc'}/>
        </div>
    )
}

export default SearchFilter;