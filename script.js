document.addEventListener('DOMContentLoaded', function () {
    window.history.pushState({ popup: "close" }, "popup", "./");
    window.addEventListener("popstate", function (e) {
        if (e.state.popup === "close") {
            closePopUp();
        }
        if (e.state.popup === "open") {
            openPopUp();
        }
    });

    let button = document.getElementById("auth-popup-start");
    button.addEventListener("click", openPopUp);
    let closeSpan = document.getElementsByClassName("close")[0];
    closeSpan.addEventListener("click", closePopUp);
    let userName = document.getElementById("user-name");
    let userEmail = document.getElementById("user-email");
    let userMsg = document.getElementById("user-msg");
    let policyCheck = document.getElementById("policy");
    let form = document.getElementById("user-form");

    userName.value = localStorage.getItem("name");
    userEmail.value = localStorage.getItem("email");
    userMsg.value = localStorage.getItem("message");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let xhr = new XMLHttpRequest();
        let url = "https://formcarry.com/s/ODdm2t9bVz_";
        let formData = new FormData(form);
        saveToLocalStorage();
        clearEntries();
        policyCheck.ariaChecked = false;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Accept", "application/json");

        xhr.responseType = "json";
        xhr.send(formData);
        xhr.onload = function () {
            if (xhr.status !== 200) {
                alert("Ошибка при выполнении запроса");
            } else {
                alert("Данные успешно отправлены!");
                console.log(xhr.response);
            }
        };
    });
});

function saveToLocalStorage() {
    let userName = document.getElementById("user-name").value;
    let userEmail = document.getElementById("user-email").value;
    let userMsg = document.getElementById("user-msg").value;
    localStorage.setItem("name", userName);
    localStorage.setItem("email", userEmail);
    localStorage.setItem("message", userMsg);
}

function clearEntries() {
    document.getElementById("user-name").value = "";
    document.getElementById("user-email").value = "";
    document.getElementById("user-msg").value = "";
}

function openPopUp() {
    window.history.replaceState({ popup: "open" }, "popup", "./popup");
    let popup = document.getElementById("auth-popup");
    popup.style.display = "flex";
    popup.style.alignItems = "center";
    popup.style.justifyContent = "center";
}

function closePopUp() {
    window.history.replaceState({ popup: "close" }, "popup", "./");
    let popup = document.getElementById("auth-popup");
    popup.style.display = "none";
}
