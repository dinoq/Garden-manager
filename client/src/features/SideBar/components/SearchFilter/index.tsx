/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import FilterSwitch from '../FilterSwitch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { hideGUISelector } from '../../../../store/reducers/GUISlice/selectors';

interface ISearchFilterProps {
    selectionChanged: Function
}

const SearchFilter: React.FC<ISearchFilterProps> = (props) => {
    const hideGUI = useAppSelector(hideGUISelector);
    return (
        <div>
            {!hideGUI&& <FilterSwitch options={["plants.png", "objects.png"]} optionType={'imgSrc'} selectionChanged={props.selectionChanged}/>}
        </div>
    )
}

export default SearchFilter;