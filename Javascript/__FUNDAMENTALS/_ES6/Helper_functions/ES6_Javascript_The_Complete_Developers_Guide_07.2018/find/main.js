// const users = [
//     { name: 'Jill' },
//     { name: 'Alex' },
//     { name: 'Bill' },
// ];

// const found = users.find((user, index, thisArg) => {
//     return user.name === 'Alex';
// });
// console.log(found);

// -----------------------------------------------

// class Car {
//     constructor(model) {
//         this.model = model;
//     }
// }

// const cars = [
//     new Car('Buick'),
//     new Car('Camaro'),
//     new Car('Focus'),
// ];
// const findCar = cars.find((car)=>{
//     return car.model === 'Buick';
// });
// console.log(findCar);

// -----------------------------------------------

const posts = [
    { id: 1, title: 'New Post' },
    { id: 2, title: 'Old Post' },
];

const comment = { postId: 1, content: 'Great POst' };

const getPost = posts.find((post)=>{
    return post.id === comment.postId;
});
console.log(getPost);
