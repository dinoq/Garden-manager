/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setIsMovingAppViewAction } from '../../store/reducers/ViewNavigationSlice';


const Header: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const isMovingAppView = useAppSelector(selector => selector.navigation.isMovingAppView)

    return (
        <div css={css`
            width: 100%;
            height: 150px;
            background-color: #a6a6a6;
        `}>

            <div css={css`
                :before {
                    content: attr(aria-label);
                    font-size: 0.8rem;
                    position: absolute;
                    top: 3px;
                    background-color: #727272;
                    padding: 3px;
                    border-radius: 5px
                };
                width: 200px;
                height: 100px;
                background: #969696;
                border-radius: 10px;
                margin: 15px;
                padding: 15px;

            `}

                aria-label="manipulation tools" >
                <button onClick={(e) => {
                    dispatch(setIsMovingAppViewAction(true));
                }} css={css`
                    background-color: ${isMovingAppView? "green" : "initial"};
                `}>M</button>

            </div>
        </div>
    )
}


export default Header;