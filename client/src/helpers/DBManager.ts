import { ISeedBedSlice } from "../store/reducers/SeedBedsSlice";

const PROJECTS_PATH = "projects";
export default class DBManager{

    public static saveProject(project: ISeedBedSlice) {        
        const projects: Array<ISeedBedSlice> = this.getProjects();
        let index = projects.findIndex(proj => proj.projectID === project.projectID);
        if(index === -1){
            projects.push(project);
        }else{
            projects[index] = project;
        }

        localStorage.setItem(PROJECTS_PATH, JSON.stringify(projects));
    }

    public static getProjectByID(id: number): ISeedBedSlice {  
        const projects: Array<ISeedBedSlice> = this.getProjects();
        const project = projects.find(p=>p.projectID === id);
        console.log('project: ', project);

        return {
            projectID: project?.projectID || -1,
            projectName: project?.projectName || "",
            created: project?.created || new Date().getTime(),
            lastModified: project?.lastModified || new Date().getTime(),
            selectedSeedBed: -1,
            seedBeds: project?.seedBeds || []
        }

    }

    public static getProjects(): Array<ISeedBedSlice> {   
        const projectsFromDBStr: string | null = localStorage.getItem(PROJECTS_PATH);
        const projectsFromDB: Array<ISeedBedSlice> = projectsFromDBStr?.length? JSON.parse(projectsFromDBStr) : [];
        return projectsFromDB;
    }

    
    static getUniqueProjectID(): any {
        const projects: Array<ISeedBedSlice> = this.getProjects();
        return projects.length;
    }
}