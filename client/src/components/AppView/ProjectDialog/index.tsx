/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/react';
import ModalWindow from '../../GUI/ModalWindow';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { hideProjectDialog } from '../../../store/reducers/GUISlice';
import { useState, useEffect } from "react"
import ListPanel from '../../GUI/ListPanel';
import InputField from '../../GUI/InputField';
import Button from '../../GUI/Button';
import { ISeedBedSlice, setLMT, setProject, setProjectID, setProjectName as setProjectNameAction } from '../../../store/reducers/SeedBedsSlice';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { ISeedBed } from '../../../helpers/types';
import { stringifyIfDateLong } from '../../../helpers/functions';
import DBManager from '../../../helpers/DBManager';

export interface IProjectInfos extends ISeedBedSlice{
    onClick?: any
}

export enum ProjectDialogStates {
    OPEN_PROJECT,
    SAVE_PROJECT
}
export interface IProjectDialogProps {
    state: ProjectDialogStates
}
const ProjectDialog: React.FC<IProjectDialogProps> = (props) => {
    const dispatch = useAppDispatch();

    const seedBedsReducer = useAppSelector(state => state.seedBedsReducer);

    const [projects, setProjects] = useState<Array<IProjectInfos>>([]);
    const projectName = useAppSelector(state => state.seedBedsReducer.projectName);

    const header = [{ name: "Název", itemAttributeName: "projectName" }, { name: "Datum vytvoření", itemAttributeName: "createdDataTime" }, { name: "Datum změny", itemAttributeName: "lastModifiedDataTime" }]
    useEffect(() => {
        //fetch
        const projectsFromDB = DBManager.getProjects() as IProjectInfos[];
        projectsFromDB.map((p) => {
            p.onClick = projectClickedHandler;
        })

        setProjects(projectsFromDB);

    }, [])

    const projectClickedHandler = (clickedItem: IProjectInfos, index: any, event: React.MouseEvent) => {
        if (clickedItem && clickedItem?.projectName?.length) {
            dispatch(hideProjectDialog());
            const projectData = DBManager.getProjectByID(clickedItem?.projectID);

            dispatch(setProject(projectData));
        }

    }

    const saveProject = () => {
        let projectID = seedBedsReducer.projectID;
        if(seedBedsReducer.projectID == -1){
            projectID = DBManager.getUniqueProjectID();
            dispatch(setProjectID(projectID))
        }

        DBManager.saveProject({...seedBedsReducer, projectID}); // Dekomposition is used, becauce projectID can change (few lines above) and it is not possible to wait for store change
        dispatch(setLMT(new Date().getTime()))
        dispatch(hideProjectDialog());

    }

    return (
        <ModalWindow position={{left: "50%", top: "50%"}} dimension={{width: "500px", height
        : "500px"}} closeModalHandler={() => dispatch(hideProjectDialog())}>
            <ListPanel items={projects} header={header} />
            {props.state == ProjectDialogStates.SAVE_PROJECT && (
                <div css={css`
                    display: flex;
                `}>
                    <InputField value={projectName} placeholder='Název projektu' onChangeHandler={(e)=>{dispatch(setProjectNameAction(e.target.value))}} />
                    <Button text='Uložit' onClick={saveProject} />
                </div>
            )}
        </ModalWindow>
    )
}


export default ProjectDialog;