const targets = {
    "Underweight": { cal: 2800, protein: 145 },
    "Underweight (Age 60+)": { cal: 2100, protein: 120 },
    "Normal Weight (BMI 18.5–24.5)": { cal: 2200, protein: 150 },
    "Normal Weight (Age 46–59)": { cal: 2200, protein: 150 },
    "Normal Weight (Age 60+)": { cal: 1950, protein: 130 },
    "Overweight (BMI >25)": { cal: 1750, protein: 150 },
    "Overweight (Age 46–59)": { cal: 1700, protein: 140 },
    "Overweight (Age 60+)": { cal: 1650, protein: 130 },

}
const foodData = {
    "cup vegetables": { cal: 60, protein: 2 },
    "teaspoon oil": { cal: 45, protein: 0 },
    "cup rice": { cal: 205, protein: 4.3 },
    "rice": { cal: 1.30, protein: 0.03 },
    "fish": { cal: 0.90, protein: 0.22 },
    "chicken": { cal: 2, protein: 0.3 },
    "oats": { cal: 3.89, protein: 0.17 },
    "vegetables": { cal: 0.50, protein: 0.02 },
    "yogurt": { cal: 0.6, protein: 0.035 },
    "lentils": { cal: 1.1, protein: 0.26 },
    "egg": { cal: 78, protein: 6.3 },
    "bread": { cal: 80, protein: 3 },
    "banana": { cal: 100, protein: 1 },
    "milk": { cal: 150, protein: 8 },
    "buttermilk": { cal: 110, protein: 9 },
    "peanut butter": { cal: 95, protein: 4 },
    "shake": { cal: 150, protein: 30 },
    "chapati": { cal: 120, protein: 4 },
    "paneer": { cal: 3.2, protein: 0.21 }
}
const dietDatabase = {
    "Underweight": ["egg", "bread", "peanut butter", "banana", "milk", "oats", "honey", "rice", "fish", "chicken", "paneer", "vegetables", "yogurt", "legumes", "lentils", "beans", "shake"],
    "Underweight (Age 60+)": ["egg", "bread", "peanut butter", "banana", "milk", "oats", "honey", "rice", "fish", "chicken", "paneer", "vegetables", "yogurt", "legumes", "lentils", "beans", "shake"],
    "Normal Weight (BMI 18.5–24.5)": ["egg", "bread", "peanut butter", "banana", "milk", "yogurt", "fruit", "olive oil", "oats", "honey", "rice", "fish", "chicken", "paneer", "vegetables", "legumes", "lentils", "beans", "shake"],
    "Normal Weight (Age 46–59)": ["egg", "bread", "peanut butter", "banana", "milk", "yogurt", "fruit", "olive oil", "oats", "honey", "rice", "fish", "chicken", "paneer", "vegetables", "legumes", "lentils", "beans", "shake"],
    "Normal Weight (Age 60+)": ["egg", "bread", "peanut butter", "banana", "milk", "yogurt", "fruit", "olive oil", "oats", "honey", "rice", "fish", "chicken", "paneer", "vegetables", "legumes", "lentils", "beans", "shake"],
    "Overweight (BMI >25)": ["egg", "bread", "fruit", "peanut butter", "banana", "whole-grain", "oats", "milk", "honey", "yogurt", "almonds", "walnuts", "fruit", "chapati", "rice", "vegetables", "oil", "ghee", "legumes", "buttermilk", "dal", "fish", "chicken", "paneer", "lentils", "beans", "shake"],
    "Overweight (Age 46–49)": ["egg", "bread", "fruit", "peanut butter", "banana", "whole-grain", "oats", "milk", "honey", "yogurt", "almonds", "walnuts", "fruit", "chapati", "rice", "vegetables", "oil", "ghee", "legumes", "buttermilk", "dal", "fish", "chicken", "paneer", "lentils", "beans", "shake"],
    "Overweight (Age 60+)": ["egg", "bread", "fruit", "peanut butter", "banana", "whole-grain", "oats", "milk", "honey", "yogurt", "almonds", "walnuts", "fruit", "chapati", "rice", "vegetables", "oil", "ghee", "legumes", "buttermilk", "dal", "fish", "chicken", "paneer", "lentils", "beans", "shake"]
}

const dailydata = () => {
    const rows = document.querySelectorAll("tbody tr");
    let dailyEntries = [];

    rows.forEach((row, index) => {
        const inputs = row.querySelectorAll("textarea");
        if (inputs.length >= 3) {
            dailyEntries.push({
                day: `Day ${index + 1}`,
                breakfast: inputs[0].value,
                lunch: inputs[1].value,
                dinner: inputs[2].value
            })
        }
    });
    localStorage.setItem("user_daily_diet", JSON.stringify(dailyEntries))
    alert("Submit")
}

