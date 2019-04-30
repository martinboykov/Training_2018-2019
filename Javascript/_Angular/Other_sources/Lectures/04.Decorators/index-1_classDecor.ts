function sealed(constructor: Function) {
    Object.seal(constructor); //заключва промяната на конструктора
    Object.seal(constructor.prototype); //заключва промяната на прототипа на обекта
    console.log("I am sealed DECORATOR");
}

@sealed
class School {

    constructor(public name: string, private students?: string[]) {
    }
    public addStudentToClass(student: string) {
        this.students.push(student);
    }
}

let school: School = new School("PMG");
console.log(school);
school.name = "x";
console.log(school);
