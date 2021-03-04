export default class User {
    constructor(id, firstName, lastName, trigram) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.trigram = trigram;
    }
    getFullName() {
        return this.firstName + " " + this.lastName;
    }
}