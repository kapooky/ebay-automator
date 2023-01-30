import  {fetchcodes} from "./dynamodb.js";

/* Small Script that will fetch codes from the database and mark them as consumed */
(async () => {
    let codes = await fetchcodes(1,"Myself", "law")
    for(let x = 1; x <= codes.codes.length; x++){
        console.log(`${x}. ${codes.codes[x].toString().replace(/-/g,"")},${codes.links[x]}`);
    }
})();


// weaponsXPCANADA
//law



