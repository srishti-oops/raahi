/* ==========================================================
   API ENDPOINTS
========================================================== */

const DASHBOARD_API = "/api/dashboard";
const GOALS_API = "/api/goals";
const HABITS_API = "/api/habits";
const JOURNAL_API = "/api/journal";

/* ==========================================================
   ELEMENTS
========================================================== */

const greeting = document.getElementById("greeting");
const currentDate = document.getElementById("currentDate");
const lastSynced = document.getElementById("lastSynced");

const profileButton = document.getElementById("profileButton");
const themeToggle = document.getElementById("themeToggle");

const quote = document.getElementById("dailyQuote");

const timerDisplay = document.getElementById("timerDisplay");
const timerMinutesLabel = document.getElementById("timerMinutesLabel");

const editTimer = document.getElementById("editTimer");

const startButton = document.getElementById("startTimer");
const pauseButton = document.getElementById("pauseTimer");
const resetButton = document.getElementById("resetTimer");

/* ==========================================================
   TIMER
========================================================== */

let timerMinutes = 25;
let remainingSeconds = timerMinutes * 60;

let timer = null;
let running = false;

/* ==========================================================
   DAILY QUOTES
========================================================== */

const quotes = [

    "Small consistent actions create extraordinary results.",

    "Progress is built one focused session at a time.",

    "Discipline creates freedom.",

    "One completed task beats ten planned tasks.",

    "Keep showing up. Consistency compounds."

];

/* ==========================================================
   HEADER
========================================================== */

function loadGreeting(){

    const hour = new Date().getHours();

    let message = "Good Evening";

    if(hour < 12){

        message = "Good Morning";

    }

    else if(hour < 17){

        message = "Good Afternoon";

    }

    greeting.textContent =
        `${message}, Ishika`;

}

function loadDate(){

    currentDate.textContent =

        new Date().toLocaleDateString(

            "en-IN",

            {

                weekday:"long",

                day:"numeric",

                month:"long"

            }

        );

}

function updateLastSynced(){

    lastSynced.textContent =

        "Last synced " +

        new Date().toLocaleTimeString(

            [],

            {

                hour:"2-digit",

                minute:"2-digit"

            }

        );

}

/* ==========================================================
   PROFILE
========================================================== */

function loadProfile(){

    profileButton.textContent = "IA";

}

/* ==========================================================
   QUOTE
========================================================== */

function loadQuote(){

    const index =

        Math.floor(

            Math.random()*quotes.length

        );

    quote.textContent =

        quotes[index];

}

/* ==========================================================
   THEME
========================================================== */

function loadTheme(){

    const saved =

        localStorage.getItem("theme");

    if(saved==="dark"){

        document.body.classList.add("dark");

        themeToggle.innerHTML =

            '<i class="fa-solid fa-sun"></i>';

    }

}
if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const dark = document.body.classList.contains("dark");

        localStorage.setItem(
            "theme",
            dark ? "dark" : "light"
        );

        themeToggle.innerHTML = dark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

    });

}
/* ==========================================================
   LOAD DASHBOARD
========================================================== */

async function loadDashboard() {

    try {

        const [

            goalsResponse,
            habitsResponse,
            journalResponse,
            dashboardResponse

        ] = await Promise.all([

            fetch(GOALS_API),

            fetch(HABITS_API),

            fetch(JOURNAL_API),

            fetch(DASHBOARD_API)

        ]);

       const goals = goalsResponse.ok
           ? await goalsResponse.json()
           : [];

       const habits = habitsResponse.ok
           ? await habitsResponse.json()
           : [];

        let journals = [];

        if (journalResponse.ok) {

            journals = await journalResponse.json();

        }

        let dashboard = {};

        if (dashboardResponse.ok) {

            dashboard = await dashboardResponse.json();

        }

        loadFocus(goals);

        loadProductivity(goals, habits);

        loadStreak(habits);

        loadRecentActivity(

            goals,

            habits,

            journals

        );

        loadCoach(dashboard);

    }

    catch(error){

        console.error(error);

    }

}

/* ==========================================================
   TODAY'S FOCUS
========================================================== */

function loadFocus(goals){

    const title =

        document.getElementById("focusTitle");

    const description =

        document.getElementById("focusDescription");

    const deadline =

        document.getElementById("focusDeadline");

    const status =

        document.getElementById("focusStatus");

    if(goals.length===0){

        title.textContent =

            "No Goals Yet";

        description.textContent =

            "Create your first goal to begin.";

        deadline.textContent="--";

        status.textContent="--";

        return;

    }

    const goal =

        goals.find(

            g=>g.status!=="Completed"

        ) || goals[0];

    title.textContent = goal.title;

    description.textContent = goal.description;

    deadline.textContent =

        goal.deadline || "No Deadline";

    status.textContent = goal.status;

}

/* ==========================================================
   PRODUCTIVITY
========================================================== */

