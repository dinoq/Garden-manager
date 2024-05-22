/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import FilterSwitch from '../FilterSwitch';
import { useAppSelector } from '../../../../hooks/useAppSelector';

interface ISearchFilterProps {
    selectionChanged: Function
}

const SearchFilter: React.FC<ISearchFilterProps> = (props) => {
    const hideGUI = useAppSelector(state=> state.guiReducer.hideGUI);
    return (
        <div>
            {!hideGUI&& <FilterSwitch options={["plants.png", "objects.png"]} optionType={'imgSrc'} selectionChanged={props.selectionChanged}/>}
        </div>
    )
}

export default SearchFilter;