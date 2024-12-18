//-----------------return templates----------

function pokeCard(pokeIndex) {
    let firstType = pokeIndex.Type.split(' ')[0];
    let secondType = pokeIndex.Type.split(' ')[1];
    let firstIcon = `<img src="./assests/icons/${firstType}.svg">`;
    let secondIcon = secondType ? `<img src="./assests/icons/${secondType}.svg">` : '';
    return `
    <div class="Poke-Card" id="${pokeIndex.Id}" onclick="renderSinglePoke(${pokeIndex.Id})">
            <div class="Card-Header">
                <p class="title"> <b> ${pokeIndex.Name}</b><br> 
                #${showCorrectId(pokeIndex.Id)}</p> 
                <span></span>
            </div>
            <div class="Card-IMG ${pokeIndex.Type}">
                 <img src="${pokeIndex.Image}">
            </div>
            <div class="Card-Details">
                <h4>Type(s):</h4>
                <div class="Icon-Section">
                    ${firstIcon} <span class="Type">${firstType}</span>
                </div>
                <div class="Icon-Section">
                    ${secondIcon} <span class="Type">${secondType || ""}</span> 
                </div>
            </div>
        </div>
    `;
}


function openSinglePoke(pokemon) {
    document.getElementById('singleCard').classList.remove('d-none');
    let firstType = pokemon.Type.split(' ')[0];
    let secondType = pokemon.Type.split(' ')[1];
    setTimeout(() => { getActive(pokemon) }, 1000)
    stopScrolling();

    return `
    <div onclick="event.stopPropagation() " class="Single-Poke-Card ${pokemon.Type} ${firstType}-shadow" id="bigPoke">
            <div class="Head-Icon">
                <div onclick="closeSingleCard()"><img src="./assests/arrowLeft.png"></div>
                <div onclick="toggleHeart(${pokemon.Id})"><img src="${changeHeart(pokemon)}" alt="" srcset=""></div>
            </div>
            <div class="Head-Infos">
                <div class="Head-Left">
                    <h1 class="title">${pokemon.Name}</h1>
                        <div class="Types">
                            <p class="Type-Border title">${firstType}</p>
                            <p class="Type-Border title">${secondType || ""}</p>
                        </div>
                </div>
                <div class="Head-Right">
                    <span>#${showCorrectId(pokemon.Id)}</span>
                </div>
            </div>
            <div class="Poke-Img">
                <img src="${switchImages(pokemon)}">
            </div>
            <div class="arrows">
            <img onclick="nextPoke(${pokemon.Id})" class="doubleArrow" src="./assests/doubleArrow.png">
            <img onclick="previousPoke(${pokemon.Id})" class="doubleArrowLeft" src="./assests/doubleArrow.png">
            </div>
            <div class="More-Information">
                <div class="Categorys">
                    <span class="active ${firstType}-shadow" onclick="renderSinglePoke(${pokemon.Id})">About</span>
                    <span onclick='switchStats(${JSON.stringify(pokemon)})'>Base Stats</span>
                    <span onclick="insertMoves(${pokemon.Id})">Moves</span>
                    <span onclick="getEvolution(${pokemon.Id})">Evolution</span>
                </div>
                <div class="divider"></div>
                <div class="About" id="insertData">
                    
                    <div class="Pokemon-Info">
                        <span class="Info-Left">Species</span>
                        <span>${pokemon.About.Species}</span>
                    </div>

                    <div class="Pokemon-Info">
                        <span class="Info-Left">Abilities</span>
                        <span class="title">${pokemon.About.Abilities}</span>
                    </div>
                        
                    <div class="Pokemon-Info">
                        <span class="Info-Left">Height</span>
                        <span>${calculateHeight(pokemon)}</span>
                    </div>
                        
                    <div class="Pokemon-Info">
                        <span class="Info-Left">Weight</span>
                        <span>${calculateWeight(pokemon)}</span>
                    </div>  

                    <div class="Pokemon-Info">
                        <p class="Bree">Breeding</p>
                    </div>

                    <div class="Pokemon-Info">
                        <span class="Info-Left">Gender</span>
                          <div class="gender">
                            <img src="./assests/male.png" alt=""> ${pokemon.Breeding.Male} %
                            <img src="./assests/female.png" alt=""> ${pokemon.Breeding.Female} %
                        </div>
                    </div>

                    <div class="Pokemon-Info">
                        <span class="Info-Left">Grow Rate</span>
                        <span class="title">${pokemon.Breeding.Growth_Rate}</span>


                    </div>

                    <div class="Pokemon-Info">
                        <span class="Info-Left">Egg Groups</span>
                        <span class="title">${pokemon.Breeding.Egg_Groups}</span>

                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}


function returnStats(statName, statValue) {
    return `
        <div class="Stat-Mobile">
            <p class="Info-Left Stat-Name">${statName}</p>
            <p class="Stat-Value">${statValue}</p>
            <div class="Progress-Bar">
                <div class="stat-fill ${statValue > 50 ? 'green' : 'red'}" style="width: ${statValue}%"></div>
            </div>
        </div>`;
}


//--------------- helper function´s for the return templates--------------------

function showCorrectId(id) {
    return id.toString().padStart(3, '0');
}


function getActive(pokemon) {
    let firstType = pokemon.Type.split(' ')[0];
    let color = firstType + "-shadow"
    let categoryContainers = document.querySelectorAll('.Categorys');
    categoryContainers.forEach(categoryContainer => {
        categoryContainer.addEventListener('click', function (event) {
            if (event.target.tagName === 'SPAN') {
                const spans = categoryContainer.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
                event.target.classList.add('active');
                event.target.classList.add(color);
            }
        });
    });
}


function toggleHeart(id) {
    let pokemon = [...allPoke, ...favoredPoke].find(poke => poke.Id === id);
    if (pokemon) {
        pokemon.Liked = !pokemon.Liked;
        saveFavoritPoke(pokemon.Id);
        renderSinglePoke(id)
    }
    if (isInFavoritesView) {
        renderFavoreds();
    }
    if (favoredPoke.length <= 0) {
        renderPoke()
    }
    amountFav();
    amountFavResp();
}


function changeHeart(pokemon) {
    if (!pokemon.Liked) {
        return `
        ./assests/heart.png
        `;
    } else {
        return `
        ./assests/heartWhite.png
        `;
    }
}


function switchImages(pokemon) {
    let size = window.innerWidth;
    if (size < 500) {
        return pokemon.Gif
    } else {
        return pokemon.Image
    }
}


function switchStats(pokemon) {
    let size = window.innerWidth;
    let baseStatsNames = pokemon["Base Stats"].name;
    let baseStatsValues = pokemon["Base Stats"].stats;
    if (size > 500) {
        renderPolarChart(baseStatsNames, baseStatsValues);
    } else {
        renderStatsBar(pokemon);
    }
}


function renderStatsBar(pokemon) {
    let content = document.getElementById('insertData');
    content.innerHTML = '';
    let baseStatsNames = pokemon["Base Stats"].name;
    let baseStatsValues = pokemon["Base Stats"].stats;
    let htmlContent = ""
    for (let i = 0; i < baseStatsNames.length; i++) {
        let statName = baseStatsNames[i];
        let statValue = baseStatsValues[i]
        htmlContent += returnStats(statName, statValue)
    }
        content.innerHTML = htmlContent;
        return content
}


function calculateHeight(pokemon) {
    let heightDM = pokemon.About.Height;
    let getMeter = +heightDM / 10;
    let getInchTotal = +heightDM * 10 * 0.393701;
    let inches = getInchTotal
    let feet = Math.floor(inches / 12);
    inches = inches / 12;
    inches = inches.toFixed(1)
    return (feet + "' " + inches + '" ' + " (" + getMeter + "  meter" + ")")
}


function calculateWeight(pokemon) {
    let weightHG = pokemon.About.Weight;
    let weightLBS = +weightHG / 4.53592;
    weightLBS = weightLBS.toFixed(2);
    let weightKG = +weightHG / 10;
    return (weightLBS + " lbs" + "  (" + weightKG + " kg" + ")")
}


function insertMoves(pokemonID) {
    let selectedPoke = [...allPoke, ...favoredPoke].find(poke => poke.Id === pokemonID);
    if (!selectedPoke) {
        console.error("Pokemon Id was not found!");
        return;
    }
    let moves = document.getElementById('insertData');
    moves.classList.remove('flex-row');
    moves.classList.remove('noGap');
    moves.innerHTML = "";
    let moveslist = selectedPoke.Moves.split(' ');
    for (let index = 0; index < moveslist.length; index++) {
        const move = moveslist[index];
        moves.innerHTML += `
        <div>
            <ul>
                <li class="title">${move}</li>
            </ul>
        </div>
        `;
    }
}


async function getEvolution(pokemonID) {
    let selectedPoke = [...allPoke, ...favoredPoke].find(poke => poke.Id === pokemonID);
    if (!selectedPoke || !selectedPoke.Evolution_Chain) {
        console.error("Pokemon ID oder Evolution Chain wurde nicht gefunden!");
        return;
    }

    let evolutionChain = selectedPoke.Evolution_Chain.chain;
    if (!evolutionChain) {
        console.error("Evolution Chain ist nicht vorhanden!");
        return;
    }

    let content = document.getElementById('insertData')
    content.innerHTML = "";
    content.classList.add('flex-row');
    content.classList.add('noGap');

    let htmlContent = "";

    let currentStage = evolutionChain;
    let imageCounter = 0;
    while (currentStage) {
        let stageId = extractIdFromUrl(currentStage.species.url);
        let pokeData = [...allPoke, ...favoredPoke].find(poke => poke.Id == stageId);

        if (!pokeData) {
            pokeData = await (fetchPokebyId(stageId));
        }

        if (pokeData && pokeData.Id) {
            if (imageCounter > 0) {
                htmlContent += `
                      <img class="arrow${imageCounter}" src="./assests/doubleArrow.png">
                    `;
            }
            htmlContent += `
            <div class="evolution${imageCounter}">
            <img src="${pokeData.Image}" class="evolution-image">
            <p class="title small-FS">${pokeData.Name}</p>
            </div>
            `;
            imageCounter++;
        }
        currentStage = currentStage.evolves_to[0];
        content.innerHTML = htmlContent;
    }
}


function extractIdFromUrl(url) {
    let parts = url.split('/');
    return +parts[parts.length - 2];
}


function renderPolarChart(labels, data) {
    const container = document.getElementById('insertData');
    container.innerHTML = ''; // Vorherigen Inhalt entfernen
    const canvas = document.createElement('canvas');
    canvas.id = 'polarChart';
    container.appendChild(canvas);
    new Chart(canvas, {
        type: 'polarArea',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            animation: {
                animateScale: true
            },
            scales: {
                r: {
                    max: 100,
                    ticks: {
                        display: true // Zeigt Werte um den Kreis herum an
                    },
                    pointLabels: {
                        display: false, // Zeigt die Labels an den Achsen an
                        font: {
                            size: 8 // Anpassung der Schriftgröße
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom', // Legt die Legende neben dem Chart an
                    labels: {
                        font: {
                            size: 12 // Anpassung der Schriftgröße für die Labels
                        }
                    }
                }
            }
        }
    });
}