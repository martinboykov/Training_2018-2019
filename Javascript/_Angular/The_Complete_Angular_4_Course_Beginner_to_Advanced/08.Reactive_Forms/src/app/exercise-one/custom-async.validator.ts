export class CustomAsyncValidator {

  static checkIfNameIsTaken(firstname): any {
    const names = [
      'Martin',
      'Sacho',
      'Pesho',
      'Gosho'
    ]
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (names.includes(firstname.value)) {
          resolve({ nameIsTaken: true });
        }
        resolve(null);
      }, 2000);
    })
  }
}
