const foodOptions = {
    "Pobočka A": {
        "Indická": {"Cibuľové bhaji": 15, "Indické kurča": 12, "Indický dhal": 14},
        "Japonská": {"Hubové teriyaki": 8, "Wakame šalát": 10, "Udon rezance": 7},
        "Čínska": {"Čínske rezance": 6, "Bravčová pečeň čchao": 14, "Kung pao kuracie prsia": 12},
    },
    "Pobočka B": {
        "Talianská": {"Margarita pizza": 6, "Talianska frittata": 10, "Cestoviny s mozzarellou": 7},
        "Grécka": {"Paradojkové placky": 5, "Grécke tzatziky": 6, "Grécky šalát": 7},
    },
    "Pobočka C": {
        "Francúzska": {"Zaúdené ratatouille": 12, "Hovädzie po burgundsky": 15, "Clafoutis s čučoriadkami": 14},
        "Španielska": {"Escalivada s hnedou ryžou": 10, "Paella s morskými plodmi": 16, "Ajo Blanco": 12}
    }
};


let requiredElements = {
    "name": false,
    "surname": false,
    "birthday": false,
    "age": false,
    "email": false,
    "tel": false,
    "food": false
};


function updateFoodOptions() {
    let branchSelect = document.getElementById("branch");
    let cuisineSelect = document.getElementById("cuisine");
    let foodSelect = document.getElementById("food");
    
    for (const branch in foodOptions)
        branchSelect.options[branchSelect.length] = new Option(branch, branch);

    branchSelect.onchange = function() {
        cuisineSelect.length = 1;
        foodSelect.length = 1;

        for (const cuisine in foodOptions[this.value])
            cuisineSelect.options[cuisineSelect.length] = new Option(cuisine, cuisine);
    };

    cuisineSelect.onchange = function() {
        foodSelect.length = 1;

        let currentCuisine = foodOptions[branchSelect.value][this.value];
        for (const food in currentCuisine) {
            foodSelect.options[foodSelect.length] = new Option(food, currentCuisine[food]);
        }
    };
}

function validateButton() {
    button = document.getElementById("checkout-button");

    for (const elmId in requiredElements) {
        if (requiredElements[elmId] == false) {
            button.disabled = true;
            return;
        }
    }

    button.disabled = false;
}


function validateLetterCount(elmId) {
    let elm = document.getElementById(elmId);
    let error = document.getElementById(elmId + "-error");
    let label = document.getElementById(elmId + "-letter-count");
    let maxCount = 20;
    let currentCount = elm.value.length;
    label.textContent = " (" + currentCount + "/20)";

    if (elm.value === "")
        return; 

    if (currentCount > maxCount) {
        elm.style.backgroundColor = "rgb(234, 118, 118)";
        error.style.display = "block";
        error.textContent = "Presiahol si maximálny počet znakov.";
        requiredElements[elm.id] = false;
    }
    else {
        elm.style.backgroundColor = "rgb(121, 232, 121)";
        elm.style.borderColor = "";
        error.style.display = "none";
        error.textContent = "";
        requiredElements[elm.id] = true;
    }

    validateButton();
}


function getAge(birthdayId) {
    let birthdayElm = document.getElementById(birthdayId);
    let today = new Date();
    let birthDate = new Date(birthdayElm.value);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
        age--;

    return age;
}


function validateBirthday() {
    let birthdayElm = document.getElementById("birthday");
    let birthdayError = document.getElementById("birthday-error");
    let calcAge = getAge("birthday");

    if (birthdayElm.value == "")
        return;

    if (calcAge < 15) {
        birthdayError.style.display = "block";
        birthdayElm.style.backgroundColor = "rgb(234, 118, 118)";
        birthdayError.textContent = "Pre vytvorenie objednávky musíš mať aspoň 15 rokov.";
        requiredElements[birthdayElm.id] = false;
    }
    else if (calcAge > 120) {
        birthdayError.style.display = "block";
        birthdayElm.style.backgroundColor = "rgb(234, 118, 118)";
        birthdayError.textContent = "Zadaj platný dátum narodenia.";
        requiredElements[birthdayElm.id] = false;
    }
    else {
        birthdayError.style.display = "none";
        birthdayError.textContent = "";
        birthdayElm.style.backgroundColor = "rgb(121, 232, 121)";
        requiredElements[birthdayElm.id] = true;
    }

    validateButton();
}


