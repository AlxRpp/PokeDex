

let fail = false;







function goodPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("global Hello");
            resolve("this function is functional!");
           
        }, 2000)
    })
}

function badPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Hello World");
            reject("this mission was a failure")
        }, 2000);
    })
}

function getPromise() {
    badPromise().then(
        goodPromise)
        .then(
            goodPromise)
        .then(
            (result) => {
                console.log(result)
            }
        ).catch(
            (error) => {
                console.error(error);

            }

        )
}


function newGoodPromise(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(1);
            
            if(fail){
               reject("DAMN!")     
            } else{
                resolve("Yippie")
            }
        }, 500);
    })
}

function newGoodPromise2(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(2);

            if(fail){
               reject("DAMN!")     
            } else{
                resolve("Yippie")
            }
        }, 500);
    })
}

function newGoodPromise3(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(3);

            if(fail){
               reject("DAMN!")     
            } else{
                resolve("Yippie")
            }
        }, 500);
    })
}

function getNewPromise(){
    newGoodPromise().then(
        newGoodPromise2).then(
            newGoodPromise3).then(
                (result) => {
                    console.log(result);
                }
            ).catch(
                (reject) => {
                    console.error(reject);
                }
            )
};