const weeklydata = () => {
    const UserCategory = localStorage.getItem("user_fitness_category");
    const UserEntries = JSON.parse(localStorage.getItem("user_daily_diet"));

    if (!UserCategory || !UserEntries) {
        alert("First, use daily data or check your plan.")
        return;
    }
    if (UserEntries.length < 7) {
        alert(`To see the average, it is necessary to have at least 7 days of data. Currently, only ${UserEntries.length} days of data are saved.`);
        
        if (visibleSection) {
            visibleSection.style.display = "none";
        }
        return; 
    }

    const targetCal = targets[UserCategory]?.cal || 2000;
    const targetProtein = targets[UserCategory]?.protein || 100;

    let totalCal = 0;
    let totalProtein = 0;
    let matchcount = 0;


    UserEntries.forEach(entry => {
        const fulldaytext = `${entry.breakfast} ${entry.lunch} ${entry.dinner}`.toLowerCase();
        let dayCals = 0;
        let dayProtein = 0;

        for (let item in foodData) {
            const regex = new RegExp(`(\\d+(?:\\.\\d+)?)?\\s*(?:g|gram|grams|teaspoon|tsp|cup|cups|slice|slices)?\\s*(?:of)?\\s*\\b${item}(?:s|es)?\\b`, 'g');
            let match

            while ((match = regex.exec(fulldaytext)) !== null) {
                const quantity = match[1] ? parseFloat(match[1]) : 1;
                dayCals += foodData[item].cal * quantity;
                dayProtein += foodData[item].protein * quantity;
            }
        }

        totalCal += dayCals;
        totalProtein += dayProtein;

        const keywords = dietDatabase[UserCategory] || [];
        let dayMatch = 0;
        keywords.forEach(word => {
            if (fulldaytext.includes(word.toLowerCase())) {
                dayMatch++;
            }
        })
        if (dayMatch >= 2) matchcount++
    })
    const daysLog = UserEntries.length || 1;
    const avgCals = totalCal / daysLog;
    const avgProtein = totalProtein / daysLog;
    const performance = (matchcount / daysLog) * 100;

    const calorieDiff = avgCals - targetCal;
    let surplusDeficitMsg = "";

    if (calorieDiff > 0) {
        surplusDeficitMsg = `Surplus of ${calorieDiff.toFixed(0)} kcal`;
    } else {
        surplusDeficitMsg = `Deficit of ${Math.abs(calorieDiff).toFixed(0)} kcal`;
    }

    // console.log(`
    //     --- WEEKLY PROGRESS REPORT ---
    //     Performance: ${performance.toFixed(0)}% Adherence

    //     Daily Average Intake:
    //     - Calories: ${avgCals.toFixed(0)} / ${targetCal} kcal
    //     - Protein: ${avgProtein.toFixed(1)} / ${targetProtein}g

    //     Result: ${surplusDeficitMsg}
    //     ${UserCategory === "Underweight" && calorieDiff < 0 ? "⚠️ You need to eat more to gain weight!" : ""}
    //     ${UserCategory === "Overweight (Age 46–49)" && calorieDiff > 0 ? "⚠️ You need to reduce calories for fat loss!" : ""}
    // `);
    const scoreElement = document.querySelector('.score');
    const barInner = document.querySelector('.bar-inner');
    if (scoreElement) scoreElement.innerText = `${performance.toFixed(0)}/100`;
    if (barInner) {
        barInner.style.width = `${performance}%`;
        barInner.style.backgroundColor = performance > 70 ? "#82a884" : "#d8967b";
    }

    const calBox = document.querySelectorAll('.stat-item')[0];
    if (calBox) {
        const calPercent = Math.min((avgCals / targetCal) * 100, 100);

        calBox.querySelector('h3').innerText = `${calPercent.toFixed(0)}%`;
        calBox.querySelector('.mini-bar-fill').style.width = `${calPercent}%`;
        calBox.querySelector('.mini-bar-fill').style.backgroundColor = "#d8967b";

        calBox.querySelector('p').innerText = `${avgCals.toFixed(0)} kcal / ${targetCal} kcal`;
    }

    const proBox = document.querySelectorAll('.stat-item')[1];
    if (proBox) {
        const proPercent = Math.min((avgProtein / targetProtein) * 100, 100);

        proBox.querySelector('h3').innerText = `${proPercent.toFixed(0)}%`;
        proBox.querySelector('.mini-bar-fill').style.width = `${proPercent}%`;
        proBox.querySelector('.mini-bar-fill').style.backgroundColor = "#d8967b";
        proBox.querySelector('p').innerText = `${avgProtein.toFixed(1)}g / ${targetProtein}g`;
    }

    const motivationText = document.querySelector('.motivation-footer p');
    if (motivationText) {
        let advice = `Your ${surplusDeficitMsg}. `;
        if (UserCategory === "Underweight" && calorieDiff < 0) {
            advice += "Try to increase nuts and dairy products so that they can grow!";
        } else if (UserCategory === "Overweight (Age 46–49)" && calorieDiff > 0) {
            advice += "Pay attention to port control and increase fiber for foot loss.";
        } else {
            advice += "Keep going, your consistency is paving the way to success. Fantastic work!";
        }
        motivationText.innerText = advice;
    }


}

const progressBtn = document.querySelector('.pgs');
const weeklyBtn = document.querySelector('#weekly-btn');
const visibleSection = document.querySelector('.container-main');

function toggleProgressBox() {
    if (visibleSection.style.display === "none" || visibleSection.style.display === "") {
        visibleSection.style.display = "block";
        if (typeof weeklydata === 'function') {
            weeklydata();
        }
    } else {
        visibleSection.style.display = "none";
    }
}

if (progressBtn) {
    progressBtn.addEventListener("click", toggleProgressBox);
}

if (weeklyBtn) {
    weeklyBtn.addEventListener("click", () => {
        if (visibleSection) {
            visibleSection.style.display = "block";
        }
        if (typeof weeklydata === 'function') {
            weeklydata();
        }
    });
}

const logout = () => {
    try {
        localStorage.removeItem("authToken")
        window.location.href = "index.html"
    } catch (error) {
        alert("Did someone come across an example while doing the logOut?", error)
    }
}