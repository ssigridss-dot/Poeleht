// Teksti lisamine
function lisaTekst() {
    const input = document.getElementById("inputText").value;
    document.getElementById("tulemus").textContent = "Sa kirjutasid: " + input;
}

// poenimekirja funktsioon
let total = 0;
let selectedTotal = 0;

// summa valitud toodetele
function updateSelectedTotal() {
    selectedTotal = 0;

    document.querySelectorAll("#shoppingList li").forEach(li => {
        const cb = li.querySelector("input[type='checkbox']");
        const price = parseFloat(cb.dataset.price);

        if (cb.checked) {
            selectedTotal += price;
        }
    });

    document.getElementById("selectedTotal").textContent = selectedTotal.toFixed(2);
}

// filter
function applyFilter() {
    const filter = document.getElementById("filterSelect").value;

    document.querySelectorAll("#shoppingList li").forEach(li => {
        const cb = li.querySelector("input[type='checkbox']");

        if (filter === "all") {
            li.style.display = "flex";
        }

        if (filter === "selected") {
            li.style.display = cb.checked ? "flex" : "none";
        }

        if (filter === "unselected") {
            li.style.display = !cb.checked ? "flex" : "none";
        }
    });
}

// lisa toode
function addItem() {
    const nameInput = document.getElementById("itemName");
    const priceInput = document.getElementById("itemPrice");

    const name = nameInput.value.trim();
    const price = Number(priceInput.value);

    if (!name || price <= 0) {
        alert("Sisesta korrektne nimi ja hind!");
        return;
    }

    // Lisa kogusummale
    total += price;

    // Loo listi element
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.gap = "10px";

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.price = price;

    checkbox.onchange = function () {
        updateSelectedTotal();
        applyFilter();
    };

    // nimi
    const nameSpan = document.createElement("span");
    nameSpan.textContent = `${name} - ${price} €`;
    nameSpan.style.flex = "1";

    // nupp
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Eemalda";

    removeBtn.onclick = function () {
        total -= price;

        if (checkbox.checked) {
            selectedTotal -= price;
        }

        li.remove();

        document.getElementById("total").textContent = total.toFixed(2);
        document.getElementById("selectedTotal").textContent = selectedTotal.toFixed(2);
    };

    li.appendChild(checkbox);
    li.appendChild(nameSpan);
    li.appendChild(removeBtn);

    document.getElementById("shoppingList").appendChild(li);

    // Uuenda kogusumma
    document.getElementById("total").textContent = total.toFixed(2);

    // Tühjenda inputid
    nameInput.value = "";
    priceInput.value = "";
}