import store from "../store";
import { IDesignSlice, IProjectSlice } from "../store/reducers/DesignSlice";
import { ISettingsSlice } from "../store/reducers/SettingsSlice";

const PROJECTS_PATH = "projects";
const SETTINGS_PATH = "settings";

export default class DBManager {

    public static saveProject() {
        const appReducer: IDesignSlice = store.getState().designReducer;
        const apps: Array<IDesignSlice> = this.getProjects();
        let index = apps.findIndex(app => app.project.projectID === appReducer.project.projectID);
        if (index === -1) {
            apps.push(appReducer);
        } else {
            apps[index] = appReducer;
        }

        localStorage.setItem(PROJECTS_PATH, JSON.stringify(apps));
    }

    public static getProjectByID(id: number): IDesignSlice {
        const savedApps: Array<IDesignSlice> = this.getProjects();
        const app = savedApps.find(p => p.project.projectID === id);

        return {
            objects: {
                selectedSeedBedID: -1,
                seedBeds: app?.objects?.seedBeds || []
            },
            project: {
                projectID: app?.project?.projectID || -1,
                projectName: app?.project?.projectName || "",
                created: app?.project?.created || new Date().getTime(),
                lastModified: app?.project?.lastModified || new Date().getTime(),
            },
            calendar: {
                actualYear: app?.calendar?.actualYear || new Date().getFullYear(),
                actualMonth: app?.calendar?.actualMonth || 0,
                actualMonthPart: app?.calendar?.actualMonthPart || 0,
                showAllMonths: app?.calendar?.showAllMonths || false
            }
        }

    }

    public static getProjects(): Array<IDesignSlice> {
        const projectsFromDBStr: string | null = localStorage.getItem(PROJECTS_PATH);
        const projectsFromDB: Array<IDesignSlice> = projectsFromDBStr?.length ? JSON.parse(projectsFromDBStr) : [];
        return projectsFromDB;
    }

    static getUniqueProjectID(): any {
        const projects: Array<IDesignSlice> = this.getProjects();
        return projects.length;
    }

    public static saveSettings() {
        const settingsReducer: ISettingsSlice = store.getState().settingsReducer;
        localStorage.setItem(SETTINGS_PATH, JSON.stringify(settingsReducer));
    }

    public static getSettings(): ISettingsSlice {
        const settingsStr = localStorage.getItem(SETTINGS_PATH);
        return settingsStr?.length ? JSON.parse(settingsStr) : undefined;
    }
}