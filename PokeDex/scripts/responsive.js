function animateBurgerMenu() {
    closeSingleCard();
    toggleRespMenu();
    line1();
    line2();
    line3();
}


function line1() {
    document.getElementById('line1').classList.toggle('top-closed');
}


function line2() {
    document.getElementById('line2').classList.toggle('mid-closed');
}


function line3() {
    document.getElementById('line3').classList.toggle('bot-closed');
}


function toggleRespMenu() {
    document.getElementById('toggleRespMenu').classList.toggle('Resp-Icons-Closed');
    document.getElementById('RespoSection').classList.toggle('Responsive-Menu-Closed')
}


function openSettingsResp() {
    document.getElementById('settingsResp').classList.toggle('settings-closed-resp');
}


function openSearchResp() {
    document.getElementById('searchsResp').classList.toggle('search-closed');
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