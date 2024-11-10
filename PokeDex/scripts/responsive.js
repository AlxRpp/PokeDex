function animateBurgerMenu() {
    closeSingleCard();
    toggleRespMenu();
    toggleClass('line1', 'top-closed');
    toggleClass('line2', 'mid-closed');
    toggleClass('line3', 'bot-closed');
    toggleClass('settingsResp', 'settings-closed-resp');
    toggleClass('searchResp', 'search-closed');
}

function toggleClass (id, className){
    document.getElementById(id).classList.toggle(className);
}
        

function toggleRespMenu() {
    document.getElementById('toggleRespMenu').classList.toggle('Resp-Icons-Closed');
    document.getElementById('RespoSection').classList.toggle('Responsive-Menu-Closed')
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


function amountFavResp() {
    loadFromLocalStorage()
    let amount = document.getElementById('amountFavResp');
    if (favoredPoke.length > 0) {
        amount.innerText = favoredPoke.length;
    } else {
        amount.innerText = "";
    }
}