let modal = document.getElementById('modal-content');
let btn = document.getElementById("settingbtn");
let span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}