function validateAge() {
    let ageElm = document.getElementById("age");
    let ageError = document.getElementById("age-error");
    let calcAge = getAge("birthday");

    if (ageElm.value == "")
        return;

    if (ageElm.value != calcAge) {
        ageError.style.display = "block";
        ageElm.style.backgroundColor = "rgb(234, 118, 118)";
        ageError.textContent = "Vek sa nezhoduje so zadaným dátumom narodenia.";
        requiredElements[ageElm.id] = false;
    }
    else {
        ageElm.style.backgroundColor = "rgb(121, 232, 121)";
        ageElm.style.borderColor = "";
        ageError.style.display = "none";
        ageError.textContent = "";
        requiredElements[ageElm.id] = true;
    }

    validateButton();
}

function validateText(textInputId) {
    let textInput = document.getElementById(textInputId);
    let error = document.getElementById(textInputId + "-error");
    let validRegex = /^[a-zA-Z\u0080-\uFFFF]+$/;

    if (textInput.value == "")
        return;

    if (textInput.value.match(validRegex)) {
        textInput.style.backgroundColor = "rgb(121, 232, 121)";
        error.textContent = "";
        error.style.display = "none";
        requiredElements[textInput.id] = true;
    }
    else {
        textInput.style.backgroundColor = "rgb(234, 118, 118)";
        error.style.display = "block";
        error.textContent = "Nesprávne zadaný formát.";
        requiredElements[textInput.id] = false;
    }

    validateButton();
}

function validatePostal() {
    let postal = document.getElementById("delivery-postal");
    let error = document.getElementById(postal.id + "-error");
    let validRegex = /\d{3}\s\d{2}/;

    if (postal.value == "")
        return;

    if (postal.value.match(validRegex)) {
        postal.style.backgroundColor = "rgb(121, 232, 121)";
        error.textContent = "";
        error.style.display = "none";
        requiredElements[postal.id] = true;
    }
    else {
        postal.style.backgroundColor = "rgb(234, 118, 118)";
        error.style.display = "block";
        error.textContent = "Nesprávne zadaný formát.";
        requiredElements[postal.id] = false;
    }

    validateButton();
}


function validateEmail() {
    let emailElm = document.getElementById("email");
    let emailError = document.getElementById("email-error");
    let validRegex = /^[^\s@]{3,}@[^\s@]+\.[^\s@]{2,4}$/;

    if (emailElm.value == "")
        return;

    if (emailElm.value.match(validRegex)) {
        emailElm.style.backgroundColor = "rgb(121, 232, 121)";
        emailError.textContent = "";
        emailError.style.display = "none";
        requiredElements[emailElm.id] = true;
    }
    else {
        emailElm.style.backgroundColor = "rgb(234, 118, 118)";
        emailError.style.display = "block";
        emailError.textContent = "Nesprávne zadaný formát.";
        requiredElements[emailElm.id] = false;
    }

    validateButton();
}


function validateTel() {
    let telElm = document.getElementById("tel");
    let error = document.getElementById(telElm.id + "-error");
    let validRegex = /^\+[1-9]\d{1,14}$/;

    telElm.value = telElm.value.replace(/ /g, "");

    if (telElm.value == "")
        return;

    if (telElm.value.match(validRegex)) {
        telElm.style.backgroundColor = "rgb(121, 232, 121)";
        error.textContent = "";
        error.style.display = "none";
        requiredElements[telElm.id] = true;
    }
    else {
        telElm.style.backgroundColor = "rgb(234, 118, 118)";
        error.textContent = "Nesprávne zadaný formát.";
        error.style.display = "block";
        requiredElements[telElm.id] = false;
    }

    validateButton();
}


function toggleHiddenTextInput() {
    let allergyOtherCheckbox = document.getElementById("allergy-other-checkbox");
    
    if (allergyOtherCheckbox.checked)
        document.getElementById("allergy-other-text").style.visibility = "visible";
    else
        document.getElementById("allergy-other-text").style.visibility = "hidden";
}


function highlightRequired(reqElm) {
    let error = document.getElementById(reqElm.id + "-error");

    if (reqElm.value === "") {
        reqElm.style.borderColor = "red";
        reqElm.style.backgroundColor = "rgb(234, 118, 118)";
        error.textContent = "Toto pole je povinné.";
        error.style.display = "block";
        requiredElements[reqElm.id] = false;
    }
    else {
        reqElm.style.borderColor = "";
        reqElm.style.backgroundColor = "rgb(121, 232, 121)";
        error.style.display = "none";
        requiredElements[reqElm.id] = true;
    }

    validateButton();
}


