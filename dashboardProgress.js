let targets = {};
let foodData = {};
let dietDatabase = {};

const getActiveUserId = () => {
    const directId = localStorage.getItem("user_id");
    if (directId) return directId;
    
    try {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser && loggedInUser.id) {
            localStorage.setItem("user_id", loggedInUser.id); 
            return loggedInUser.id;
        }
    } catch (e) {
        console.error("Error reading user session", e);
    }
    return null;
};

const fetchNutritionConfig = () => {
    fetch('https://bodyple-backend.vercel.app/get-nutrition-config')
        .then(res => res.json())
        .then(data => {
            targets = data.targets || {};
            foodData = data.foodData || {};
            dietDatabase = data.dietDatabase || {};
        })
        .catch(err => console.error("Config fetch error:", err));
};

const saveDietToDB = async () => {
    const userId = getActiveUserId();
    let category = localStorage.getItem("user_fitness_category");

    // Fix 1: If category is missing in localStorage, try fetching from user history first
    if (!category || category.trim() === "") {
        try {
            const historyRes = await fetch(`https://bodyple-backend.vercel.app/get-user-history?userId=${userId}`);
            const historyData = await historyRes.json();
            if (historyData && historyData.category) {
                category = historyData.category;
                localStorage.setItem("user_fitness_category", category);
            }
        } catch (e) {
            console.error("Failed to recover category automatically", e);
        }
    }

    if (!userId) {
        alert("User session not found! Please log out and log in again.");
        return;
    }

    const rows = document.querySelectorAll("tbody tr");
    let dailyEntries = [];

    rows.forEach((row, index) => {
        const inputs = row.querySelectorAll("textarea");
        if (inputs.length >= 3) {
            dailyEntries.push({
                day: `Day ${index + 1}`,
                breakfast: inputs[0].value.trim(),
                lunch: inputs[1].value.trim(),
                dinner: inputs[2].value.trim()
            });
        }
    });

    const validEntries = dailyEntries.filter(
        entry => entry.breakfast !== "" || entry.lunch !== "" || entry.dinner !== ""
    );

    localStorage.setItem("user_daily_diet", JSON.stringify(validEntries));

    fetch('https://bodyple-backend.vercel.app/save-diet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
            category: category || "", // Now populated from local storage or recovered history
            dietData: dailyEntries
        })
    })
        .then(res => res.json())
        .then(data => {
            alert("Diet Plan successfully saved!");
            disableInputs(true);
            updateProgressButtonStatus();
        })
        .catch(err => {
            console.error("Save Error:", err);
            alert("Error saving diet plan to database.");
        });
};

const loadSavedDiet = () => {
    const userId = getActiveUserId();

    if (!userId) {
        console.warn("No user ID found in localStorage.");
        return;
    }

    fetch(`https://bodyple-backend.vercel.app/get-diet?userId=${userId}`)
        .then(res => res.json())
        .then(response => {
            const dietData = response.data || [];
            const savedCategory = response.category;

            // Fix 2: Only overwrite local storage category if response actually contains a valid category
            if (savedCategory && savedCategory.trim() !== "") {
                localStorage.setItem("user_fitness_category", savedCategory);
            }

            const rows = document.querySelectorAll("tbody tr");

            if (dietData.length > 0) {
                dietData.forEach((entry, index) => {
                    if (rows[index]) {
                        const inputs = rows[index].querySelectorAll("textarea");
                        if (inputs.length >= 3) {
                            inputs[0].value = entry.breakfast || "";
                            inputs[1].value = entry.lunch || "";
                            inputs[2].value = entry.dinner || "";
                        }
                    }
                });

                const validEntries = dietData.filter(
                    entry => (entry.breakfast && entry.breakfast.trim() !== "") ||
                        (entry.lunch && entry.lunch.trim() !== "") ||
                        (entry.dinner && entry.dinner.trim() !== "")
                );

                if (validEntries.length > 0) {
                    disableInputs(true);
                }

                localStorage.setItem("user_daily_diet", JSON.stringify(validEntries));
            }
        })
        .catch(err => console.error("Error loading diet:", err))
        .finally(() => {
            updateProgressButtonStatus();
        });
};

const disableInputs = (shouldDisable) => {
    const textareas = document.querySelectorAll("tbody textarea");
    textareas.forEach(input => {
        input.disabled = shouldDisable;

        if (shouldDisable) {
            input.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
            input.style.opacity = "0.6";
            input.style.border = "1px solid transparent";
        } else {
            input.style.backgroundColor = "transparent";
            input.style.opacity = "1";
            input.style.border = "1px solid #82a884";
        }
    });

    const saveBtn = document.getElementById("save-btn");
    const editBtn = document.getElementById("edit-btn");

    if (shouldDisable) {
        if (saveBtn) saveBtn.style.display = "none";
        if (editBtn) editBtn.style.display = "inline-block";
    } else {
        if (saveBtn) {
            saveBtn.style.display = "inline-block";
            saveBtn.innerText = "Update Data";
        }
        if (editBtn) editBtn.style.display = "none";
    }
};

const toggleEditMode = () => {
    disableInputs(false);
};

