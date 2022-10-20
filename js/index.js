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

document.addEventListener("DOMContentLoaded", function() {
    updateActivityOptions();
});

document.getElementById("birthday").addEventListener("input", function() {
    alert("Test");
});