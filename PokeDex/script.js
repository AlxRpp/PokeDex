const baseUrl = "https://pokeapi.co/api/v2/";
const limitUrl = "pokemon?limit=";
const offsetUrl = "&offset=";
let limit = 20;
let offset = 0;
let allPoke = [];
let favoredPoke = [];
let isInFavoritesView = false;




async function init() {
    currentPoke = allPoke;
    await loadAllPoke();
    renderPoke();
    showButton();
    loadFromLocalStorage();
    amountFav();
    amountFavResp();
}


async function loadAllPoke() {
    showLoadingSpinner();
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
            pushPokeToArr(pokeName, pokeUrl, pokeId, pokeImage, pokeType, pokeGif)
            //console.log(pokeName, pokeUrl);
            fetchSinglePoke(pokeUrl);
        }

    }
    catch (error) {
        console.error("das lief etwas schief");
    }

    offset = allPoke.length;
    removeLoadingSpinner();


}


function pushPokeToArr(pokeName, pokeUrl, pokeId, pokeImage, pokeType, pokeGif) {
    allPoke.push(
        {
            "Liked": false,
            "Name": pokeName,
            "URL": pokeUrl,
            "Id": pokeId,
            "Image": pokeImage,
            "Type": pokeType,
            "Gif": pokeGif
        }
    )
}

function renderPoke() {
    isInFavoritesView = false;
    let content = document.getElementById('content');
    let html = "";
    content.innerHTML = "";
    for (let pokeIndex = 0; pokeIndex < allPoke.length; pokeIndex++) {
        const pokemon = allPoke[pokeIndex];
        html += pokeCard(pokemon);
    }
    content.innerHTML += html;
    showButton();
}


async function showNextPoke() {
    closeSingleCard();
    document.getElementById('morePoke').disabled = true;
    await loadAllPoke();
    renderPoke();
    document.getElementById('morePoke').disabled = false;
}


function showLoadingSpinner() {
    document.getElementById('loadingSpinner').classList.remove('d-none');
}


function removeLoadingSpinner() {
    document.getElementById('loadingSpinner').classList.add('d-none');
}


function showButton() {
    let myPoke = currentPoke.length;
    if (myPoke > 0) {
        document.getElementById('morePoke').classList.remove('d-none');
    }
}


function filterPoke() {
    let searchField = document.getElementById('search').value.toLowerCase();
    let searchFieldResp = document.getElementById('searchResp').value.toLowerCase();
    let searchterm = searchField || searchFieldResp

    if (searchterm.length > 2) {
        let filteredPoke = allPoke.filter(poke => poke.Name.toLowerCase().includes(searchterm));
        closeSingleCard();
        document.getElementById('morePoke').classList.add('d-none');


        renderFilteredPoke(filteredPoke);
    } else {
        renderFilteredPoke(allPoke);
    }
}


function renderFilteredPoke(filteredPoke) {
    let content = document.getElementById('content');
    let html = "";
    content.innerHTML = "";
    filteredPoke.forEach(pokemon => {
        html += pokeCard(pokemon)
    });
    content.innerHTML = html;
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
        updateArray(speciesDataAsJson, singlePokeAsJson, male, female, evolutionData);
    } catch (error) {
        console.error(error, "das hat nicht geklappt");
    }
}


function updateArray(speciesDataAsJson, singlePokeAsJson, male, female, evolutionData) {
    let newData = {
        "About": {
            "Species": speciesDataAsJson.genera[7].genus.split(' ')[0],
            "Height": singlePokeAsJson.height,
            "Weight": singlePokeAsJson.weight,
            "Abilities": singlePokeAsJson.abilities.map(abilitie => abilitie.ability.name).join(' / '),
        },

        "Breeding": {
            "Male": male,
            "Female": female,
            "Growth_Rate": speciesDataAsJson.growth_rate.name,
            "Egg_Groups": speciesDataAsJson.egg_groups[0].name,
        },

        "Base Stats": {
            "name": singlePokeAsJson['stats'].map(data => data.stat.name),
            "stats": singlePokeAsJson['stats'].map(data => data.base_stat)
        },

        "Moves": singlePokeAsJson['moves'].slice(0, 10).map(move => move.move.name).join(' '),
        "Evolution_Chain": evolutionData
    }
    let pokeUpdate = allPoke.find(pokemon => pokemon.Id === singlePokeAsJson.id);
    if (pokeUpdate) {
        Object.assign(pokeUpdate, newData);
    }
}


function renderSinglePoke(id){
    let pokemon = isInFavoritesView
    ? favoredPoke.find(poke => poke.Id === id)
    :allPoke.find(poke => poke.Id === id);

    if (pokemon){
        let content = document.getElementById('singleCard');
        content.innerHTML = openSinglePoke(pokemon);
    }
    
}

// function nextFavoredPoke(currentId){
//     let currentIndex = favoredPoke.findIndex(poke => poke.Id === currentId);
//     let nextIndex = currentIndex++;
//     if (nextIndex >= favoredPoke.length) {
//         nextIndex = 0;
//     }
//     renderSinglePoke(favoredPoke[nextIndex].Id);
// }

// function previousFavoredPoke (currentId){
//     let currentIndex = favoredPoke.findIndex(poke => poke.Id === currentId);
//     let prevIndex = currentIndex--;
//     if (prevIndex < 0) {
//         prevIndex = favoredPoke.length -1;
//     }
//     renderSinglePoke(favoredPoke[prevIndex].Id)
// }


