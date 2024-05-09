/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import InputField from "../InputField";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { enableZoomAction } from "../../../store/reducers/ViewNavigationSlice";

export interface ISelectboxProps {
    defaultValue: number,
    allOptions: Array<IOption>,
    onChange: Function,
    modalWidth: number
}

export interface IOption {
    name: string,
    value: number
}


const SearchableSelectbox: React.FC<ISelectboxProps> = (props) => {
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState("");
    const [options, setOptions] = useState<IOption[]>([]);

    useEffect(() => {
        console.log('props.allOptions.length, options.length: ', props.allOptions.length, options.length);
        setOptions(props.allOptions); // All options are not available at first render, so we muset set it manually on props.allOptions change (initial set in useState applies only on first render)
    }, [props.allOptions]);

    const inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        setSearchText(text);
        const filteredOptions = props.allOptions.filter(option => option.name.includes(text));
        setOptions(filteredOptions);
    }

    const showOptions = (e: React.MouseEvent<HTMLInputElement>) => {
        console.log('showOptions: ', options, props.allOptions);
    }

    const optionSelected = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log('click');
        //props.onChange(e);
    }

    return (
        <div>
            <InputField onChangeHandler={inputChanged} value={searchText} onClick={showOptions} />
            <div css={css`
                width: ${props.modalWidth}px;
                max-height: 200px;
                overflow-y: scroll;
                cursor: pointer;
            `} onMouseEnter={() => dispatch(enableZoomAction(false))} onMouseLeave={() => dispatch(enableZoomAction(true))}>
                {options.map(option => {
                    return (
                        <div key={"option-" + option.value} id={"option-" + option.value} onClick={optionSelected}>
                            {option.name}
                        </div>)
                })}
            </div>
        </div>
    )
}



export default SearchableSelectbox;