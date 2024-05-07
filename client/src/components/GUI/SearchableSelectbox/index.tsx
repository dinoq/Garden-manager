/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import InputField from "../InputField";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { enableZoomAction } from "../../../store/reducers/ViewNavigationSlice";

export interface ISelectboxProps {
    defaultValue: number,
    defaultOptions: Array<IOption>,
    onChange: Function,
    width: number
}

export interface IOption {
    name: string,
    value: number
}


const SearchableSelectbox: React.FC<ISelectboxProps> = (props) => {
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState("");
    const [options, setOptions] = useState(props.defaultOptions);
    console.log('props.defaultOptions: ', props.defaultOptions, options);

    const inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    }

    const showOptions = (e: React.MouseEvent<HTMLInputElement>) => {
        console.log('showOptions: ',options, props.defaultOptions);
    }

    const optionSelected = (e: React.MouseEvent<HTMLInputElement>) => {
        props.onChange(e);
    }

    return (
        <div>
            <InputField onChangeHandler={inputChanged} value={searchText}  />
        </div>
    )
}



export default SearchableSelectbox;