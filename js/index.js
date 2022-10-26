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
}

let requiredElements = {
    "name": false,
    // "surname": false,
    // "birthday": false,
    // "age": false,
}

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
    }

    cuisineSelect.onchange = function() {
        foodSelect.length = 1;

        let currentCuisine = foodOptions[branchSelect.value][this.value];
        for (const food in currentCuisine) {
            foodSelect.options[foodSelect.length] = new Option(food, currentCuisine[food]);
        }
    }
}

function validateButton() {
    button = document.getElementById("checkout-button");

    for (const elmId in requiredElements) {
        if (requiredElements[elmId] == false) {
            button.disabled = true;
            console.log("here");
            return;
        }
    }
    button.disabled = false;
}

function validateLetterCount(elmId) {
    let elm = document.getElementById(elmId)
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
        error.textContent = "Presiahol si maximálny počet znakov."
        requiredElements[elmId] = false;
        validateButton();
    }
    else {
        elm.style.backgroundColor = "rgb(121, 232, 121)";
        elm.style.borderColor = "";
        error.style.display = "none";
        error.textContent = "";
        requiredElements[elmId] = true;
        validateButton();
    }
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
        birthdayError.textContent = "Pre vytvorenie objednávky musíš mať aspoň 15 rokov."
    }
    else {
        birthdayError.style.display = "none";
        birthdayError.textContent = "";
        birthdayElm.style.backgroundColor = "rgb(121, 232, 121)";
    }
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
        ageError.textContent = "Vek sa nezhoduje so zadaným dátumom narodenia."
    }
    else {
        ageElm.style.backgroundColor = "rgb(121, 232, 121)";
        ageElm.style.borderColor = "";
        ageError.style.display = "none";
        ageError.textContent = "";
    }
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
    }
    else {
        emailElm.style.backgroundColor = "rgb(234, 118, 118)";
        emailError.style.display = "block";
        emailError.textContent = "Nesprávne zadaný formát."
    }
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
    }
    else {
        telElm.style.backgroundColor = "rgb(234, 118, 118)";
        error.textContent = "Nesprávne zadaný formát.";
        error.style.display = "block";
    }
}

function toggleHiddenTextInput() {
    let genderOtherRadio = document.getElementById("gender-other-radio");
    let allergyOtherCheckbox = document.getElementById("allergy-other-checkbox");
    
    if (genderOtherRadio.checked)
        document.getElementById("gender-other-text").style.visibility = "visible";
    else
        document.getElementById("gender-other-text").style.visibility = "hidden";
    
    if (allergyOtherCheckbox.checked)
        document.getElementById("allergy-other-text").style.visibility = "visible";
    else
        document.getElementById("allergy-other-text").style.visibility = "hidden";
}

function toggleHiddenActiveSection(toggleId, sectionId) {
    let toggleElm = document.getElementById(toggleId);
    let sectionElm = document.getElementById(sectionId);

    if (toggleElm.checked)
        sectionElm.classList.add("active");
    else
        sectionElm.classList.remove("active");
}

function highlightRequired(reqElm) {
    let error = document.getElementById(reqElm.id + "-error");
    
    if (reqElm.value === "") {
        reqElm.style.borderColor = "red";
        reqElm.style.backgroundColor = "rgb(234, 118, 118)";
        error.textContent = "Toto pole je povinné.";
        error.style.display = "block";
        requiredElements[reqElm] = false;
        validateButton();
    }
    else {
        reqElm.style.borderColor = "";
        reqElm.style.backgroundColor = "rgb(121, 232, 121)";
        error.style.display = "none";
        requiredElements[reqElm] = true;
        validateButton();
    }
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
    }
    else {
        branchSel.style.borderColor = "";
        branchSel.style.backgroundColor = "rgb(121, 232, 121)";
        cuisineSel.style.borderColor = "";
        cuisineSel.style.backgroundColor = "rgb(121, 232, 121)";
        foodSel.style.borderColor = "";
        foodSel.style.backgroundColor = "rgb(121, 232, 121)";
        error.style.display = "none";
    }
}

function getGenderValue() {
    let genderRadios = document.getElementsByName("gender");

    for (const gender of genderRadios) {
        if (gender.checked) {
            if (gender.id == "gender-other-radio")
                return document.getElementById("gender-other-text").value;
            else
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

function getPaymentChecked() {
    let paymentRadios = document.getElementsByName("payment");

    for (const payment of paymentRadios) {
        if (payment.checked) {
            return payment;
        }
    }
}

function createModalSummary() {
    let modalBackground = document.getElementById("modal-summary");
    modalBackground.classList.add("modal-background");

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalBackground.appendChild(modalContent);

    let name = document.createElement("p");
    name.textContent = "Meno: " + document.getElementById("name").value;
    modalContent.appendChild(name);

    let surname = document.createElement("p");
    surname.textContent = "Priezvisko: " + document.getElementById("surname").value;
    modalContent.appendChild(surname);

    let gender = document.createElement("p");
    gender.textContent = "Pohlavie: " + getGenderValue();
    modalContent.appendChild(gender);

    let birthDate = document.createElement("p");
    birthDate.textContent = "Dátum narodenia: " + document.getElementById("birthday").value;
    modalContent.appendChild(birthDate);

    let age = document.createElement("p");
    age.textContent = "Vek: " + document.getElementById("age").value;
    modalContent.appendChild(age);

    let email = document.createElement("p");
    email.textContent = "Email: " + document.getElementById("email").value;
    modalContent.appendChild(email);

    let tel = document.createElement("p");
    tel.textContent = "Tel.č.: " + document.getElementById("tel").value;
    modalContent.appendChild(tel);

    let food = document.createElement("p");
    const foodSelect = document.getElementById("food");
    food.textContent = "Vybrané jedlo: " + foodSelect.options[foodSelect.selectedIndex].text;
    modalContent.appendChild(food);

    let allergies = document.createElement("p");
    allergies.textContent = "Uvedené alergie: " + getAllergyValues();
    modalContent.appendChild(allergies);

    let note = document.createElement("p");
    note.textContent = "Poznámka k objednávke: " + document.getElementById("note").value;
    modalContent.appendChild(note);

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
    }

    let payment = document.createElement("p");
    payment.textContent = "Spôsob platby: " + getPaymentChecked().value;
    modalContent.appendChild(payment);

    let price = document.createElement("p");
    price.textContent = "Finálna suma: " + foodSelect.value;
    modalContent.appendChild(price);
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
});

let surnameElm = document.getElementById("surname");
surnameElm.addEventListener("input", function() {
    validateLetterCount(surnameElm.id);
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

document.getElementById("branch").addEventListener("input", highlightMissingFood);
document.getElementById("cuisine").addEventListener("input", highlightMissingFood);
document.getElementById("food").addEventListener("input", highlightMissingFood);

const pickupRadioButtons = document.querySelectorAll("input[name='pickup']");
pickupRadioButtons.forEach(radio => {
    radio.addEventListener("click", function() {
        toggleHiddenActiveSection("pickup-delivery", "delivery-section");
    }
)});

const paymentRadioButtons = document.querySelectorAll("input[name='payment']");
paymentRadioButtons.forEach(radio => {
    radio.addEventListener("click", function() {
        toggleHiddenActiveSection("payment-card", "card-section");
    }
)});