function loadProductivity(

    goals,

    habits

){

    const score =

        document.getElementById(

            "productivityScore"

        );

    const text =

        document.getElementById(

            "productivityText"

        );

    const completedGoals =

        goals.filter(

            g=>g.status==="Completed"

        ).length;

    const completedHabits =

        habits.filter(

            h=>h.status==="Completed"

        ).length;

    const total =

        goals.length + habits.length;

    const percentage =

        total===0 ?

        0

        :

        Math.round(

            ((completedGoals+completedHabits)/total)*100

        );

    score.textContent =

        percentage + "%";

    text.textContent =

        percentage >= 75 ?

        "Excellent progress today."

        :

        percentage >= 40 ?

        "Keep the momentum going."

        :

        "Let's complete a few more tasks.";

}

/* ==========================================================
   CURRENT STREAK
========================================================== */

function loadStreak(habits){

    const streak =

        document.getElementById(

            "streakDays"

        );

    if(habits.length===0){

        streak.textContent =

            "0 Days";

        return;

    }

    const maxStreak =

        Math.max(

            ...habits.map(

                h=>h.streak || 0

            )

        );

    streak.textContent =

        `${maxStreak} Days`;

}

/* ==========================================================
   RECENT ACTIVITY
========================================================== */

function loadRecentActivity(

    goals,

    habits,

    journals

){

    const list =

        document.getElementById(

            "recentActivity"

        );

    list.innerHTML = "";

    const activity = [];

    goals.slice(-3).forEach(goal=>{

        activity.push({

            title:goal.title,

            subtitle:"Goal updated"

        });

    });

    habits.slice(-3).forEach(habit=>{

        activity.push({

            title:habit.title,

            subtitle:"Habit completed"

        });

    });

    journals.slice(-3).forEach(journal=>{

        activity.push({

            title:

            journal.title ||

            "Journal Entry",

            subtitle:"Journal added"

        });

    });

    activity.reverse();

    activity.forEach(item=>{

        list.innerHTML +=

        `

        <div class="activity-item">

            <strong>

                ${item.title}

            </strong>

            <small>

                ${item.subtitle}

            </small>

        </div>

        `;

    });

}

/* ==========================================================
   AI COACH
========================================================== */

function loadCoach(dashboard){

    document.getElementById(

        "coachObservation"

    ).textContent =

        dashboard.observation ||

        "Consistency is your biggest strength.";

    document.getElementById(

        "coachRecommendation"

    ).textContent =

        dashboard.recommendation ||

        "Focus on today's highest priority goal.";

    document.getElementById(

        "coachMotivation"

    ).textContent =

        dashboard.motivation ||

        "Small daily wins build extraordinary results.";

}
/* ==========================================================
   TIMER
========================================================== */

function updateTimerDisplay(){

    const minutes = Math.floor(

        remainingSeconds / 60

    );

    const seconds = remainingSeconds % 60;

    timerDisplay.textContent =

        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}

function editFocusTime(){

    const value = prompt(

        "Enter focus duration (5-180 minutes)",

        timerMinutes

    );

    if(value===null){

        return;

    }

    const minutes = parseInt(value);

    if(isNaN(minutes) || minutes < 5 || minutes > 180){

        alert("Please enter a value between 5 and 180.");

        return;

    }

    timerMinutes = minutes;

    remainingSeconds = timerMinutes * 60;

    timerMinutesLabel.textContent =

        `${timerMinutes} min`;

    updateTimerDisplay();

}

function startTimer(){

    if(running){

        return;

    }

    running = true;

    timer = setInterval(()=>{

        if(remainingSeconds>0){

            remainingSeconds--;

            updateTimerDisplay();

        }

        else{

            clearInterval(timer);

            running = false;

            alert("Focus session completed!");

        }

    },1000);

}

function pauseTimer(){

    clearInterval(timer);

    running = false;

}

function resetTimer(){

    clearInterval(timer);

    running = false;

    remainingSeconds = timerMinutes * 60;

    updateTimerDisplay();

}

/* ==========================================================
   BUTTONS
========================================================== */

if (startButton)
    startButton.addEventListener("click", startTimer);

if (pauseButton)
    pauseButton.addEventListener("click", pauseTimer);

if (resetButton)
    resetButton.addEventListener("click", resetTimer);

if (editTimer)
    editTimer.addEventListener("click", editFocusTime);
/* ==========================================================
   ADD GOAL
========================================================== */

function openGoalPopup(){

    /*
       Replace this later with the
       existing Add Goal modal.

       For now it opens the Goals page.
    */

    window.location.href =

        "mygoals.html?openAddGoal=true";

}

const addGoalButton = document.getElementById("addGoalButton");

if (addGoalButton) {

    addGoalButton.addEventListener("click", openGoalPopup);

}
/* ==========================================================
   CONTINUE GOAL
========================================================== */

const continueGoal = document.getElementById("continueGoal");

if (continueGoal) {

    continueGoal.addEventListener("click", () => {

        window.location.href = "mygoals.html";

    });

}

/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        loadTheme();

        loadGreeting();

        loadDate();

        updateLastSynced();

        loadProfile();

        loadQuote();

        updateTimerDisplay();

        loadDashboard();

    }

);
/* ===========================
   LOGOUT
=========================== */

const logoutButton = document.querySelector(".logout");

if (logoutButton) {

    logoutButton.addEventListener("click", function (e) {

        e.preventDefault();

        localStorage.clear();
        sessionStorage.clear();

        window.location.href = "index.html";

    });

}