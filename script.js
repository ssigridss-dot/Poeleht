let total = 0;
let selectedTotal = 0;
let items = [];

// ======================
// SALVESTAMINE / LAADIMINE
// ======================

function saveState() {
    const state = {
        items: items,
        activeSection: document.querySelector(".card.active")?.id || "shoppingSection"
    };

    localStorage.setItem("appState", JSON.stringify(state));
}

function loadState() {
    const state = JSON.parse(localStorage.getItem("appState"));

    if (!state) return;

    items = state.items || [];

    // Taasta list
    items.forEach(item => {
        createItemElement(item);
        total += item.price;
        if (item.checked) selectedTotal += item.price;
    });

    document.getElementById("total").textContent = total.toFixed(2);
    document.getElementById("selectedTotal").textContent = selectedTotal.toFixed(2);

    // Taasta vaade
    showSection(state.activeSection || "shoppingSection");
}

// ======================
// VAATE VAHETUS
// ======================

function showSection(id) {
    document.querySelectorAll(".card").forEach(el => {
        el.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

    saveState();
}

// ======================
// UUDISKIRI
// ======================

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

// ======================
// SUMMAD
// ======================

function updateSelectedTotal() {
    selectedTotal = 0;

    document.querySelectorAll("#shoppingList li").forEach((li, index) => {
        const cb = li.querySelector("input");

        if (cb.checked) {
            selectedTotal += Number(cb.dataset.price);
            items[index].checked = true;
        } else {
            items[index].checked = false;
        }
    });

    document.getElementById("selectedTotal").textContent = selectedTotal.toFixed(2);

    saveState();
}

// ======================
// FILTER
// ======================

function applyFilter() {
    const filter = document.getElementById("filterSelect").value;

    document.querySelectorAll("#shoppingList li").forEach(li => {
        const cb = li.querySelector("input");

        if (filter === "all") li.style.display = "flex";
        if (filter === "selected") li.style.display = cb.checked ? "flex" : "none";
        if (filter === "unselected") li.style.display = !cb.checked ? "flex" : "none";
    });
}

// ======================
// ITEMI LOOMINE (ERALDI FUNKTSIOON)
// ======================

function createItemElement(item, indexOverride = null) {
    const li = document.createElement("li");

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.dataset.price = item.price;
    cb.checked = item.checked;

    cb.onchange = () => {
        updateSelectedTotal();
        applyFilter();
    };

    const span = document.createElement("span");
    span.textContent = `${item.name} - ${item.price} €`;
    span.style.flex = "1";

    const btn = document.createElement("button");
    btn.textContent = "Eemalda";

    btn.onclick = () => {
        const index = indexOverride ?? [...li.parentNode.children].indexOf(li);

        total -= item.price;
        if (cb.checked) selectedTotal -= item.price;

        items.splice(index, 1);
        li.remove();

        document.getElementById("total").textContent = total.toFixed(2);
        document.getElementById("selectedTotal").textContent = selectedTotal.toFixed(2);

        saveState();
    };

    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(btn);

    document.getElementById("shoppingList").appendChild(li);
}

// ======================
// LISA TOODE
// ======================

function addItem() {
    const name = document.getElementById("itemName").value.trim();
    const price = Number(document.getElementById("itemPrice").value);

    if (!name || price <= 0) {
        alert("Sisesta korrektne nimi ja hind!");
        return;
    }

    const item = {
        name: name,
        price: price,
        checked: false
    };

    items.push(item);

    createItemElement(item);

    total += price;

    document.getElementById("total").textContent = total.toFixed(2);

    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";

    saveState();
}

// ======================
// KÄIVITUS
// ======================

window.onload = function () {
    loadState();
};