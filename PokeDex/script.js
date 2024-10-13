const baseUrl = "https://pokeapi.co/api/v2/";
const limitUrl = "pokemon?limit=";
let limit = 20;
const offsetUrl = "&offset=";
let offset = 0;

let allPoke = [];
let currentPoke = allPoke;


 async function init() {
   await loadAllPoke();
    renderPoke();
}


async function loadAllPoke() {
    let response = await fetch(baseUrl + limitUrl + limit + offsetUrl + offset);
    let responseAsJson = await response.json()
    // console.log(responseAsJson);
    
    for (let index = 0; index < responseAsJson.results.length; index++) {
        const pokeName = responseAsJson.results[index].name;
        const pokeUrl = responseAsJson.results[index].url;
        let detailResponse = await fetch(pokeUrl);
        let pokeDetails = await detailResponse.json();
        let pokeImage = pokeDetails.sprites.other.dream_world.front_default;
        let pokeType = pokeDetails.types.map(typeInfo => typeInfo.type.name)
        let pokeId = pokeDetails.id
        allPoke.push(
            {
                "Name":pokeName,
                "URL":pokeUrl,
                "Id":pokeId,
                "Image":pokeImage,
                "Type":pokeType
            }
        )
        console.log(pokeName, pokeUrl);
    }
}

function renderPoke(){
    let content = document.getElementById('content');
    content.innerHTML = "";

    for (let pokeIndex = 0; pokeIndex < allPoke.length; pokeIndex++) {
        const pokemon = allPoke[pokeIndex];
        const id = pokeIndex +1
         content.innerHTML += pokeCard(pokemon, id);

    }
}

  
