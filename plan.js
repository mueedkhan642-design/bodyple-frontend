const userdata = JSON.parse(localStorage.getItem("user_data"))

if (userdata) {
    const lastUser = userdata[userdata.length - 1]
    document.getElementById("guest").innerText = lastUser.username
    document.getElementById("guest").style.color = "#2d3436"
}

const toggleHeight = () => {
    const unit = document.getElementById("options").value;
    const heightArea = document.getElementById("height_area");
    const selectHtml = document.getElementById("options").outerHTML;

    if (unit === "feet") {
        heightArea.innerHTML = `
        <div style="display: flex; gap: 5px; width: 100%;">
             <input type="number" id="ft" class="hp-text-input" placeholder="Ft" style="width: 25%;">
             <input type="number" id="in" class="hp-text-input" placeholder="In" style="width: 25%;">
             ${selectHtml}
        </div>     
        `;
    } else if (unit === "Inches") {
        heightArea.innerHTML = `
        <div style="display: flex; width: 100%;">
             <input type="number" id="height" class="hp-text-input" placeholder="Inches (e.g. 66)">
             ${selectHtml}
        </div>
    `;
    } else if (unit === "Meters") {
        heightArea.innerHTML = `
        <div style="display: flex; width: 100%;">
             <input type="number" id="height" class="hp-text-input" placeholder="meters (e.g. 1.701)">
             ${selectHtml}
        </div>
    `;
    } else if (unit === "centimeters") {
        heightArea.innerHTML = `
        <div style="display: flex; width: 100%;">
             <input type="number" id="height" class="hp-text-input" placeholder="cm (e.g. 167.64)">
             ${selectHtml}
        </div>
    `;
    }
    document.getElementById("options").value = unit;
}
const plan = () => {
    const age = parseFloat(document.getElementById("age").value);
    const unit = document.getElementById("options").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const result = document.getElementById("result");
    let heightInMeters = 0;

    if (unit === "feet") {
        const ft = parseFloat(document.getElementById("ft").value);
        const In = parseFloat(document.getElementById("in").value);

        heightInMeters = (ft * 0.3048) + (In * 0.0254);
    } else if (unit === "Inches") {
        const val = parseFloat(document.getElementById("height").value);

        heightInMeters = val * 0.0254;
    } else if (unit === "centimeters") {
        const val = parseFloat(document.getElementById("height").value);

        heightInMeters = val / 100;
    } else {
        const val = parseFloat(document.getElementById("height").value);

        heightInMeters = val;
    } 
    const BMI = (weight) / (heightInMeters * heightInMeters);

    let heading = "";
    let category = "";
    let workout = "";
    let diet = "";
    if (!age || !heightInMeters || !weight) {
        document.getElementById("mssg").innerText = "Kindly fill the correct information!";
        return;
    }

    if (BMI < 18.5) {
        if (age >= 14 && age <= 45) {
            heading = "Your 4-week Fitness Plan";
            category = "Underweight";
            workout = `
        <h2>WORKOUT PLAN ❚█══█❚</h2>
        <h3>Day 1: Chest + Triceps</h3>
        <ul>
         <li>Push ups                    Reps 10 × 3 sets</li>
         <li>Bench Press                 Reps 10 × 3 sets</li>
         <li>Incline Dumbbell Press      Reps 10 × 3 sets</li>
         <li>Dumbbell Overhead Tricep    Reps 12 × 3 sets</li>
         <li>Rope Pushdowns Tricep       Reps 12 × 3 sets</li>
        </ul>

        <h3>Day 2: Back + Biceps</h3>
        <ul>
         <li>Cable lat Pull Down         Reps 10 × 3 sets</li>
         <li>Barbell Bent Over Row       Reps 10 × 3 sets</li>
         <li>Seated Cable Row            Reps 10 × 3 sets</li>
         <li>Barbell Curl                Reps 12 × 3 sets</li>
         <li>Hammer Curl                 Reps 12 × 3 sets</li>
        </ul>

        <h3>Day 3: Active Recovery</h3>
        <ul>
         <li>Cobra Stretch               20-30 seconds × 3 sets</li>
         <li>Standing Quad Stretch       20-30 seconds × 3 sets</li>
         <li>Cross-Body Shoulder Stretch 15-20 seconds × 3 sets</li>
        </ul>

        <h3>Day 4: Legs</h3>
        <ul>
         <li>Barbell Back Squats         Reps 12 × 3 sets</li>
         <li>Front Leg Extension         Reps 12 × 3 sets</li>
         <li>Calf Raises                 Reps 12 × 3 sets</li>
        </ul>

        <h3>Tips:</h3>
        <ul>
         <li>Increase protein intake</li>
         <li>Avoid Junk Food</li>
         <li>Eat in calorie surplus</li>
         <li>Stay consistent</li>
        </ul>
        `;
            diet = `
            <h3>Breakfast</h3>
            <ul>
            <li>2–3 eggs (boiled, scrambled, or omelet)</li>
            <li>2 slices of whole-grain bread with peanut butter</li>
            <li>1 banana or berries</li>
            <li>1 glass of full-fat milk or a smoothie with yogurt</li>
            </ul>
            
            <h3>Mid-Morning Snack</h3>
            <ul>
            <li>Handful of nuts (almonds, cashews, walnuts)</li>
            <li>1 fruit (apple, mango, or orange)</li>
            </ul>

            <h3>Lunch</h3>
            <ul>
            <li>1 cup cooked brown rice / quinoa / whole wheat pasta</li>
            <li>1 cup cooked brown rice / quinoa / whole wheat pasta</li>
            <li>1–2 cups cooked vegetables</li>
            <li>1 teaspoon olive oil on vegetables</li>
            </ul>

            <h3>Afternoon Snack</h3>
            <ul>
            <li>Greek yogurt or curd with honey and nuts</li>
            <li>1 small smoothie (milk + banana + oats + peanut butter)</li>
            </ul> 

            <h3>Dinner</h3>
            <ul>
            <li>1–2 chapatis or whole-grain bread</li>
            <li>150g lean meat / lentils / beans / paneer</li>
            <li>1–2 cups cooked vegetables</li>
            <li>1 small serving of rice or quinoa</li>
            </ul>
            `
        } else if (age >= 46 && age <= 59) {
            heading = "Your 4-week Fitness Plan";
            category = "Underweight";
            workout = `
        <h2>WORKOUT PLAN ❚█══█❚</h2>

        <h3>Day 1: Chest + Triceps</h3>
            <ul>
             <li>Push ups                    Reps 8–10 × 3 sets</li>
             <li>Bench Press (light/moderate)Reps 8–10 × 3 sets</li>
             <li>Incline Dumbbell Press      Reps 8–10 × 3 sets</li>
             <li>Dumbbell Overhead Tricep    Reps 10–12 × 3 sets</li>
            <li>Rope Pushdowns Tricep       Reps 10–12 × 3 sets</li>
            </ul>

<h3>Day 2: Back + Biceps</h3>
<ul>
 <li>Cable Lat Pull Down         Reps 8–10 × 3 sets</li>
 <li>Barbell Bent Over Row       Reps 8–10 × 3 sets</li>
 <li>Seated Cable Row            Reps 8–10 × 3 sets</li>
 <li>Barbell Curl                Reps 10–12 × 3 sets</li>
 <li>Hammer Curl                 Reps 10–12 × 3 sets</li>
</ul>

<h3>Day 3: Active Recovery / Stretching</h3>
<ul>
 <li>Cobra Stretch               20–30 seconds × 3 sets</li>
 <li>Standing Quad Stretch       20–30 seconds × 3 sets</li>
 <li>Cross-Body Shoulder Stretch 15–20 seconds × 3 sets</li>
 <li>Gentle Walk / 15–20 min     Optional</li>
</ul>

<h3>Day 4: Legs + Core</h3>
<ul>
 <li>Barbell Back Squats (light)  Reps 10 × 3 sets</li>
 <li>Front Leg Extension          Reps 10 × 3 sets</li>
 <li>Calf Raises                  Reps 12 × 3 sets</li>
 <li>Plank                        Hold 20–30 sec × 3 sets</li>
</ul>

<h3>Tips:</h3>
<ul>
<li>Focus on protein-rich foods and healthy fats</li>
<li>Avoid processed and junk foods</li>
<li>Eat in a consistent calorie surplus</li>
<li>Do gentle strength training to avoid joint stress</li>
<li>Stay hydrated and rest well</li>
</ul>
`;

            diet = `

<h3>Breakfast</h3>
<ul>
<li>2 boiled or scrambled eggs</li>
<li>2 slices of whole-grain bread with peanut butter or avocado</li>
<li>1 banana or seasonal berries</li>
<li>1 glass of full-fat milk or yogurt smoothie (with oats and honey)</li>
</ul>

<h3>Mid-Morning Snack</h3>
<ul>
<li>Handful of mixed nuts (almonds, cashews, walnuts)</li>
<li>1 fruit (apple, pear, or orange)</li>
</ul>

<h3>Lunch</h3>
<ul>
<li>1 cup cooked brown rice / quinoa / whole wheat pasta</li>
<li>150–200g grilled fish / chicken / paneer / lentils</li>
<li>1–2 cups cooked vegetables (broccoli, carrots, beans)</li>
<li>1 tsp olive oil or ghee on vegetables</li>
</ul>

<h3>Afternoon Snack</h3>
<ul>
<li>Greek yogurt or curd with honey and nuts</li>
<li>Small smoothie: milk + banana + oats + peanut butter</li>
</ul> 

<h3>Dinner</h3>
<ul>
<li>1–2 chapatis or whole-grain bread</li>
<li>150g lean protein (chicken, fish, paneer, or legumes)</li>
<li>1–2 cups cooked vegetables</li>
<li>1 small serving of rice or quinoa</li>
<li>Optional: 1 tsp olive oil or butter</li>
</ul>

<h3>Before Bed</h3>
<ul>
<li>1 glass warm milk with honey</li>
<li>Optional: handful of nuts</li>
</ul>
`;
        } else if (age >= 60) {
            heading = "Your 4-week Fitness Plan";
            category = "Underweight (Age 60+)";
            workout = `
<h2>WORKOUT PLAN ❚█══█❚</h2>

<h3>Day 1: Chest + Arms (Light)</h3>
<ul>
 <li>Wall Push-ups                 Reps 8–10 × 3 sets</li>
 <li>Seated Dumbbell Press         Reps 8–10 × 3 sets</li>
 <li>Dumbbell Bicep Curl (light)  Reps 10 × 3 sets</li>
 <li>Tricep Extension (light)     Reps 10 × 3 sets</li>
</ul>

<h3>Day 2: Back + Shoulders</h3>
<ul>
 <li>Seated Row (resistance band) Reps 8–10 × 3 sets</li>
 <li>Lat Pull Down (light)         Reps 8–10 × 3 sets</li>
 <li>Shoulder Shrugs               Reps 10 × 3 sets</li>
 <li>Gentle Dumbbell Lateral Raise Reps 8–10 × 3 sets</li>
</ul>

<h3>Day 3: Active Recovery / Flexibility</h3>
<ul>
 <li>Neck Stretch                  15–20 sec × 3 sets</li>
 <li>Seated Hamstring Stretch      20–30 sec × 3 sets</li>
 <li>Shoulder Stretch              15–20 sec × 3 sets</li>
 <li>Short Walk (10–15 min)       Optional</li>
</ul>

<h3>Day 4: Legs + Core (Low Impact)</h3>
<ul>
 <li>Seated Leg Press / Mini Squat Reps 8–10 × 3 sets</li>
 <li>Calf Raises (holding chair)         Reps 10–12 × 3 sets</li>
 <li>Seated Knee Extension               Reps 8–10 × 3 sets</li>
 <li>Gentle Core Twist (seated)         Reps 10 × 3 sets</li>
</ul>

<h3>Tips:</h3>
<ul>
<li>Focus on protein-rich, easy-to-digest foods</li>
<li>Include healthy fats for calories</li>
<li>Avoid strenuous high-impact workouts</li>
<li>Stay hydrated and take small, frequent meals</li>
<li>Rest adequately between sets</li>
</ul>
`;

            diet = `

<h3>Breakfast</h3>
<ul>
<li>2 soft-boiled or scrambled eggs</li>
<li>2 slices of whole-grain bread or porridge with milk</li>
<li>1 soft fruit (banana, papaya, or stewed apple)</li>
<li>1 glass of full-fat milk or fortified yogurt</li>
</ul>

<h3>Mid-Morning Snack</h3>
<ul>
<li>Handful of soaked nuts (almonds, walnuts)</li>
<li>1 fruit or 1 small glass of fresh juice</li>
</ul>

<h3>Lunch</h3>
<ul>
<li>1 cup cooked rice / soft quinoa / whole wheat pasta</li>
<li>100–150g soft protein (steamed fish, chicken, paneer, lentils)</li>
<li>1–2 cups cooked vegetables (well-cooked or mashed if needed)</li>
<li>1 tsp olive oil or ghee for calories</li>
</ul>

<h3>Afternoon Snack</h3>
<ul>
<li>Greek yogurt with honey or mashed fruit</li>
<li>Small smoothie: milk + banana + oats + nut butter</li>
</ul> 

<h3>Dinner</h3>
<ul>
<li>1–2 soft chapatis or bread</li>
<li>100–150g protein (lentils, soft fish, chicken, or paneer)</li>
<li>1–2 cups soft cooked vegetables</li>
<li>Optional: 1 tsp olive oil or butter</li>
</ul>

<h3>Before Bed</h3>
<ul>
<li>1 glass warm milk with honey</li>
<li>Optional: a few soaked almonds or walnuts</li>
</ul>
`;
        }
    } else if (BMI >= 18.5 && BMI <= 25) {
        if (age >= 14 && age <= 45) {
            heading = "Your 5-week Fitness Plan";
            category = "Normal Weight (BMI 18.5–24.5)";
            workout = `
<h2>WORKOUT PLAN ❚█══█❚</h2>

<h3>Day 1: Chest + Triceps</h3>
<ul>
 <li>Push ups                    Reps 12 × 3 sets</li>
 <li>Bench Press                 Reps 10 × 3 sets</li>
 <li>Incline Dumbbell Press      Reps 10 × 3 sets</li>
 <li>Dumbbell Overhead Tricep    Reps 12 × 3 sets</li>
 <li>Rope Pushdowns Tricep       Reps 12 × 3 sets</li>
</ul>

<h3>Day 2: Back + Biceps</h3>
<ul>
 <li>Cable Lat Pull Down         Reps 10 × 3 sets</li>
 <li>Barbell Bent Over Row       Reps 10 × 3 sets</li>
 <li>Seated Cable Row            Reps 10 × 3 sets</li>
 <li>Barbell Curl                Reps 12 × 3 sets</li>
 <li>Hammer Curl                 Reps 12 × 3 sets</li>
</ul>

<h3>Day 3: Active Recovery / Cardio</h3>
<ul>
 <li>Brisk Walking / Jogging     20–30 minutes</li>
 <li>Cobra Stretch               20–30 seconds × 3 sets</li>
 <li>Standing Quad Stretch       20–30 seconds × 3 sets</li>
 <li>Cross-Body Shoulder Stretch 15–20 seconds × 3 sets</li>
</ul>

<h3>Day 4: Legs + Core</h3>
<ul>
 <li>Barbell Back Squats         Reps 12 × 3 sets</li>
 <li>Front Leg Extension         Reps 12 × 3 sets</li>
 <li>Calf Raises                 Reps 15 × 3 sets</li>
 <li>Plank                       30–45 sec × 3 sets</li>
</ul>

<h3>Day 5: Full Body + Cardio</h3>
<ul>
 <li>Jump Rope / Cycling         10–15 minutes</li>
 <li>Push ups                    Reps 10 × 3 sets</li>
 <li>Dumbbell Squats             Reps 12 × 3 sets</li>
 <li>Light Stretching            10 minutes</li>
</ul>

<h3>Tips:</h3>
<ul>
<li>Maintain balanced diet (not excess calories)</li>
<li>Focus on protein for muscle maintenance</li>
<li>Include cardio 2–3 times per week</li>
<li>Avoid junk and sugary drinks</li>
<li>Stay consistent and sleep 7–8 hours</li>
</ul>
`;

            diet = `

<h3>Breakfast</h3>
<ul>
<li>2 eggs (boiled or omelet)</li>
<li>2 slices whole-grain bread or oats</li>
<li>1 fruit (banana, apple, or berries)</li>
<li>1 glass milk or yogurt</li>
</ul>

<h3>Mid-Morning Snack</h3>
<ul>
<li>Handful of nuts (almonds, walnuts)</li>
<li>1 fruit or fresh juice</li>
</ul>

<h3>Lunch</h3>
<ul>
<li>1 cup brown rice / chapati (1–2)</li>
<li>150g chicken / fish / lentils / beans</li>
<li>1–2 cups vegetables</li>
<li>1 tsp olive oil or ghee</li>
</ul>

<h3>Afternoon Snack</h3>
<ul>
<li>Yogurt or smoothie (milk + fruit)</li>
<li>Optional: peanut butter sandwich</li>
</ul> 

<h3>Dinner</h3>
<ul>
<li>1–2 chapatis or small rice portion</li>
<li>150g protein (chicken, fish, paneer, or dal)</li>
<li>Cooked vegetables or salad</li>
</ul>

<h3>Optional (Post-Workout)</h3>
<ul>
<li>Banana + milk or protein shake</li>
</ul>
`;
        } else if (age >= 46 && age <= 59) {
            heading = "Your 5-week Fitness Plan";
            category = "Normal Weight (Age 46–59)";
            workout = `
<h2>WORKOUT PLAN ❚█══█❚</h2>

<h3>Day 1: Chest + Triceps</h3>
<ul>
 <li>Push ups (modified if needed) Reps 10 × 3 sets</li>
 <li>Bench Press (moderate)       Reps 8–10 × 3 sets</li>
 <li>Incline Dumbbell Press       Reps 8–10 × 3 sets</li>
 <li>Dumbbell Tricep Extension    Reps 10–12 × 3 sets</li>
 <li>Rope Pushdowns               Reps 10–12 × 3 sets</li>
</ul>

<h3>Day 2: Back + Biceps</h3>
<ul>
 <li>Lat Pull Down                Reps 8–10 × 3 sets</li>
 <li>Seated Cable Row             Reps 8–10 × 3 sets</li>
 <li>Dumbbell Row                 Reps 8–10 × 3 sets</li>
 <li>Barbell / Dumbbell Curl      Reps 10–12 × 3 sets</li>
 <li>Hammer Curl                 Reps 10–12 × 3 sets</li>
</ul>

<h3>Day 3: Active Recovery</h3>
<ul>
 <li>Brisk Walking                20–30 minutes</li>
 <li>Cobra Stretch                20–30 seconds × 3 sets</li>
 <li>Hamstring Stretch            20–30 seconds × 3 sets</li>
 <li>Shoulder Stretch             15–20 seconds × 3 sets</li>
</ul>

<h3>Day 4: Legs + Core</h3>
<ul>
 <li>Squats (bodyweight/light)    Reps 10–12 × 3 sets</li>
 <li>Leg Extension                Reps 10–12 × 3 sets</li>
 <li>Calf Raises                  Reps 12–15 × 3 sets</li>
 <li>Plank                        20–30 sec × 3 sets</li>
</ul>

<h3>Day 5: Light Full Body + Cardio</h3>
<ul>
 <li>Cycling / Walking            15–20 minutes</li>
 <li>Push ups (light)             Reps 8 × 3 sets</li>
 <li>Dumbbell Squats              Reps 10 × 3 sets</li>
 <li>Stretching                   10 minutes</li>
</ul>

<h3>Tips:</h3>
<ul>
<li>Use moderate weights, avoid heavy lifting</li>
<li>Focus on joint safety and proper form</li>
<li>Include cardio for heart health</li>
<li>Take 1–2 rest days per week</li>
<li>Sleep 7–8 hours daily</li>
</ul>
`;

            diet = `

<h3>Breakfast</h3>
<ul>
<li>2 eggs (boiled or omelet)</li>
<li>1–2 slices whole-grain bread or oats</li>
<li>1 fruit (apple, banana, or papaya)</li>
<li>1 glass milk or yogurt</li>
</ul>

<h3>Mid-Morning Snack</h3>
<ul>
<li>Handful of nuts (almonds, walnuts)</li>
<li>1 fruit or fresh juice</li>
</ul>

<h3>Lunch</h3>
<ul>
<li>1–2 chapatis or 1 cup brown rice</li>
<li>120–150g chicken / fish / lentils</li>
<li>1–2 cups vegetables</li>
<li>1 tsp olive oil or ghee</li>
</ul>

<h3>Afternoon Snack</h3>
<ul>
<li>Yogurt or buttermilk</li>
<li>Light snack (fruit or peanut butter sandwich)</li>
</ul> 

<h3>Dinner</h3>
<ul>
<li>1–2 chapatis or small rice portion</li>
<li>120–150g protein (chicken, fish, paneer, or dal)</li>
<li>Cooked vegetables or salad</li>
</ul>

<h3>Optional (Evening / Post-Workout)</h3>
<ul>
<li>Fruit + milk or light smoothie</li>
</ul>
`;
        } else if (age >= 60) {
            heading = "Your 5-week Fitness Plan";
            category = "Normal Weight (Age 60+)";
            workout = `
<h2>WORKOUT PLAN ❚█══█❚</h2>

<h3>Day 1: Upper Body (Light Strength)</h3>
<ul>
 <li>Wall Push-ups                 Reps 8–10 × 3 sets</li>
 <li>Seated Dumbbell Press        Reps 8–10 × 3 sets</li>
 <li>Light Bicep Curl             Reps 10 × 3 sets</li>
 <li>Tricep Extension (light)     Reps 10 × 3 sets</li>
</ul>

<h3>Day 2: Back + Shoulders</h3>
<ul>
 <li>Resistance Band Row           Reps 8–10 × 3 sets</li>
 <li>Lat Pull Down (light)         Reps 8–10 × 3 sets</li>
 <li>Shoulder Shrugs               Reps 10 × 3 sets</li>
 <li>Light Lateral Raise           Reps 8–10 × 3 sets</li>
</ul>

<h3>Day 3: Active Recovery</h3>
<ul>
 <li>Walking (easy pace)           15–25 minutes</li>
 <li>Neck Stretch                 15–20 sec × 3 sets</li>
 <li>Hamstring Stretch            20–30 sec × 3 sets</li>
 <li>Shoulder Stretch             15–20 sec × 3 sets</li>
</ul>

<h3>Day 4: Legs + Balance</h3>
<ul>
 <li>Chair Squats                 Reps 8–10 × 3 sets</li>
 <li>Calf Raises (hold support)   Reps 10–12 × 3 sets</li>
 <li>Seated Leg Extension         Reps 8–10 × 3 sets</li>
 <li>Heel-to-Toe Walk (balance)   10 steps × 3 rounds</li>
</ul>

<h3>Day 5: Light Full Body + Mobility</h3>
<ul>
 <li>Walking / Cycling            10–15 minutes</li>
 <li>Wall Push-ups                Reps 8 × 3 sets</li>
 <li>Light Stretching             10–15 minutes</li>
 <li>Deep Breathing Exercises     5 minutes</li>
</ul>

<h3>Tips:</h3>
<ul>
<li>Use very light weights or resistance bands</li>
<li>Avoid sudden or jerky movements</li>
<li>Focus on balance and flexibility</li>
<li>Rest properly between exercises</li>
<li>Stay consistent and active daily</li>
</ul>
`;

            diet = `

<h3>Breakfast</h3>
<ul>
<li>1–2 eggs (boiled or soft omelet)</li>
<li>1–2 slices soft whole-grain bread or oats</li>
<li>1 soft fruit (banana, papaya, or apple)</li>
<li>1 glass milk or yogurt</li>
</ul>

<h3>Mid-Morning Snack</h3>
<ul>
<li>Soaked almonds or walnuts (small handful)</li>
<li>1 fruit or fresh juice</li>
</ul>

<h3>Lunch</h3>
<ul>
<li>1–2 soft chapatis or small rice portion</li>
<li>100–120g soft protein (chicken, fish, dal, paneer)</li>
<li>1–2 cups well-cooked vegetables</li>
<li>1 tsp olive oil or ghee</li>
</ul>

<h3>Afternoon Snack</h3>
<ul>
<li>Yogurt or buttermilk</li>
<li>Light snack (fruit or soft sandwich)</li>
</ul> 

<h3>Dinner</h3>
<ul>
<li>1–2 chapatis or light rice portion</li>
<li>100–120g protein (dal, fish, chicken, or paneer)</li>
<li>Soft cooked vegetables</li>
</ul>

<h3>Before Bed</h3>
<ul>
<li>1 glass warm milk</li>
<li>Optional: 2–3 soaked almonds</li>
</ul>
`;
        }
    } else if (BMI > 25) {
        if (age >= 14 && age <= 45) {
            heading = "Your 5-week Fitness Plan";
            category = "Overweight (BMI >25)";
            workout = `
<h2>WORKOUT PLAN ❚█══█❚</h2>

<h3>Day 1: Chest + Triceps + Cardio</h3>
<ul>
 <li>Push ups                    Reps 10–12 × 3 sets</li>
 <li>Bench Press                 Reps 10 × 3 sets</li>
 <li>Incline Dumbbell Press      Reps 10 × 3 sets</li>
 <li>Dumbbell Tricep Extension   Reps 12 × 3 sets</li>
 <li>Rope Pushdowns              Reps 12 × 3 sets</li>
 <li>Cardio (Walking/Jogging)    20 minutes</li>
</ul>

<h3>Day 2: Back + Biceps + Cardio</h3>
<ul>
 <li>Lat Pull Down               Reps 10 × 3 sets</li>
 <li>Seated Cable Row            Reps 10 × 3 sets</li>
 <li>Barbell Row                 Reps 10 × 3 sets</li>
 <li>Barbell Curl                Reps 12 × 3 sets</li>
 <li>Hammer Curl                 Reps 12 × 3 sets</li>
 <li>Cardio (Cycling/Walking)    20 minutes</li>
</ul>

<h3>Day 3: Fat Burn Cardio + Core</h3>
<ul>
 <li>Brisk Walking / Jogging     30 minutes</li>
 <li>Jump Rope (optional)        5–10 minutes</li>
 <li>Plank                       20–30 sec × 3 sets</li>
 <li>Leg Raises                  Reps 10 × 3 sets</li>
</ul>

<h3>Day 4: Legs + Cardio</h3>
<ul>
 <li>Squats                      Reps 12 × 3 sets</li>
 <li>Leg Extension               Reps 12 × 3 sets</li>
 <li>Calf Raises                 Reps 15 × 3 sets</li>
 <li>Lunges                      Reps 10 × 3 sets</li>
 <li>Cardio (Walking)            20–25 minutes</li>
</ul>

<h3>Day 5: Full Body + HIIT</h3>
<ul>
 <li>Jumping Jacks               20 sec × 3 sets</li>
 <li>Push ups                    Reps 10 × 3 sets</li>
 <li>Bodyweight Squats           Reps 12 × 3 sets</li>
 <li>Mountain Climbers           20 sec × 3 sets</li>
 <li>Light Stretching            10 minutes</li>
</ul>

<h3>Tips:</h3>
<ul>
<li>Stay in calorie deficit (very important)</li>
<li>Avoid sugar, fried food, and soft drinks</li>
<li>Do cardio at least 4–5 days/week</li>
<li>Drink plenty of water</li>
<li>Be consistent and patient</li>
</ul>
`;

            diet = `

<h3>Breakfast</h3>
<ul>
<li>2 boiled eggs or omelet (less oil)</li>
<li>1 slice whole-grain bread or oats</li>
<li>1 fruit (apple, orange, or berries)</li>
<li>Green tea or black coffee (no sugar)</li>
</ul>

<h3>Mid-Morning Snack</h3>
<ul>
<li>Handful of nuts (small portion)</li>
<li>1 fruit or cucumber slices</li>
</ul>

<h3>Lunch</h3>
<ul>
<li>1 chapati or small portion brown rice</li>
<li>120–150g grilled chicken / fish / lentils</li>
<li>Large portion of vegetables or salad</li>
<li>1 tsp olive oil (optional)</li>
</ul>

<h3>Afternoon Snack</h3>
<ul>
<li>Low-fat yogurt or buttermilk</li>
<li>Green tea</li>
</ul> 

<h3>Dinner</h3>
<ul>
<li>1 chapati or no carbs (optional for faster fat loss)</li>
<li>120g protein (chicken, fish, paneer, or dal)</li>
<li>Boiled or steamed vegetables</li>
</ul>

<h3>Optional (Post-Workout)</h3>
<ul>
<li>Protein shake or boiled eggs</li>
</ul>
`;
        } else if (age >= 46 && age <= 59) {
            heading = "Your 5-week Fitness Plan";
            category = "Overweight (Age 46–49)";
            workout = `
<h2>WORKOUT PLAN ❚█══█❚</h2>

<h3>Day 1: Chest + Triceps + Cardio</h3>
<ul>
 <li>Push ups (modified if needed) Reps 8–10 × 3 sets</li>
 <li>Bench Press (moderate)       Reps 8–10 × 3 sets</li>
 <li>Incline Dumbbell Press       Reps 8–10 × 3 sets</li>
 <li>Dumbbell Tricep Extension    Reps 10–12 × 3 sets</li>
 <li>Rope Pushdowns               Reps 10–12 × 3 sets</li>
 <li>Brisk Walking / Cycling      20 minutes</li>
</ul>

<h3>Day 2: Back + Biceps + Cardio</h3>
<ul>
 <li>Lat Pull Down                Reps 8–10 × 3 sets</li>
 <li>Seated Cable Row             Reps 8–10 × 3 sets</li>
 <li>Dumbbell Row                 Reps 8–10 × 3 sets</li>
 <li>Dumbbell Curl                Reps 10–12 × 3 sets</li>
 <li>Hammer Curl                  Reps 10–12 × 3 sets</li>
 <li>Walking / Cycling            20 minutes</li>
</ul>

<h3>Day 3: Fat Burn Cardio + Core</h3>
<ul>
 <li>Brisk Walking                30 minutes</li>
 <li>Light Cycling (optional)     10 minutes</li>
 <li>Plank                        20–30 sec × 3 sets</li>
 <li>Leg Raises                   Reps 10 × 3 sets</li>
</ul>

<h3>Day 4: Legs (Joint Friendly) + Cardio</h3>
<ul>
 <li>Bodyweight Squats            Reps 10 × 3 sets</li>
 <li>Leg Extension                Reps 10–12 × 3 sets</li>
 <li>Calf Raises                  Reps 12–15 × 3 sets</li>
 <li>Step-ups (low height)        Reps 8 × 3 sets</li>
 <li>Walking                      20–25 minutes</li>
</ul>

<h3>Day 5: Light Full Body + Mobility</h3>
<ul>
 <li>Walking / Cycling            15–20 minutes</li>
 <li>Push ups (light)             Reps 8 × 3 sets</li>
 <li>Light Dumbbell Squats        Reps 10 × 3 sets</li>
 <li>Stretching                   10–15 minutes</li>
</ul>

<h3>Tips:</h3>
<ul>
<li>Stay in moderate calorie deficit (avoid extreme dieting)</li>
<li>Focus on low-impact cardio (walking, cycling)</li>
<li>Avoid heavy weights to protect joints</li>
<li>Be consistent with workouts and diet</li>
<li>Sleep 7–8 hours for better fat loss</li>
</ul>
`;

            diet = `

<h3>Breakfast</h3>
<ul>
<li>2 eggs (boiled or omelet with less oil)</li>
<li>1 slice whole-grain bread or oats</li>
<li>1 fruit (apple, orange, or papaya)</li>
<li>Green tea or black coffee (no sugar)</li>
</ul>

<h3>Mid-Morning Snack</h3>
<ul>
<li>Small handful of nuts (almonds, walnuts)</li>
<li>Cucumber or fruit</li>
</ul>

<h3>Lunch</h3>
<ul>
<li>1 chapati or small portion brown rice</li>
<li>120–150g grilled chicken / fish / lentils</li>
<li>Large portion of vegetables or salad</li>
<li>1 tsp olive oil (optional)</li>
</ul>

<h3>Afternoon Snack</h3>
<ul>
<li>Low-fat yogurt or buttermilk</li>
<li>Green tea</li>
</ul> 

<h3>Dinner</h3>
<ul>
<li>1 chapati or very small rice portion</li>
<li>120g protein (chicken, fish, dal, or paneer)</li>
<li>Boiled or steamed vegetables</li>
</ul>

<h3>Optional (Post-Workout)</h3>
<ul>
<li>Boiled eggs or light protein shake</li>
</ul>
`;
        } else if (age >= 60) {
            heading = "Your 5-week Fitness Plan";
            category = "Overweight (Age 60+)";
            workout = `
<h2>WORKOUT PLAN ❚█══█❚</h2>

<h3>Day 1: Upper Body (Light Strength + Cardio)</h3>
<ul>
 <li>Wall Push-ups                     Reps 8–10 × 3 sets</li>
 <li>Seated Dumbbell Press (light)    Reps 8–10 × 3 sets</li>
 <li>Light Bicep Curl                  Reps 10 × 3 sets</li>
 <li>Tricep Extension (light)         Reps 10 × 3 sets</li>
 <li>Brisk Walking                     15–20 minutes</li>
</ul>

<h3>Day 2: Back + Shoulders + Cardio</h3>
<ul>
 <li>Resistance Band Row               Reps 8–10 × 3 sets</li>
 <li>Lat Pull Down (light)             Reps 8–10 × 3 sets</li>
 <li>Shoulder Shrugs                   Reps 10 × 3 sets</li>
 <li>Light Lateral Raise                Reps 8–10 × 3 sets</li>
 <li>Walking / Cycling                  15–20 minutes</li>
</ul>

<h3>Day 3: Active Recovery / Balance</h3>
<ul>
 <li>Walking (slow pace)               20–25 minutes</li>
 <li>Neck Stretch                       15–20 sec × 3 sets</li>
 <li>Hamstring Stretch                  20–30 sec × 3 sets</li>
 <li>Shoulder Stretch                   15–20 sec × 3 sets</li>
 <li>Heel-to-Toe Walk (balance)        10 steps × 3 rounds</li>
</ul>

<h3>Day 4: Legs + Core + Light Cardio</h3>
<ul>
 <li>Chair Squats                       Reps 8–10 × 3 sets</li>
 <li>Calf Raises (hold support)         Reps 10–12 × 3 sets</li>
 <li>Seated Leg Extension                Reps 8–10 × 3 sets</li>
 <li>Plank (on knees if needed)         Hold 15–20 sec × 3 sets</li>
 <li>Brisk Walking                       10–15 minutes</li>
</ul>

<h3>Day 5: Full Body + Mobility</h3>
<ul>
 <li>Walking / Cycling                  15 minutes</li>
 <li>Wall Push-ups                      Reps 8 × 3 sets</li>
 <li>Light Dumbbell Squats               Reps 8–10 × 3 sets</li>
 <li>Stretching & Deep Breathing         10 minutes</li>
</ul>

<h3>Tips:</h3>
<ul>
<li>Use very light weights or resistance bands</li>
<li>Focus on joint-friendly exercises</li>
<li>Take adequate rest between sets</li>
<li>Consistency is more important than intensity</li>
<li>Hydrate well and maintain regular walking</li>
</ul>
`;

            diet = `

<h3>Breakfast</h3>
<ul>
<li>1–2 soft-boiled eggs or omelet</li>
<li>1 slice whole-grain bread or soft oats</li>
<li>1 soft fruit (banana, papaya, or apple)</li>
<li>1 glass milk or yogurt</li>
</ul>

<h3>Mid-Morning Snack</h3>
<ul>
<li>Soaked almonds or walnuts (small handful)</li>
<li>1 fruit or cucumber slices</li>
</ul>

<h3>Lunch</h3>
<ul>
<li>1–2 soft chapatis or small rice portion</li>
<li>100–120g soft protein (chicken, fish, dal, paneer)</li>
<li>1–2 cups well-cooked vegetables</li>
<li>1 tsp olive oil or ghee (optional)</li>
</ul>

<h3>Afternoon Snack</h3>
<ul>
<li>Low-fat yogurt or buttermilk</li>
<li>Light snack (fruit or soft sandwich)</li>
</ul> 

<h3>Dinner</h3>
<ul>
<li>1–2 chapatis or small rice portion</li>
<li>100–120g protein (dal, fish, chicken, or paneer)</li>
<li>Boiled or steamed vegetables</li>
</ul>

<h3>Before Bed</h3>
<ul>
<li>1 glass warm milk</li>
<li>Optional: 2–3 soaked almonds</li>
</ul>
`;
        }
    }

    // --- DISPLAY SECTION ---
    const leftPanel = document.getElementById("layout");
    leftPanel.style.display = "None"
    result.style.width = "100%"
    result.innerHTML = `
        <div class="plan-container">
            <div class="plan-header">
                <div class="brand">Bodyple</div>
                <div class="plan-info">
                    <h1>${heading}</h1>
                    <p>Based on your BMI: ${BMI.toFixed(1)}</p>
                </div>
                <div class="goal-tag">Target Goal: <span class="fit-text">FIT</span></div>
            </div>

            <div class="plan-body">

                <div class="workout-box">
                    ${workout}
                </div>

                <div class="diet-box">
                    <div class="section-title">DIET PLAN 🥗</div>
                    <div class="content-wrapper">
                        ${diet}
                    </div>
                </div>
            </div>

            
        </div>
    `;
};

