let activityOptions = {
    "Posilňovňa": {
        "Pondelok": ["08:00", "12:30", "16:00"],
        "Streda": ["09:00", "12:30", "14:30", "17:30"],
        "Piatok": ["08:30", "11:00"]
    },
    "Plávanie": {
        "Pondelok": ["06:00", "19:00"],
        "Utorok": ["06:30", "17:30"],
        "Štvrtok": ["06:00"],
        "Piatok": ["06:30", "13:00", "18:30"]
    },
    "Lezecká stena": {
        "Utorok": ["11:30", "15:30", "17:00"],
        "Štvrtok": ["07:00", "19:30"]
    }
}

function updateActivityOptions() {
    let activitySelect = document.getElementById("activity");
    let daySelect = document.getElementById("day");
    let timeSelect = document.getElementById("time");
    
    for (const activity in activityOptions)
        activitySelect.options[activitySelect.length] = new Option(activity, activity);

    activitySelect.onchange = function() {
        daySelect.length = 1;
        timeSelect.length = 1;

        for (const day in activityOptions[this.value])
            daySelect.options[daySelect.length] = new Option(day, day);
    }

    daySelect.onchange = function() {
        timeSelect.length = 1;

        for (const time of activityOptions[activitySelect.value][this.value])
            timeSelect.options[timeSelect.length] = new Option(time, time);
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

document.addEventListener("DOMContentLoaded", function() {
    updateActivityOptions();
});

document.getElementById("birthday").addEventListener("focusout", validateAge);
document.getElementById("age").addEventListener("focusout", validateAge);

document.getElementById("email").addEventListener("focusout", validateEmail);

document.getElementById("tel").addEventListener("focusout", validateTel);

