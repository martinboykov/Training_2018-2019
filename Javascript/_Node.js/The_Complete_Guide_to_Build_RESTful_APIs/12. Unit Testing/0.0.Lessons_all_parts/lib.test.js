const lib = require('./lib');
const db = require('./db');
const mail = require('./mail');

describe('absolute', () => {
    it(`absolute - should return a positive number
    if input is positive`, () => {
            const result = lib.absolute(1);
            expect(result).toBe(1);
        });

    it(`absolute - should return a positive number
        if input is negative`, () => {
            const result = lib.absolute(-1);
            expect(result).toBe(1);
        });

    it(`absolute - should return zero
        if input is zero`, () => {
            const result = lib.absolute(0);
            expect(result).toBe(0);
        });
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Mosh');
        // expect(result).toMatch(/Mosh/);
        expect(result).toContain('Mosh');
        // expect(result).toMatch(/^Welcome(\s){1}.*/);
    });
});


describe('getCurrencies', () => {
    it('should return array containing \'USD\' and/or \'AUD\' and/or \'EUR\'',
        () => {
            const result = lib.getCurrencies();
            expect(result).toContain('USD', 'AUD', 'EUR');

            // THE BEST?!?!
            // expect(result)
            //      .toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']));
        });
});

describe('getProduct', () => {
    const result = lib.getProduct(1);
    // Approach 1 - toBe (wrong)
    // compares the references of the two objects,
    // as they are on two different location in memory
    // it gives error
    // expect(result).toBe({ id: 1, price: 10 });

    // Approach 2 - toEqual (correct)
    // (checking for obj equality) only interested
    // if the objects have EXACTLEY THE SAME PROPERTIES/VALUES
    // it doesnt care where they are located in the memory.
    // expect(result).toEqual({ id: 1, price: 10 });

    // Approach 3 - toMatchObject (correct - better)
    // Same as Approach 2, but the objects MAY NOT have ALL of
    // the PROPERTIES/VALUES, but ONLY SOME of them
    expect(result).toMatchObject({ id: 1 }); // still correct!!

    // Approach 4 - toHaveProperty (correct - better)
    // Same as Approach 3 toMatchObject()
    // expect(result).toHaveProperty('id', 1); // still correct!!
});


describe('registerUser', () => {
    // falsy values are: Null, undefined, NaN, '', 0, false
    // it('if username is falsy, throw Error', () => {
    //     // 1st way of writing it
    //     // ----------------------
    //     const args = [null, undefined, NaN, '', 0, false];
    //     args.forEach((arg) => {
    //         expect(function registerUndefinedUser() {
    //             return lib.registerUser(arg);
    //         }).toThrow(); // correct
    //     });
    //  });
    // must throw Error with message as string matching exactley
    // expect(registerUndefinedUser).toThrow('Username is required.'); // correct

    // only require to throw an Error (no matching the string of the message)

    // 2nd way of writing it (its the same - callback function)
    // ----------------------
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach((arg) => {
        expect(() => lib.registerUser(arg)).toThrow();
    });

    // Some will write it(....... for every case)
    // (Single assertion principle)
    // expect(() => lib.registerUser(null).toThrow());
    // expect(() => lib.registerUser(undefined).toThrow());
    // expect(() => lib.registerUser(NaN).toThrow());
    // expect(() => lib.registerUser('').toThrow());
    // expect(() => lib.registerUser(0).toThrow());
    // expect(() => lib.registerUser(false).toThrow());


    it(`if username is valid, should return obj {
        id: new Date().getTime(),
        username: 'someUserName',}`, () => {
            const result = lib.registerUser('someUserName');
            // more specific
            // expect(result).toEqual({
            //     id: new Date().getTime(),
            //     username: 'someUserName',
            // }); // correct

            // more general
            expect(result).toMatchObject({ username: 'someUserName' });
            expect(result.id).toBeGreaterThan(0);
        });
});


// Mock functions
describe('applyDiscount', () => {
    it('should apply discount if client has more than 10 points', () => {
        db.getCustomerSync = function(customerId) {
            console.log('Fake reading customer...');
            return { id: customerId, points: 20 };
        };
        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

// Mock functions
// Approach 1
describe('notifyCustomer', () => {
    it('sending email with message: "Your order was placed successfully."', () => {
        // db.getCustomerSync = function(customerId) {
        //     console.log('Fake reading customer...');
        //     return { email: 'dummy@email.com' };
        // };
        let mailSent = false;
        mail.send = function(email, message) {
            mailSent = true;
        };
        lib.notifyCustomer({ customerId: 1 }); // mail.send is called ->
        // -> mailSent changes to true
        expect(mailSent).toBe(true);
    });
});
// Approach 2 - jest mock functions
describe('notifyCustomer', () => {
    it('sending email with message: "Your order was placed successfully."', async () => {
        // all mocks:
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
        mail.send = jest.fn();

        // calling the method on the test
        lib.notifyCustomer({ customerId: 1 });

        // making the asertion
        expect(mail.send).toHaveBeenCalled();

        // checking first passed argument (if we want to)
        expect(mail.send.mock.calls[0][0]).toBe('a');

        // checking second passed argument (if we want to)
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});