function highlightMissingFood() {
    let branchSel = document.getElementById("branch");
    let cuisineSel = document.getElementById("cuisine");
    let foodSel = document.getElementById("food");
    let error = document.getElementById("food-error");

    if (branchSel === "" || cuisineSel === "" || foodSel.value === "") {
        branchSel.style.borderColor = "red";
        branchSel.style.backgroundColor = "rgb(234, 118, 118)";
        cuisineSel.style.borderColor = "red";
        cuisineSel.style.backgroundColor = "rgb(234, 118, 118)";
        foodSel.style.borderColor = "red";
        foodSel.style.backgroundColor = "rgb(234, 118, 118)";
        error.textContent = "Tieto polia sú povinné.";
        error.style.display = "block";
        requiredElements[foodSel.id] = false;
    }
    else {
        branchSel.style.borderColor = "";
        branchSel.style.backgroundColor = "rgb(121, 232, 121)";
        cuisineSel.style.borderColor = "";
        cuisineSel.style.backgroundColor = "rgb(121, 232, 121)";
        foodSel.style.borderColor = "";
        foodSel.style.backgroundColor = "rgb(121, 232, 121)";
        error.style.display = "none";
        requiredElements[foodSel.id] = true;
    }

    validateButton();
}

function getGenderValue() {
    let genderRadios = document.getElementsByName("gender");

    for (const gender of genderRadios) {
        if (gender.checked) {
            return gender.value;
        }
    }
}


function getAllergyValues() {
    let allergyValues = "";
    let allergyCheckboxes = document.querySelectorAll("input[type=checkbox]:checked");

    for (let i = 0; i < allergyCheckboxes.length; i++) {
        if (allergyCheckboxes[i].id == "allergy-other-checkbox") {
            allergyValues += document.getElementById("allergy-other-text").value;
        }
        else
            allergyValues += allergyCheckboxes[i].value;
        
        if (i != allergyCheckboxes.length - 1)
            allergyValues += ", ";
    }
    return allergyValues;
}


function getPickupChecked() {
    let pickupRadios = document.getElementsByName("pickup");

    for (const pickup of pickupRadios) {
        if (pickup.checked) {
            return pickup;
        }
    }
}

function showHiddenTextField() {
    let hiddenTextField = document.getElementById("hidden-text-field");
    hiddenTextField.style.visibility = "visible";

}

function requireDelivery(bool) {
    let deliveryAddress = document.getElementById("delivery-address");
    let deliveryCity = document.getElementById("delivery-city");
    let deliveryPostal = document.getElementById("delivery-postal");

    if (bool) {
        deliveryAddress.required = true;
        deliveryAddress.addEventListener("input", function() {
            highlightRequired(deliveryAddress);
        });
        requiredElements[deliveryAddress.id] = false;
        highlightRequired(deliveryAddress);

        deliveryCity.required = true;
        deliveryCity.addEventListener("input", function() {
            highlightRequired(deliveryCity);
            validateText(deliveryCity.id);
        });
        requiredElements[deliveryCity.id] = false;
        highlightRequired(deliveryCity);

        deliveryPostal.required = true;
        deliveryPostal.addEventListener("input", function() {
            highlightRequired(deliveryPostal);
            validatePostal();
        });
        requiredElements[deliveryPostal.id] = false;
        highlightRequired(deliveryPostal);
    }
    else {
        deliveryAddress.required = false;
        deliveryAddress.removeEventListener("input", highlightRequired);
        delete requiredElements[deliveryAddress.id];

        deliveryCity.required = false;
        deliveryCity.removeEventListener("input", highlightRequired);
        deliveryCity.removeEventListener("input", validateText);
        delete requiredElements[deliveryCity.id];

        deliveryPostal.required = false;
        deliveryPostal.removeEventListener("input", highlightRequired);
        deliveryPostal.removeEventListener("input", validatePostal);
        delete requiredElements[deliveryPostal.id];
    }
}

function togglePickup() {
    let toggle = document.getElementById("pickup-delivery");
    let section = document.getElementById("delivery-section");

    if (toggle.checked) {
        section.classList.add("active");
        requireDelivery(true);
    }
    else {
        section.classList.remove("active");
        requireDelivery(false);
    }

    validateButton();
}


