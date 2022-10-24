let foodOptions = {
    "Pobočka A": {
        "Indická": ["Cibuľové bhaji", "Indické kurča", "Indický dhal z červenej šošovice"],
        "Japonská": ["Hubové teriyaki", "Wakame šalát", "Sushu maki s ovocím", "Udon rezance"],
        "Čínska": ["Čínske rezance", "Bravčová pečeň čchao", "Kung pao kuracie prsia"],
    },
    "Pobočka B": {
        "Talianská": ["Margarita pizza", "Talianska frittata", "Cestoviny s mozzarellou"],
        "Grécka": ["Paradojkové placky", "Grécke tzatziky", "Grécky šalát"],
    },
    "Pobočka C": {
        "Francúzska": ["Zaúdené ratatouille", "Hovädzie po burgundsky", "Clafoutis s čučoriadkami"],
        "Španielska": ["Escalivada s hnedou ryžou", "Paella s morskými plodmi", "Ajo Blanco"]
    }
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

        for (const food of foodOptions[branchSelect.value][this.value])
            foodSelect.options[foodSelect.length] = new Option(food, food);
    }
}

function validateAge() {
    let birthdayElm = document.getElementById("birthday");
    let ageElm = document.getElementById("age");

    let today = new Date();
    let birthDate = new Date(birthdayElm.value);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (ageElm.value == 0 || age != ageElm.value) {
        birthdayElm.style.backgroundColor = "red";
        ageElm.style.backgroundColor = "red";
    }
    else {
        birthdayElm.style.backgroundColor = "green";
        ageElm.style.backgroundColor = "green";
    }
}

function validateEmail() {
    let emailElm = document.getElementById("email");
    let validRegex = /^[^\s@]{3,}@[^\s@]+\.[^\s@]{2,4}$/;

    if (emailElm.value.match(validRegex)) 
        emailElm.style.backgroundColor = "green";
    else
        emailElm.style.backgroundColor = "red";
}

function validateTel() {
    let telElm = document.getElementById("tel");
    let validRegex = /^\+[1-9]\d{1,14}$/;

    telElm.value = telElm.value.replace(/ /g, "");

    if (telElm.value.match(validRegex))
        telElm.style.backgroundColor = "green";
    else
        telElm.style.backgroundColor = "red";
}

function toggleHiddenInput() {
    let genderOtherRadio = document.getElementById("gender-other-radio");
    let allergyOtherCheckbox = document.getElementById("allergy-other-checkbox");
    
    if (genderOtherRadio.checked)
        document.getElementById("gender-other-text").style.display = "inline";
    else
        document.getElementById("gender-other-text").style.display = "none";
    
    if (allergyOtherCheckbox.checked)
        document.getElementById("allergy-other-text").style.display = "inline";
    else
        document.getElementById("allergy-other-text").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    updateFoodOptions();
});

const genderRadioButtons = document.querySelectorAll("input[name='gender']");
genderRadioButtons.forEach(radio => {
    radio.addEventListener("click", toggleHiddenInput);
});

document.getElementById("birthday").addEventListener("focusout", validateAge);
document.getElementById("age").addEventListener("focusout", validateAge);

document.getElementById("email").addEventListener("focusout", validateEmail);

document.getElementById("tel").addEventListener("focusout", validateTel);

document.getElementById("allergy-other-checkbox").addEventListener("click", toggleHiddenInput);
