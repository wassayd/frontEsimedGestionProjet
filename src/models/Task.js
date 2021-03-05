export default class Task {
    constructor(label, description, userId, theoricDateStart, nbDay, project) {
        this.label = label;
        this.description = description;
        this.userId = userId;
        this.theoricDateStart = theoricDateStart;
        this.nbDay = nbDay;
        this.project = project;
    }
}