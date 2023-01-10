const {fetchcodes} = require("./dynamodb.js");

/* Small Script that will fetch codes from the database and mark them as consumed */
(async () => {
    codes = await fetchcodes(4,"Myself", "codes")
    for(let x = 0; x < codes.codes.length; x++){
        console.log(`${x}. ${codes.codes[x].toString().replace(/-/g,"")},${codes.links[x]}`);
    }
})();
