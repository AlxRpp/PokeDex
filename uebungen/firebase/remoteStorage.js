const base_URL = "https://remotestorage-5c307-default-rtdb.europe-west1.firebasedatabase.app/"
let users = [];

// function init() {
    // getData("/user/-O8XSHXcaRk1SB2y_mqX/");
    //  getData("/type");
    //   postData("/user", {
    // "art": "Wolfgang",
    //     "musik": "HIP HOP",
    //         "Special": "farting loud",
    //             "looking": "very nice",
    // });
    // postData("/type", { "fruit": "mango" });
    // deleteData("/type")
    // putData("/name", {"fruit": "Mongo"});
    // putData("/name", {"fruit": "Apple"});
    // putData("/name", {"fruitas": "Kabvanoss"});
// }

// async function getData(path = "") {
//     let response = await fetch(base_URL + path + ".json")
//     let responseToJson = await response.json();
//     console.log(responseToJson);
// }

// async function postData(path = "", data = {}) {
//     let response = await fetch(base_URL + path + ".json", {
//         method: "POST",
//         header: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     });
//     return responseToJson = await response.json();
// }

// async function deleteData(path = "") {
//     let response = await fetch(base_URL + path + ".json", {
//         method: "Delete",
//     });
//     return responseToJson = await response.json();
// }

// async function putData(path = "", data = {}) {
//     let response = await fetch(base_URL + path + ".json", {
//         method: "Put",
//         header: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     });
//     return responseToJson = await response.json();
// }



async function onLoadFunc() {
    let allUsers = await getAllUsers("/users");
    let userKeysArrays = Object.keys(allUsers)
    for (let index = 0; index < userKeysArrays.length; index++) {
       users.push({
        id : userKeysArrays[index],
        user : allUsers[userKeysArrays[index]],
       })
    }
    console.log(users);
    await editUser(users[2].id,{"name":"Karinuschje"});

}

async function getAllUsers(path = "") {
    let response = fetch(base_URL + path + ".json");
    return responseToJson = (await response).json();
}



async function editUser(id=44, user={"name":"DedMaros"}) {
    await putData(`users/${id}`, user)
}


async function putData(path = "", data = {}) {
    let response = fetch(base_URL + path + ".json", {
        method: "PUT",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return (await response).json();
}