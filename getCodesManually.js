import  {fetchcodes} from "./dynamodb.js";

/* Small Script that will fetch codes from the database and mark them as consumed */
(async () => {
    //let codes = await fetchcodes(12,"myself","5hour2xp10codes")
    let codes = await fetchcodes(1,"myself","codes")
    for(let x = 0; x < codes.codes.length; x++){
      // console.log(`${x+1}. ${codes.codes[x].toString().replace(/-/g,"")} ${codes.links[x].toString()}`);
       console.log(`${x+1}. ${codes.codes[x].toString().replace(/-/g,"-")}`);
       console.log(`${codes.codes[x].toString().replace(/-/g,"-")}`);
        //console.log(`${codes.codes[x].toString().replace(/-/g,"-")}`);
    }
})();


// weaponsXPCANADA
//law
//kyle
//5hour2xp10codes
//jacklinks
//halo_spnkr-new
//halo_hydra-new
//halo_razerback-new

//vk78-new <-- halo



