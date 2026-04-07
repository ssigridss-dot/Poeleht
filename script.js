let total = 0;
let selectedTotal = 0;

// VAATE VAHETUS (FIX)
function showSection(id) {
    document.querySelectorAll(".card").forEach(el => {
        el.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

// UUDISKIRI
function avaVorm() {
    showSection("formSection");
}

function saadaVorm() {
    const nimi = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;

    if (!nimi || !email) {
        alert("Täida kõik väljad!");
        return;
    }

    showSection("successSection");
}

function tagasi() {
    showSection("shoppingSection");
}

// SUMMAD
function updateSelectedTotal() {
    selectedTotal = 0;

    document.querySelectorAll("#shoppingList li").forEach(li => {
        const cb = li.querySelector("input");
        if (cb.checked) {
            selectedTotal += Number(cb.dataset.price);
        }
    });

    document.getElementById("selectedTotal").textContent = selectedTotal.toFixed(2);
}

// FILTER
function applyFilter() {
    const filter = document.getElementById("filterSelect").value;

    document.querySelectorAll("#shoppingList li").forEach(li => {
        const cb = li.querySelector("input");

        if (filter === "all") li.style.display = "flex";
        if (filter === "selected") li.style.display = cb.checked ? "flex" : "none";
        if (filter === "unselected") li.style.display = !cb.checked ? "flex" : "none";
    });
}

// LISA TOODE
function addItem() {
    const name = document.getElementById("itemName").value.trim();
    const price = Number(document.getElementById("itemPrice").value);

    if (!name || price <= 0) {
        alert("Sisesta korrektne nimi ja hind!");
        return;
    }

    total += price;

    const li = document.createElement("li");

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.dataset.price = price;

    cb.onchange = () => {
        updateSelectedTotal();
        applyFilter();
    };

    const span = document.createElement("span");
    span.textContent = `${name} - ${price} €`;
    span.style.flex = "1";

    const btn = document.createElement("button");
    btn.textContent = "Eemalda";

    btn.onclick = () => {
        total -= price;
        if (cb.checked) selectedTotal -= price;

        li.remove();

        document.getElementById("total").textContent = total.toFixed(2);
        document.getElementById("selectedTotal").textContent = selectedTotal.toFixed(2);
    };

    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(btn);

    document.getElementById("shoppingList").appendChild(li);

    document.getElementById("total").textContent = total.toFixed(2);

    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
}