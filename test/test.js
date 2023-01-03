var Account = require("../Account.ts");
var Order = require("../Order.ts");
var tariqazmatdev = require("../data.json");

describe('Account Class', () => {
    beforeEach(() => {
    })
    it('Account name should equal "Tariq"', () =>{
        const account  = new Account([],"Tariq","hi");
        expect(account.name).toEqual("Tariq");

    });

    it('Can push a value to listings with correct Shape', () => {
        const account  = new Account([],"Tariq","hi");
        expect(account.listings).toEqual([])
        expect(account.addlisting({
            BOGO: false,
            id: 101,
            DBtable:"human-sesame"
        })).toEqual([{
            BOGO: false,
            id: 101,
            DBtable:"human-sesame"
        }])
    });

    it('Sending Orders should work', async () => {
        const account  = new Account([],"Tariq",tariqazmatdev);
      //  console.log(tariqazmatdev);
        await account.api.sell.fulfillment.getOrders({}).then(x => {
            console.log(x)
        }).catch(e => {
            console.log(e);
        });
        //    Account.push('emoji');
       // let value = Account.popoff();
  //      expect(value).toEqual("emoji");
   //     expect(Account.top).toEqual(-1)
    })


})

describe('Testing the Order Class', () => {
    it('hello', () => {
        console.log("hello world");
    })

    it('checklistings should return the default value', async () => {
        const account  = new Account([],"Tariq",tariqazmatdev);
        const order = new Order(account.api, [], "null");

        const value = order.checkListings({lineItems:[{legacyItemID:"275586756168"}]})
        expect(value).toEqual(order.DEFAULT_LISTING)
    });

    it('this.DEFAULT_LISTINGS.quantityMultiplier should return 1', async () => {
        const account  = new Account([],"Tariq",tariqazmatdev);
        const order = new Order(account.api, [], "null");

        const value = order.checkListings({lineItems:[{legacyItemID:"275586756168"}]})
        expect(order.DEFAULT_LISTING.quantityMultiplier).toEqual(1)
    });

    it('this.DEFAULT_LISTINGS.TABLE should return DB CODES', async () => {
        const account  = new Account([],"Tariq",tariqazmatdev);
        const order = new Order(account.api, [], "null");

        const value = order.checkListings({lineItems:[{legacyItemID:"275586756168"}]})
        expect(order.DEFAULT_LISTING.DBtable).toEqual("codes")
    });


    it('Checklistings should return the expected Listing', async () => {
        const account  = new Account([],"Tariq",tariqazmatdev);

        const obj = {
            quantityMultiplier: 1,
            legacyItemId: 275586756168,
            DBtable:"codes"
        }
        account.listings.push(obj);
        const order = new Order(account.api, account.listings, "null");

        const value = order.checkListings({lineItems:[{legacyItemID:"275586756168"}]})
        expect(value.legacyItemID).toEqual(account.listings[0].legacyItemID)
    });

});

// describe("send alert test", () => {
//     it("should send an alert",() => {
//         const account  = new Account([],"Tariq",tariqazmatdev);
//         account.sendAlert("hello world");
//     });
// });
//



