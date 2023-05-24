/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/react';
import ModalWindow from '../GUI/ModalWindow';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { hideOpenProjectDialog } from '../../store/reducers/GUISlice';

export interface IOpenProjectDialogProps{

}
const OpenProjectDialog: React.FC<IOpenProjectDialogProps> = (props) => {
    const dispatch = useAppDispatch();


    return (
        <ModalWindow closeModal={()=>dispatch(hideOpenProjectDialog())}>

        </ModalWindow>
    )
}


export default OpenProjectDialog;