export default class Requirement {
    constructor(id, description, isFunctional, requirementNoneFunctional) {
        this.id = id;
        this.description = description;
        this.isFunctional = isFunctional;
        this.requirementNoneFunctional = requirementNoneFunctional;
    }
}