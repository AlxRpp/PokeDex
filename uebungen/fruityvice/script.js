function init() {
    getfruits();
    getfruits2();
    getfruits3();
    getData();
}


async function getfruits() {
    let response = await fetch("https://www.fruityvice.com/api/fruit/strawberry");
    let responseAsJson = await response.json();
    let content = `
 <table border="1" cellpadding="10" cellspacing="0">
        <tr>
          <th colspan="2">${responseAsJson.name}</th>
        </tr>
        <tr>
          <td><strong>Genus</strong></td>
          <td>${responseAsJson.genus}</td>
        </tr>
        <tr>
          <td><strong>Family</strong></td>
          <td>${responseAsJson.family}</td>
        </tr>
        <tr>
          <td><strong>Order</strong></td>
          <td>${responseAsJson.order}</td>
        </tr>
        <tr>
          <th colspan="2">Nährwerte</th>
        </tr>
        <tr>
          <td><strong>Kohlenhydrate</strong></td>
          <td>${responseAsJson.nutritions.carbohydrates}g</td>
        </tr>
        <tr>
          <td><strong>Protein</strong></td>
          <td>${responseAsJson.nutritions.protein}g</td>
        </tr>
        <tr>
          <td><strong>Fett</strong></td>
          <td>${responseAsJson.nutritions.fat}g</td>
        </tr>
        <tr>
          <td><strong>Kalorien</strong></td>
          <td>${responseAsJson.nutritions.calories}</td>
        </tr>
        <tr>
          <td><strong>Zucker</strong></td>
          <td>${responseAsJson.nutritions.sugar}g</td>
        </tr>

      </table>
`;
    document.getElementById('content').innerHTML += content;
}


async function getfruits2() {
    let response = await fetch("https://www.fruityvice.com/api/fruit/banana");
    let responseAsJson = await response.json();
    let content = `
     <table border="1" cellpadding="10" cellspacing="0">
            <tr>
              <th colspan="2">${responseAsJson.name}</th>
            </tr>
            <tr>
              <td><strong>Genus</strong></td>
              <td>${responseAsJson.genus}</td>
            </tr>
            <tr>
              <td><strong>Family</strong></td>
              <td>${responseAsJson.family}</td>
            </tr>
            <tr>
              <td><strong>Order</strong></td>
              <td>${responseAsJson.order}</td>
            </tr>
            <tr>
              <th colspan="2">Nährwerte</th>
            </tr>
            <tr>
              <td><strong>Kohlenhydrate</strong></td>
              <td>${responseAsJson.nutritions.carbohydrates}g</td>
            </tr>
            <tr>
              <td><strong>Protein</strong></td>
              <td>${responseAsJson.nutritions.protein}g</td>
            </tr>
            <tr>
              <td><strong>Fett</strong></td>
              <td>${responseAsJson.nutritions.fat}g</td>
            </tr>
            <tr>
              <td><strong>Kalorien</strong></td>
              <td>${responseAsJson.nutritions.calories}</td>
            </tr>
            <tr>
              <td><strong>Zucker</strong></td>
              <td>${responseAsJson.nutritions.sugar}g</td>
            </tr>
          </table>
    `;
    document.getElementById('content').innerHTML += content;
}

async function getfruits3() {
    let response = await fetch("https://www.fruityvice.com/api/fruit/peach");
    let responseAsJson = await response.json();
    let content = `
         <table border="1" cellpadding="10" cellspacing="0">
                <tr>
                  <th colspan="2">${responseAsJson.name}</th>
                </tr>
                <tr>
                  <td><strong>Genus</strong></td>
                  <td>${responseAsJson.genus}</td>
                </tr>
                <tr>
                  <td><strong>Family</strong></td>
                  <td>${responseAsJson.family}</td>
                </tr>
                <tr>
                  <td><strong>Order</strong></td>
                  <td>${responseAsJson.order}</td>
                </tr>
                <tr>
                  <th colspan="2">Nährwerte</th>
                </tr>
                <tr>
                  <td><strong>Kohlenhydrate</strong></td>
                  <td>${responseAsJson.nutritions.carbohydrates}g</td>
                </tr>
                <tr>
                  <td><strong>Protein</strong></td>
                  <td>${responseAsJson.nutritions.protein}g</td>
                </tr>
                <tr>
                  <td><strong>Fett</strong></td>
                  <td>${responseAsJson.nutritions.fat}g</td>
                </tr>
                <tr>
                  <td><strong>Kalorien</strong></td>
                  <td>${responseAsJson.nutritions.calories}</td>
                </tr>
                <tr>
                  <td><strong>Zucker</strong></td>
                  <td>${responseAsJson.nutritions.sugar}g</td>
                </tr>
              </table>
        `;
    document.getElementById('content').innerHTML += content;
}


async function getData() {
    let url = "https://www.fruityvice.com/api/fruit/all"
    try {
        let response = await fetch(url);
        let json = await response.json();
        console.log(json);
    } catch (error) {
        console.error("ups da ging etwas schief");

    }

}



//Chat GPT
// const getData = async () => {
//     const url = "https://www.fruityvice.com/api/fruit/all";
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`Status: ${response.status}`);
//         }
//         const json = await response.json();
//         console.log(json);
//         return json;  // Gibt die JSON-Daten zurück
//     } catch (error) {
//         console.error('Fehler:', error);
//         throw error; // Wirf den Fehler weiter, um ihn später zu behandeln, wenn nötig
//     }
// };

// // Verwendung der Funktion
// getData()
//     .then(data => {
//         // Hier kannst du etwas mit den Daten machen
//         console.log('Daten erhalten:', data);
//     })
//     .catch(error => {
//         console.error('Fehler bei der Datenverarbeitung:', error);
//     });
