// Teksti lisamine
function lisaTekst() {
    const input = document.getElementById("inputText").value;
    document.getElementById("tulemus").textContent = "Sa kirjutasid: " + input;
}

// To-do list funktsioon
function lisaTodo() {
    const input = document.getElementById("todoInput");
    const tekst = input.value;

    if (tekst === "") {
        alert("Palun sisesta ülesanne!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = tekst;

    // Klõps eemaldab elemendi
    li.onclick = function () {
        li.remove();
    };

    document.getElementById("todoList").appendChild(li);

    input.value = "";
}

function liida() {
    const a = Number(document.getElementById("a").value);
    const b = Number(document.getElementById("b").value);
    document.getElementById("vastus").textContent = "Tulemus: " + (a + b);
}

let juhuarv = Math.floor(Math.random() * 10) + 1;

function arva() {
    const arvamus = Number(document.getElementById("arvamus").value);

    if (arvamus === juhuarv) {
        alert("Õige!");
    } else {
        alert("Vale, proovi uuesti!");
    }
}