// function renderSinglePoke(id) {
//     let pokemon = allPoke.find(poke => poke.Id === id);
//     if (pokemon) {
//         let content = document.getElementById('singleCard');
//         content.innerHTML = openSinglePoke(pokemon);
//     }
// }

function closeSingleCard() {
    document.getElementById('singleCard').innerHTML = ""
    let backGround = document.getElementById('singleCard').classList.add('d-none');
    enableScrolling();
}


function nextPoke(currentId) {
    let currentIndex = isInFavoritesView
        ? favoredPoke.findIndex(poke => poke.Id === currentId)
        : allPoke.findIndex(poke => poke.Id === currentId);

    let nextIndex = currentIndex + 1;

    // Wenn wir am Ende der Liste sind, zurück zum Anfang
    if (isInFavoritesView) {
        if (nextIndex >= favoredPoke.length) {
            nextIndex = 0;
        }
        renderSinglePoke(favoredPoke[nextIndex].Id);
    } else {
        if (nextIndex >= allPoke.length) {
            nextIndex = 0;
        }
        renderSinglePoke(allPoke[nextIndex].Id);
    }
}


function previousPoke(currentId) {
    let currentIndex = isInFavoritesView
        ? favoredPoke.findIndex(poke => poke.Id === currentId)
        : allPoke.findIndex(poke => poke.Id === currentId);

    let prevIndex = currentIndex - 1;

    // Wenn wir am Anfang der Liste sind, zum Ende springen
    if (isInFavoritesView) {
        if (prevIndex < 0) {
            prevIndex = favoredPoke.length - 1;
        }
        renderSinglePoke(favoredPoke[prevIndex].Id);
    } else {
        if (prevIndex < 0) {
            prevIndex = allPoke.length - 1;
        }
        renderSinglePoke(allPoke[prevIndex].Id);
    }
}


function openSettings() {
    document.getElementById('settings').classList.toggle('settings-closed')
}


function changeSettings() {
    let newsetting = document.getElementById('setting').value;
    newsetting = +newsetting;
    if (newsetting >= 1 && newsetting <= 100) {
        limit = newsetting;
        openSettings();
        document.getElementById('setting').value = "";
        showNextPoke();
    }
    else {
        alert("Please enter a number between 1 and 100")
    }
}

function changeSettingsResp(){
    let settingsResp = document.getElementById('settingResp').value;
    settingsResp = +settingsResp
    if (settingsResp >= 1 && settingsResp <= 100) {
        limit = settingsResp;
        openSettings();
        document.getElementById('settingResp').value = "";
        showNextPoke();
    }
    else {
        alert("Please enter a number between 1 and 100")
    }
}


function saveFavoritPoke(ID) {
    let favoritPoke = [...allPoke, ...favoredPoke].find(poke => poke.Id === ID);
    if (favoritPoke) {
        if (favoritPoke.Liked) {
            if (!favoredPoke.some(poke => poke.Id === favoritPoke.ID)) {
                favoredPoke.push(favoritPoke);
                console.log("Pokemon zu den Favoriten hinzugefügt");
            }
        } else {
            favoredPoke = favoredPoke.filter(poke => poke.Id !== favoritPoke.Id);
            console.log("Pokemon aus der Favoriten-Liste entfernt");
        }
    }
    saveToLocalStorage();
    amountFav();
    amountFavResp();
}


function renderFavoreds() {
    isInFavoritesView = true;
    if (favoredPoke.length > 0) {
        let content = document.getElementById('content');
        let html = "";
        content.innerHTML = "";
        favoredPoke.forEach(pokemon => {
            html += pokeCard(pokemon)
        });
        content.innerHTML = html;
        closeSingleCard();
        document.getElementById('morePoke').classList.add('d-none');
    } else {
        renderPoke();
    }
    closeSingleCard();
}


function amountFav() {
    loadFromLocalStorage()
    let amount = document.getElementById('amountFav');
    if (favoredPoke.length > 0) {
        amount.innerText = favoredPoke.length;
    } else {
        amount.innerText = "";
    }
}

function amountFavResp() {
    loadFromLocalStorage()
    let amount = document.getElementById('amountFavResp');
    if (favoredPoke.length > 0) {
        amount.innerText = favoredPoke.length;
    } else {
        amount.innerText = "";
    }
}


function saveToLocalStorage() {
    let favoredsAsText = JSON.stringify(favoredPoke);
    localStorage.setItem('pokemon', favoredsAsText);
}


function loadFromLocalStorage() {
    let favoredsAsText = localStorage.getItem('pokemon')
    if (favoredsAsText) {
        favoredPoke = JSON.parse(favoredsAsText);

        // let exitsInAllPoke = allPoke.some(pokemon => pokemon.Id === favoredPoke.Id);
        // if (!exitsInAllPoke) {
        //     allPoke.push(favoredPoke);
        // }

        allPoke.forEach(pokemon => {
            pokemon.Liked = favoredPoke.some(favPoke => favPoke.Id === pokemon.Id)
        });
    }
}

function toggleRespMenu(){
    document.getElementById('toggleRespMenu').classList.toggle('Resp-Icons-Closed');
}


function line1 (){
    document.getElementById('line1').classList.toggle('top-closed');
}


 function line2(){
    document.getElementById('line2').classList.toggle('mid-closed');
 }


 function line3(){
    document.getElementById('line3').classList.toggle('bot-closed');
 }

  function openSettingsResp(){
        document.getElementById('settingsResp').classList.toggle('settings-closed-resp');
  }

  function openSearchResp() {
    document.getElementById('searchsResp').classList.toggle('search-closed');

  }