function createModalSummary() {
    let modalBackground = document.getElementById("modal-summary");
    modalBackground.classList.add("modal-background");

    let modalWindow = document.createElement("div");
    modalWindow.id = "modal-window";
    modalWindow.classList.add("modal-window");
    modalBackground.appendChild(modalWindow);

    let titleText = document.createElement("h2");
    titleText.textContent = "Súhrn zadaných informácií";
    modalWindow.appendChild(titleText);

    let modalContent = document.createElement("div");
    modalContent.classList.add("grid-modal");
    modalWindow.appendChild(modalContent);

    let nameText = document.createElement("p");
    nameText.textContent = "Meno: " + document.getElementById("name").value;
    modalContent.appendChild(nameText);

    let surnameText = document.createElement("p");
    surnameText.textContent = "Priezvisko: " + document.getElementById("surname").value;
    modalContent.appendChild(surnameText);

    let genderText = document.createElement("p");
    genderText.textContent = "Pohlavie: " + getGenderValue();
    modalContent.appendChild(genderText);

    let birthDateText = document.createElement("p");
    birthDateText.textContent = "Dátum narodenia: " + document.getElementById("birthday").value;
    modalContent.appendChild(birthDateText);

    let ageText = document.createElement("p");
    ageText.textContent = "Vek: " + document.getElementById("age").value;
    modalContent.appendChild(ageText);

    let emailText = document.createElement("p");
    emailText.textContent = "Email: " + document.getElementById("email").value;
    modalContent.appendChild(emailText);

    let telText = document.createElement("p");
    telText.textContent = "Tel.č.: " + document.getElementById("tel").value;
    modalContent.appendChild(telText);

    let foodText = document.createElement("p");
    const foodSelect = document.getElementById("food");
    foodText.textContent = "Vybrané jedlo: " + foodSelect.options[foodSelect.selectedIndex].text;
    modalContent.appendChild(foodText);

    let allergiesValues = getAllergyValues();
    if (allergiesValues != "") {
        let allergiesText = document.createElement("p");
        allergiesText.textContent = "Uvedené alergie: " + allergiesValues;
        modalContent.appendChild(allergiesText);
    }

    let pickup = document.createElement("p");
    pickup.textContent = "Spôsob dodania: " + getPickupChecked().value;
    modalContent.appendChild(pickup);

    if (getPickupChecked().id == "pickup-delivery") {
        let address = document.createElement("p");
        address.textContent = "Ulica: " + document.getElementById("delivery-address").value;
        modalContent.appendChild(address);

        let city = document.createElement("p");
        city.textContent = "Mesto: " + document.getElementById("delivery-city").value;
        modalContent.appendChild(city);

        let postal = document.createElement("p");
        postal.textContent = "PSČ: " + document.getElementById("delivery-postal").value;
        modalContent.appendChild(postal);

        let noteValue = document.getElementById("note").value;
        if (noteValue != "") {
            let noteText = document.createElement("p");
            noteText.textContent = "Poznámka pre kuriéra: " + noteValue;
            modalContent.appendChild(noteText);
        }
    }

    let price = document.createElement("p");
    price.textContent = "Finálna suma: " + foodSelect.value + " €";
    modalContent.appendChild(price);

    let submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Objednať";
    modalContent.appendChild(submitButton);
}

document.addEventListener("DOMContentLoaded", function() {
    updateFoodOptions();
    highlightMissingFood();
});

const reqInputs = document.querySelectorAll("input[required]");
reqInputs.forEach(input => {
    highlightRequired(input);
    input.addEventListener("input", function() {
        highlightRequired(input);
    });
});

let nameElm = document.getElementById("name");
nameElm.addEventListener("input", function() {
    validateLetterCount(nameElm.id);
    validateText(nameElm.id);
});

let surnameElm = document.getElementById("surname");
surnameElm.addEventListener("input", function() {
    validateLetterCount(surnameElm.id);
    validateText(surnameElm.id);
});

const genderRadioButtons = document.querySelectorAll("input[name='gender']");
genderRadioButtons.forEach(radio => {
    radio.addEventListener("click", toggleHiddenTextInput);
});

document.getElementById("birthday").addEventListener("input", validateBirthday);

document.getElementById("age").addEventListener("input", validateAge);

document.getElementById("email").addEventListener("input", validateEmail);

document.getElementById("tel").addEventListener("input", validateTel);

document.getElementById("allergy-other-checkbox").addEventListener("click", toggleHiddenTextInput);

document.getElementById("food-select").addEventListener("change", highlightMissingFood);

const pickupRadios = document.querySelectorAll("input[name='pickup']");
pickupRadios.forEach(radio => {
    radio.addEventListener("click", togglePickup);
});

const modalBackground = document.getElementById("modal-summary");
window.onclick = function(event) {
    if (event.target == modalBackground) {
        modalBackground.classList.remove("modal-background");
        document.getElementById("modal-window").remove();
    }
};
