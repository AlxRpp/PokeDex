const baseUrl = "https://pokeapi.co/api/v2/";
const limitUrl = "pokemon?limit=";
const offsetUrl = "&offset=";
let limit = 20;
let offset = 0;
let allPoke = [];
let favoredPoke = [];
let isInFavoritesView = false;


//------------------- HTML-Body onloadFunction-------------------------

async function init() {
    currentPoke = allPoke;
    await loadAllPoke();
    renderPoke(); // -> script.js:94
    showButton(); // -> helper.js:76
    loadFromLocalStorage(); // -> script.js:273
    amountFav(); // -> script.js:237
    amountFavResp(); // -> responsive.js:57
}


//------------------- function´s to load Data from the PokeAPI-----------------------

async function loadAllPoke() {
    showLoadingSpinner(); // -> helper.js:55
    try {
        let response = await fetch(baseUrl + limitUrl + limit + offsetUrl + offset);
        let responseAsJson = await response.json()
        for (let index = 0; index < responseAsJson.results.length; index++) {
            const pokeName = responseAsJson.results[index].name;
            const pokeUrl = responseAsJson.results[index].url;
            let detailResponse = await fetch(pokeUrl);
            let pokeDetails = await detailResponse.json();
            let pokeImage = pokeDetails.sprites.other['official-artwork'].front_default;
            let pokeGif = pokeDetails.sprites.other.showdown.front_default;
            let pokeType = pokeDetails.types.map(typeInfo => typeInfo.type.name).join(' ');
            let pokeId = pokeDetails.id
            pushPokeToArr(pokeName, pokeUrl, pokeId, pokeImage, pokeType, pokeGif) // -> helper.js:3
            fetchSinglePoke(pokeUrl); // -> script.js:52
        }
    }
    catch (error) {
        console.error("das lief etwas schief");
    }
    offset = allPoke.length;
    removeLoadingSpinner(); // -> helper.js:61
}


async function fetchSinglePoke(url) {
    try {
        let singlePoke = await fetch(url);
        let singlePokeAsJson = await singlePoke.json();
        let speciesURL = singlePokeAsJson.species.url;
        let speciesData = await fetch(speciesURL);
        let speciesDataAsJson = await speciesData.json()
        let genderRate = speciesDataAsJson.gender_rate
        let female = (genderRate / 8) * 100
        let male = 100 - female
        let evolutionUrl = speciesDataAsJson.evolution_chain.url;
        let evolution = await fetch(evolutionUrl);
        let evolutionData = await evolution.json();
        updateArray(speciesDataAsJson, singlePokeAsJson, male, female, evolutionData); // -> helper.js:18
    } catch (error) {
        console.error(error, "das hat nicht geklappt");
    }
}


async function fetchPokebyId(pokemonID) {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
        if (!response.ok) {
            throw new Error("Fehler beim Laden des Pokemons");
        }
        let data = await response.json();
        console.log(data);

        return {
            "Id": data.id,
            "Name": data.name,
            "Image": data.sprites.other.dream_world.front_default
        }
    } catch (error) {
        console.error(error);
    }
}


//--------------------function´s to render--------------------

function renderPoke() {
    isInFavoritesView = false;
    let content = document.getElementById('content');
    let html = "";
    content.innerHTML = "";
    for (let pokeIndex = 0; pokeIndex < allPoke.length; pokeIndex++) {
        const pokemon = allPoke[pokeIndex];
        html += pokeCard(pokemon); // -> htmlTemplate.js:3
    }
    content.innerHTML += html;
    showButton(); // -> helper.js:76
    document.getElementById('startPoke').classList.add('d-none');
}


function renderSinglePoke(id) {
    let pokemon = isInFavoritesView
        ? favoredPoke.find(poke => poke.Id === id)
        : allPoke.find(poke => poke.Id === id);

    if (pokemon) {
        let content = document.getElementById('singleCard');
        content.innerHTML = openSinglePoke(pokemon); // -> htmlTemplate.js:32
    }
}


function renderFilteredPoke(filteredPoke) {
    let content = document.getElementById('content');
    let html = "";
    content.innerHTML = "";
    filteredPoke.forEach(pokemon => {
        html += pokeCard(pokemon) // -> htmlTemplate.js:3
    });
    content.innerHTML = html;
}


