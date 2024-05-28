/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import InputField from "../InputField";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { enableZoomAction } from "../../../store/reducers/ViewNavigationSlice";
import { IOption } from "../../types";
import useClickOutside from "../../../hooks/useClickOutside";

export interface ISelectboxProps {
    name: string,
    selectedValue: number,
    allOptions: Array<IOption>,
    onChange: Function,
    modalWidth: number
}

const SearchableSelectbox: React.FC<ISelectboxProps> = (props) => {
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState(props.allOptions.find(option => option.value === props.selectedValue)?.name || "");
    const [options, setOptions] = useState<IOption[]>(props.allOptions);
    const [optionsVisible, setOptionsVisible] = useState(false);

    const optionsRef = useClickOutside((e: MouseEvent) => {
       if (optionsRef.current && !optionsRef.current.contains(e.target as HTMLDivElement)) {
            setOptionsVisible(false);
        }
    })

    useEffect(() => {
        setSearchText(props.allOptions.find(option => option.value === props.selectedValue)?.name || "");
    }, [props.selectedValue, props.allOptions])

    useEffect(() => {
        setOptions(props.allOptions);
    }, [props.allOptions])

    const inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        setSearchText(text);
        const toLowerRemoveDiacritics = (str: string) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Converts string to lower case and removes diacritics (for more exact comparison)
        const filteredOptions = props.allOptions.filter(option => toLowerRemoveDiacritics(option.name).includes(toLowerRemoveDiacritics(text)));
        setOptions(filteredOptions);
    }

    const showOptions = (e: React.MouseEvent<HTMLInputElement>) => {
        setOptionsVisible(true);
    }

    const optionSelected = (e: React.MouseEvent<HTMLDivElement>) => {
        setOptionsVisible(false);
        props.onChange(e);
    }

    return (
        <div>
            <InputField onChangeHandler={inputChanged} value={searchText} onClick={showOptions} />
            <div css={css`
                width: ${props.modalWidth}px;
                max-height: 200px;
                overflow-y: scroll;
                cursor: pointer;
                background-color: #6e6e6e;
                position: absolute;
                display: ${optionsVisible ? "block" : "none"};
            `} onMouseEnter={() => dispatch(enableZoomAction(false))} onMouseLeave={() => dispatch(enableZoomAction(true))} ref={optionsRef}>
                {options.map(option => {
                    return (
                        <div key={props.name + "-option-" + option.value} id={"option-" + option.value} onClick={optionSelected} css={css`
                            &:hover {
                                background-color: #575757;
                            }
                        `}>
                            {option.name}
                        </div>)
                })}
            </div>
        </div>
    )
}



export default SearchableSelectbox;