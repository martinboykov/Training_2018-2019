// APPROACH 1. Using References (Normalization)
// -> CONSISTENCY (changes only at one place)
// -> MULTIPLE QUARIES (more tire, CPU, net)
const author = {
    name: 'Mosh',
};

let course = {
    author: 'id',
};

// APPROACH 2. Using Embedded Documents (Denormalization)
// PERFORMANCE -> Single quary
// -> multiple changes needed for single moification
course = {
    author: {
        name: 'Mosh',
    },
};

// APPROACH 3. (Hybrid)

author = {
    name: 'Mosh',
    // ... other properties
};

course = {
    author: {
        id: 'ref',
        name: 'Mosh',
    },
};