function renderFavoreds() {
    isInFavoritesView = true;
    if (favoredPoke.length > 0) {
        let content = document.getElementById('content');
        let html = "";
        content.innerHTML = "";
        favoredPoke.forEach(pokemon => {
            html += pokeCard(pokemon) // -> htmlTemplate.js:3
        });
        content.innerHTML = html;
        closeSingleCard(); // -> helper.js:48
        document.getElementById('morePoke').classList.add('d-none');
        document.getElementById('startPoke').classList.remove('d-none');
    } else {
        renderPoke(); // -> script.js:94
    }
    closeSingleCard(); // -> helper.js:48
}


//--------------filter Pokemon----------------

function filterPoke() {
    let searchField = document.getElementById('search').value.toLowerCase();
    let searchFieldResp = document.getElementById('searchResp').value.toLowerCase();
    let searchterm = searchField || searchFieldResp

    if (searchterm.length > 2) {
        let filteredPoke = allPoke.filter(poke => poke.Name.toLowerCase().includes(searchterm));
        closeSingleCard(); // -> helper.js:48
        document.getElementById('morePoke').classList.add('d-none');


        renderFilteredPoke(filteredPoke); // -> script.js:121
    } else {
        renderFilteredPoke(allPoke); // -> script.js:121
    }
}


//---------------- navigate to next/previous Poke-------------

function nextPoke(currentId) {
    let currentIndex = isInFavoritesView
        ? favoredPoke.findIndex(poke => poke.Id === currentId)
        : allPoke.findIndex(poke => poke.Id === currentId);

    let nextIndex = currentIndex + 1;
    if (isInFavoritesView) {
        if (nextIndex >= favoredPoke.length) {
            nextIndex = 0;
        }
        renderSinglePoke(favoredPoke[nextIndex].Id);
    } else {
        if (nextIndex >= allPoke.length) {
            nextIndex = 0;
        }
        renderSinglePoke(allPoke[nextIndex].Id); // -> script.js:109
    }
}


function previousPoke(currentId) {
    let currentIndex = isInFavoritesView
        ? favoredPoke.findIndex(poke => poke.Id === currentId)
        : allPoke.findIndex(poke => poke.Id === currentId);

    let prevIndex = currentIndex - 1;

    if (isInFavoritesView) {
        if (prevIndex < 0) {
            prevIndex = favoredPoke.length - 1;
        }
        renderSinglePoke(favoredPoke[prevIndex].Id); // -> script.js:109
    } else {
        if (prevIndex < 0) {
            prevIndex = allPoke.length - 1;
        }
        renderSinglePoke(allPoke[prevIndex].Id); // -> script.js:109
    }
}


//--------------header settings & favoreds----------

function openSettings() {
    document.getElementById('settings').classList.toggle('settings-closed')
}


function changeSettings() {
    let newsetting = document.getElementById('setting').value;
    newsetting = +newsetting;
    if (newsetting >= 1 && newsetting <= 100) {
        limit = newsetting;
        openSettings(); // -> script.js:217
        document.getElementById('setting').value = "";
        showNextPoke(); // -> helper.js:67
    }
    else {
        alert("Please enter a number between 1 and 100")
    }
}


function amountFav() {
    loadFromLocalStorage() // -> script.js:273
    let amount = document.getElementById('amountFav');
    if (favoredPoke.length > 0) {
        amount.innerText = favoredPoke.length;
    } else {
        amount.innerText = "";
    }
}


//---------------save/load to/from LocalStorage-------------

function saveFavoritPoke(ID) {
    let favoritPoke = [...allPoke, ...favoredPoke].find(poke => poke.Id === ID);
    if (favoritPoke) {
        if (favoritPoke.Liked) {
            if (!favoredPoke.some(poke => poke.Id === favoritPoke.ID)) {
                favoredPoke.push(favoritPoke);
            }
        } else {
            favoredPoke = favoredPoke.filter(poke => poke.Id !== favoritPoke.Id);
        }
    }
    saveToLocalStorage();
    amountFav(); // -> script.js:237
    amountFavResp(); // -> responsive.js:56
}


function saveToLocalStorage() {
    let favoredsAsText = JSON.stringify(favoredPoke);
    localStorage.setItem('pokemon', favoredsAsText);
}


function loadFromLocalStorage() {
    let favoredsAsText = localStorage.getItem('pokemon')
    if (favoredsAsText) {
        favoredPoke = JSON.parse(favoredsAsText);
        allPoke.forEach(pokemon => {
            pokemon.Liked = favoredPoke.some(favPoke => favPoke.Id === pokemon.Id)
        });
    }
}