class Stack {
    constructor() {
       this.top = -1;
       this.items = {};
    }
    push(value){
        this.top += 1;
        this.items[this.top] = value;
    }

    popoff(){
        this.top -= 1;
        return this.items[this.top + 1];
    }
};
var Account = require("../Account.js");

describe('my stack', () => {
    let Account;
    beforeEach(() => {
        Account = new Stack();
    })
    it('is created empty', () =>{
        expect(Account.top).toEqual(-1)
        expect(Account.items).toEqual({})
    });

    it('can push to the top', () => {
        Account.push('emoji');
        expect(Account.top).toEqual(0)
    });

    it('can popoff the top value', () => {
        Account.push('emoji');
        let value = Account.popoff();
        expect(value).toEqual("emoji");
        expect(Account.top).toEqual(-1)
    })
})