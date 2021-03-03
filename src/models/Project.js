export default class Project {
    constructor(endDateReal,endDateTheorical, id, milestones, name, requirements, tasks, user) {
        this.endDateReal = endDateReal;
        this.endDateTheorical =endDateTheorical;
        this.id = id;
        this.milestones = milestones;
        this.name = name;
        this.requirements = requirements;
        this.tasks = tasks;
        this.user = user;
    }
}