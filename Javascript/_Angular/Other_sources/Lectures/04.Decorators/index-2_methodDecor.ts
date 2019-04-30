function notEnumerable(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor) {
    descriptor.enumerable = false;
}
function enumerable(
    isEnumerable: boolean) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor) {
        descriptor.enumerable = false;
    };
}



class Bus {

    constructor(public name: string, private students?: string[]) {
    }
    @notEnumerable
    public addStudentToClass(student: string) {
        this.students.push(student);
    }
}

let bus: Bus = new Bus("PMG");
console.log(school);
school.name = "x";
console.log(school);
