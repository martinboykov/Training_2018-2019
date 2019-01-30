// PRIVACY FAILURS
console.log('////// PRIVACY FAILURS ////');


function Gadget1() {
    // private member
    let specs1 = {
        screen_width: 320,
        screen_height: 480,
        color: "white"
    };
    // public function
    this.getSpecs = function() {
        // let specToShow = {
        //     screen_width: specs.screen_width,
        //     screen_height: specs.screen_height,
        //     color: specs.color,
        // }
        // return specToShow;
        return specs1;
    };
}
let toy1 = new Gadget1();
let specs1 = toy1.getSpecs();
console.log(toy1.getSpecs());
specs1.color = 'blue';
console.log(toy1.getSpecs());
console.log();


// PROTOTYPES AND PRIVACY
console.log('////// PROTOTYPES AND PRIVACY ////');

function Gadget() {
    // private member
    const name = {
        first: 'i',
        last: 'Pod',
    };
    // public function
    this.getName = function() {
        return name;
    };
}
Gadget.prototype = (function() {
    // private member
    const browser = "Mobile Webkit";
    // public prototype members

    return {
        getBrowser: function() {
            return browser;
        },
    };
}());
const toy = new Gadget();
console.log(toy.getName()); // privileged "own" method
console.log(toy.getBrowser()); // privileged prototype method

let specs = toy.getName();
console.log(toy.getName());
specs.first = 'Huwawei';
specs.last = 'Honor';
console.log(toy.getName());
console.log();

// REVEALING PRIVATE FUNCTIONS AS PUBLIC METHODS
console.log('////// REVEALING PRIVATE FUNCTIONS AS PUBLIC METHODS ////');

let myarray;
(function() {
    let astr = "[object Array]";
    let toString = Object.prototype.toString;
    function isArray(a) {
        return toString.call(a) === astr;
    }
    function indexOf(haystack, needle) {
        let i = 0;
        let max = haystack.length;
        for (; i < max; i += 1) {
            if (haystack[i] === needle) {
                return i;
            }
        }
        return -1;
    }
    myarray = {
        isArray: isArray,
        indexOf: indexOf,
        inArray: indexOf,
    };
}());
console.log(myarray);

console.log(myarray.isArray([1, 2])); // true);
console.log(myarray.isArray({ 0: 1 })); // false);
console.log(myarray.indexOf(["a", "b", "z"], "a")); // 2);
console.log(myarray.inArray(["a", "b", "z"], "b")); // 2);

console.log();
console.log();

function Sale(price) {
    this.price = price || 100;
}
Sale.prototype.getPrice = function() {
    return this.price;
};

Sale.decorators = {};

Sale.decorators.fedtax = {
    getPrice: function() {
        var price = this.uber.getPrice();
        price += price * 5 / 100;
        return price;
    }
};

Sale.decorators.quebec = {
    getPrice: function() {
        var price = this.uber.getPrice();
        price += price * 7.5 / 100;
        return price;
    }
};
Sale.decorators.money = {
    getPrice: function() {
        return "$" + this.uber.getPrice().toFixed(2);
    }
};

Sale.decorators.cdn = {
    getPrice: function() {
        return "CDN$ " + this.uber.getPrice().toFixed(2);
    }
};

Sale.prototype.decorate = function(decorator) {
    var F = function() { },
        overrides = this.constructor.decorators[decorator],
        i, newobj;
    F.prototype = this;
    newobj = new F();
    newobj.uber = F.prototype;
    for (i in overrides) {
        if (overrides.hasOwnProperty(i)) {
            newobj[i] = overrides[i];
        }
    }
    return newobj;
};