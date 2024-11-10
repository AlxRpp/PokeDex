//---------------functions to push in array´s--------------------

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


//-------------- helper function´s -----------

function closeSingleCard() {
    document.getElementById('singleCard').innerHTML = ""
    let backGround = document.getElementById('singleCard').classList.add('d-none');
    enableScrolling();
}


function showLoadingSpinner() {
    stopScrolling()
    document.getElementById('loadingSpinner').classList.remove('d-none');
}


function removeLoadingSpinner() {
    enableScrolling()
    document.getElementById('loadingSpinner').classList.add('d-none');
}


async function showNextPoke() {
    closeSingleCard();
    document.getElementById('morePoke').disabled = true;
    await loadAllPoke();
    renderPoke();
    document.getElementById('morePoke').disabled = false;
}


function showButton() {
    let myPoke = currentPoke.length;
    if (myPoke > 0) {
        document.getElementById('morePoke').classList.remove('d-none');
    }
}


function stopScrolling() {
    document.getElementById('body').classList.add('of-hidden');
}


function enableScrolling() {
    document.getElementById('body').classList.remove('of-hidden');
}