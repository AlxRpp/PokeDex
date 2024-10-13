let promError = false;


function getPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Test1");

            if (promError) {
                reject("go and make a squat to run the code")
            } else {
                resolve("Hat geklappt")
            }
        }, 2000);
    });
}

function getPromise2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Test2");

            if (promError) {
                reject("please transfer a million dollar")
            } else {
                resolve("Hat geklappt")
            }
        }, 2000);
    });
}

function getPromise3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Test3");

            if (promError) {
                reject("this device are currently broken")
            } else {
                resolve("Hat geklappt")
            }
        }, 2000);
    });
}


async function usePromise() {
    try {
        await getPromise();
        await getPromise2();
        await getPromise3();
        console.log("all try´s were successfull");
    } catch (error) {
        console.error(error);
    }
    console.log("ende");

}
