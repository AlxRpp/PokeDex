function pokeCard(pokeIndex, id){
    return `
    <div class="Poke-Card " id="${id}">
            <div class="Card-Header">
                <p>#${pokeIndex.Id}</p>
                <p>${pokeIndex.Name}</p>
            </div>
            <div class="Card-IMG ${pokeIndex.Type}">
                <img src="${pokeIndex.Image}">
            </div>
            <div class="Card-Details">
                <p>
                    type(s): ${pokeIndex.Type}
                </p>
            </div>
        </div>
    `;
}