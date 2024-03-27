'use strict';

class User {
    #id;
    #name;
    #userName;
    #email;
    constructor(id, name, userName, email) {
        this.#id = id;
        this.#name = name;
        this.#userName = userName;
        this.#email = email;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get userName() { return this.#userName; }
    get email() { return this.#email; }

    getInfo() {
        return (
            `ID: ${this.id}, 
            Name: ${this.name}, 
            UserName: ${this.userName}, 
            Email: ${this.email}`
        );
    }
}

class Subscriber extends User {
    #pages;
    #groups;
    #canMonitize;
    constructor(id, name, userName, email, pages, groups, canMonitize) {
        super(id, name, userName, email);
        this.#pages = pages;
        this.#groups = groups;
        this.#canMonitize = canMonitize;
    }

    get pages() { return this.pages; }
    get groups() { return this.groups; }
    get canMonitize() { return this.canMonitize; }

    getInfo() {
        return (
            `, ${super.getInfo()}, 
            Pages: ${this.pages}, 
            Groups: ${this.groups}, 
            Monitization: ${this.canMonitize}`
        );
    }
}

export default Subscriber;