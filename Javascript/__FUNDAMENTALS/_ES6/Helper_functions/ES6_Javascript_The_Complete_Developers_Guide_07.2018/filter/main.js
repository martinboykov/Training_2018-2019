// const products = [
//     { name: 'cucumber', type: 'vegetable', quantity: 10, price: 125 },
//     { name: 'orange', type: 'fruit', quantity: 15, price: 5 },
//     { name: 'celery', type: 'vegetable', quantity: 0, price: 25 },
//     { name: 'banana', type: 'fruit', quantity: 3, price: 12 },
// ];

// const fruits = products.filter((product) => {
//     return (product.type === 'vegetable'
//         && product.quantity > 0
//         && product.price > 30);
// });
// console.log(fruits);

// --------------------------------------------------

const post = { id: 4, title: 'New Post' };
const comments = [
    { postId: 4, content: 'awesome post' },
    { postId: 3, content: 'it was ok' },
    { postId: 4, content: 'neat' },
];

const targetComments = comments.filter((comment)=>{
    return comment.postId === post.id;
});
console.log(targetComments);
