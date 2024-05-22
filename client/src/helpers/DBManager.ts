import store from "../store";
import { IAppSlice, IProjectSlice } from "../store/reducers/AppSlice";

const PROJECTS_PATH = "projects";
export default class DBManager{

    public static saveProject() {        
        const appSlice: IAppSlice = store.getState().appReducer;
        const apps: Array<IAppSlice> = this.getProjects();
        let index = apps.findIndex(app => app.project.projectID === appSlice.project.projectID);
        if(index === -1){
            apps.push(appSlice);
        }else{
            apps[index] = appSlice;
        }

        localStorage.setItem(PROJECTS_PATH, JSON.stringify(apps));
    }

    public static getProjectByID(id: number): IAppSlice {  
        const savedApps: Array<IAppSlice> = this.getProjects();
        const app = savedApps.find(p=>p.project.projectID === id);

        return {
            objects:{
                selectedSeedBedID: -1,
                seedBeds: app?.objects?.seedBeds || []
            },
            project:{
                projectID: app?.project?.projectID || -1,
                projectName: app?.project?.projectName || "",
                created: app?.project?.created || new Date().getTime(),
                lastModified: app?.project?.lastModified || new Date().getTime(),
            },
            calendar:{                
                actualYear: app?.calendar?.actualYear || new Date().getFullYear(),
                actualMonth: app?.calendar?.actualMonth || 0,
                actualMonthPart: app?.calendar?.actualMonthPart || 0,
                showAllMonths: app?.calendar?.showAllMonths || false
            }
        }

    }

    public static getProjects(): Array<IAppSlice> {   
        const projectsFromDBStr: string | null = localStorage.getItem(PROJECTS_PATH);
        const projectsFromDB: Array<IAppSlice> = projectsFromDBStr?.length? JSON.parse(projectsFromDBStr) : [];
        return projectsFromDB;
    }

    
    static getUniqueProjectID(): any {
        const projects: Array<IAppSlice> = this.getProjects();
        return projects.length;
    }
}