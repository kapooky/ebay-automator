import  {fetchcodes} from "./dynamodb.js";
// 2376-7H4C-N2B7 <--- UNUSED ENDOWMENT PSN CODE! Remove if used.
/* Small Script that will fetch codes from the database and mark them as consumed */
(async () => {
    //let codes = await fetchcodes(12,"myself","5hour2xp10codes")

    let codes = await fetchcodes(1,"myself","midnight");
    for(let x = 0; x < codes.codes.length; x++){
        // console.log(`${x+1}. ${codes.codes[x].toString().replace(/-/g,"")} ${codes.links[x].toString()}`);
        //console.log(`${codes.codes[x].toString().replace(/-/g,"-")}`);
        let username = codes.codes[x].substring(0,codes.codes[x].indexOf(':'))
        console.log(`Please watch the video and then follow the instructions: <br> Video: https://streamable.com/9021a9 <br> -> Login: ${username} <br> -> Password: YouAreAwesomeYesYou123452!@# <br> -> Email Verification: https://www.1secmail.com/?login=${username}&amp;domain=qiott.com <br> It can take 24-48 hours to redeem the drop, if you do not receive it by then, then please contact me.`);

        //console.log(`${x+1}. ${codes.codes[x].toString().replace(/-/g,"-")}`);
        //console.log(`${codes.codes[x].toString().replace(/-/g,"-")}`);
        //console.log(`${codes.codes[x].toString().replace(/-/g,"-")}`);
    }
})();