const updateProgressButtonStatus = () => {
    const UserEntries = JSON.parse(localStorage.getItem("user_daily_diet")) || [];
    const progressBtn = document.querySelector('.pgs');
    const weeklyBtn = document.querySelector('#weekly-btn');

    const isLessThan7Days = UserEntries.length < 7;

    [progressBtn, weeklyBtn].forEach(btn => {
        if (btn) {
            btn.disabled = isLessThan7Days;

            if (isLessThan7Days) {
                btn.style.opacity = "0.5";
                btn.style.cursor = "not-allowed";
                btn.title = `Please enter at least 7 days of diet data to view progress. (${UserEntries.length}/7 days added)`;
            } else {
                btn.style.opacity = "1";
                btn.style.cursor = "pointer";
                btn.title = "View Weekly Progress";
            }
        }
    });
};

const weeklydata = () => {
    const UserCategory = localStorage.getItem("user_fitness_category");
    const UserEntries = JSON.parse(localStorage.getItem("user_daily_diet"));

    if (!UserCategory || !UserEntries) {
        alert("First, use daily data or check your plan.");
        return;
    }
    if (UserEntries.length < 7) {
        alert(`At least 7 days of data required! Currently you have ${UserEntries.length} days.`);
        if (visibleSection) visibleSection.style.display = "none";
        return;
    }

    const targetCal = targets[UserCategory]?.cal || 2000;
    const targetProtein = targets[UserCategory]?.protein || 100;

    let totalCal = 0;
    let totalProtein = 0;
    let matchcount = 0;

    const unitMultipliers = {
        'liter': 1000, 'liters': 1000, 'l': 1000, 'kg': 1000,
        'glass': 250, 'glasses': 250, 'cup': 240, 'cups': 240,
        'tbsp': 15, 'tablespoon': 15, 'tablespoons': 15,
        'tsp': 5, 'teaspoon': 5, 'teaspoons': 5, 'g': 1,
        'gram': 1, 'grams': 1, 'ml': 1
    };

    UserEntries.forEach(entry => {
        const fulldaytext = `${entry.breakfast} ${entry.lunch} ${entry.dinner}`.toLowerCase();
        let dayCals = 0;
        let dayProtein = 0;

        for (let item in foodData) {
            const regex = new RegExp(`(\\d+(?:\\.\\d+)?)?\\s*(liter|liters|l|kg|glass|glasses|cup|cups|tbsp|tablespoon|tablespoons|tsp|teaspoon|teaspoons|g|gram|grams|ml)?\\s*(?:of)?\\s*\\b${item}(?:s|es)?\\b`, 'g');
            let match;

            while ((match = regex.exec(fulldaytext)) !== null) {
                const rawQuantity = match[1] ? parseFloat(match[1]) : 1;
                const unit = match[2] ? match[2].toLowerCase() : null;
                let multiplier = (unit && unitMultipliers[unit]) ? unitMultipliers[unit] : 1;
                const totalQuantity = rawQuantity * multiplier;

                dayCals += foodData[item].cal * totalQuantity;
                dayProtein += foodData[item].protein * totalQuantity;
            }
        }

        totalCal += dayCals;
        totalProtein += dayProtein;

        const keywords = dietDatabase[UserCategory] || [];
        let dayMatch = 0;
        keywords.forEach(word => {
            if (fulldaytext.includes(word.toLowerCase())) dayMatch++;
        });
        if (dayMatch >= 2) matchcount++;
    });

    const daysLog = UserEntries.length || 1;
    const avgCals = totalCal / daysLog;
    const avgProtein = totalProtein / daysLog;
    const performance = (matchcount / daysLog) * 100;

    const calorieDiff = avgCals - targetCal;
    let surplusDeficitMsg = calorieDiff > 0
        ? `Surplus of ${calorieDiff.toFixed(0)} kcal`
        : `Deficit of ${Math.abs(calorieDiff).toFixed(0)} kcal`;

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
        if (UserCategory.includes("Underweight") && calorieDiff < 0) {
            advice += "Try to increase nuts and dairy products so that they can grow!";
        } else if (UserCategory.includes("Overweight") && calorieDiff > 0) {
            advice += "Pay attention to portion control and increase fiber for weight loss.";
        } else {
            advice += "Keep going, your consistency is paving the way to success. Fantastic work!";
        }
        motivationText.innerText = advice;
    }
};

const loadUserBMIHistory = () => {
    const userId = getActiveUserId();

    if (!userId) return;

    fetch(`https://bodyple-backend.vercel.app/get-user-history?userId=${userId}`)
        .then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || data.message || "Server Error");
            }
            if (data.category) {
                localStorage.setItem("user_fitness_category", data.category);
            }
            return data;
        })
        .catch(err => console.error("Error fetching BMI history:", err.message));
};

document.addEventListener("DOMContentLoaded", () => {
    fetchNutritionConfig();
    loadUserBMIHistory();
    loadSavedDiet();
    updateProgressButtonStatus();
});

const progressBtn = document.querySelector('.pgs');
const weeklyBtn = document.querySelector('#weekly-btn');
const visibleSection = document.querySelector('.container-main');

function toggleProgressBox() {
    if (visibleSection.style.display === "none" || visibleSection.style.display === "") {
        visibleSection.style.display = "block";
        if (typeof weeklydata === 'function') weeklydata();
    } else {
        visibleSection.style.display = "none";
    }
}

if (progressBtn) progressBtn.addEventListener("click", toggleProgressBox);
if (weeklyBtn) {
    weeklyBtn.addEventListener("click", () => {
        if (visibleSection) visibleSection.style.display = "block";
        if (typeof weeklydata === 'function') weeklydata();
    });
}

const logout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("authToken");
    localStorage.clear(); 

    window.location.replace("index.html");
};