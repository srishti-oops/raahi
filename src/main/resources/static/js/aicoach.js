const GOALS_API = "/api/goals";
const HABITS_API = "/api/habits";
const JOURNALS_API = "/api/journals";

/* ===========================
   ELEMENTS
=========================== */

const reflectionText = document.getElementById("reflectionText");

const observations = document.getElementById("observations");

const strengths = document.getElementById("strengths");

const attention = document.getElementById("attention");

const recommendation = document.getElementById("recommendation");

const tomorrowPlan = document.getElementById("tomorrowPlan");

const personalityTitle = document.getElementById("personalityTitle");

const personalityDescription =
    document.getElementById("personalityDescription");

const coachTip = document.getElementById("coachTip");

/* ===========================
   RANDOM COACH TIPS
=========================== */

const tips = [

    "Break large goals into focused sessions under 45 minutes.",

    "Completing one important task creates more momentum than starting five.",

    "Consistency beats intensity. Protect your daily habits.",

    "Spend your highest-energy hours on your highest-priority goal.",

    "Review your progress every evening before planning tomorrow.",

    "Small improvements every day create remarkable long-term results."

];

/* ===========================
   LOAD COACH
=========================== */

async function loadCoach(){

    try{

        const [

            goalsResponse,
            habitsResponse,
            journalsResponse

        ] = await Promise.all([

            fetch(GOALS_API),
            fetch(HABITS_API),
            fetch(JOURNALS_API)

        ]);

        const goals = await goalsResponse.json();

        const habits = await habitsResponse.json();

        const journals = await journalsResponse.json();

        buildReflection(

            goals,
            habits,
            journals

        );

        buildObservations(

            goals,
            habits,
            journals

        );

        buildStrengths(

            goals,
            habits,
            journals

        );

        buildAttention(

            goals,
            habits,
            journals

        );

        buildRecommendation(

            goals,
            habits

        );

        buildTomorrow(

            goals,
            habits

        );

        buildPersonality(

            goals,
            habits,
            journals

        );

        coachTip.textContent =

            tips[

                Math.floor(

                    Math.random() * tips.length

                )

            ];

    }

    catch(error){

        console.error(error);

        reflectionText.textContent =
            "Unable to analyse your recent activity.";

    }

}

/* ===========================
   REFLECTION
=========================== */

function buildReflection(

    goals,
    habits,
    journals

){

    const completedGoals = goals.filter(

        g=>g.status==="Completed"

    ).length;

    const completedHabits = habits.filter(

        h=>h.status==="Completed"

    ).length;

    if(goals.length===0){

        reflectionText.textContent =
            "Welcome to Raahi. Start by creating your first meaningful goal.";

        return;

    }

    reflectionText.textContent =

        `You completed ${completedGoals} goal(s) and ${completedHabits} habit(s). Focus on finishing one important task before starting another.`;

}
/* ===========================
   OBSERVATIONS
=========================== */

function buildObservations(

    goals,
    habits,
    journals

){

    observations.innerHTML = "";

    const items = [];

    const completedGoals = goals.filter(

        g=>g.status==="Completed"

    ).length;

    const completedHabits = habits.filter(

        h=>h.status==="Completed"

    ).length;

    if(completedGoals > 0){

        items.push(

            `You've completed ${completedGoals} goal(s) recently.`

        );

    }

    if(completedHabits > 0){

        items.push(

            `Your habit consistency is improving.`

        );

    }

    if(journals.length > 0){

        items.push(

            "You regularly reflect on your progress."

        );

    }

    if(items.length===0){

        items.push(

            "Complete more activities so I can understand your productivity patterns."

        );

    }

    items.forEach(text=>{

        const li=document.createElement("li");

        li.textContent=text;

        observations.appendChild(li);

    });

}

/* ===========================
   STRENGTHS
=========================== */

function buildStrengths(

    goals,
    habits,
    journals

){

    strengths.innerHTML="";

    const list=[];

    if(goals.some(g=>g.status==="Completed")){

        list.push(

            "You finish the goals you commit to."

        );

    }

    if(habits.some(h=>(h.streak||0)>=5)){

        list.push(

            "Your habit streak shows strong consistency."

        );

    }

    if(journals.length>=3){

        list.push(

            "You maintain a healthy reflection routine."

        );

    }

    if(list.length===0){

        list.push(

            "Every productive journey starts with one completed task."

        );

    }

    list.forEach(item=>{

        const li=document.createElement("li");

        li.textContent=item;

        strengths.appendChild(li);

    });

}

/* ===========================
   NEEDS ATTENTION
=========================== */

function buildAttention(

    goals,
    habits,
    journals

){

    attention.innerHTML="";

    const list=[];

    const pendingGoals=goals.filter(

        g=>g.status!=="Completed"

    );

    if(pendingGoals.length>0){

        list.push(

            `${pendingGoals.length} goal(s) are still waiting to be completed.`

        );

    }

    if(habits.length===0){

        list.push(

            "Building one daily habit can improve long-term consistency."

        );

    }

    if(journals.length===0){

        list.push(

            "Writing a journal entry helps identify patterns."

        );

    }

    if(list.length===0){

        list.push(

            "Everything looks balanced. Keep your momentum going."

        );

    }

    list.forEach(item=>{

        const li=document.createElement("li");

        li.textContent=item;

        attention.appendChild(li);

    });

}

/* ===========================
   RECOMMENDATION
=========================== */

function buildRecommendation(

    goals,
    habits

){

    const pendingGoal=goals.find(

        g=>g.status!=="Completed"

    );

    if(pendingGoal){

        recommendation.textContent=

            `Focus on "${pendingGoal.title}" before creating a new goal. Completing one important task builds momentum faster than juggling many.`;

        return;

    }

    if(habits.length>0){

        recommendation.textContent=

            "Excellent progress. Protect your habit streak and continue your daily routine.";

        return;

    }

    recommendation.textContent=

        "Plan tomorrow before ending today to reduce decision fatigue.";
}
/* ===========================
   TOMORROW
=========================== */

function buildTomorrow(goals, habits){

    tomorrowPlan.innerHTML = "";

    const pending = goals.filter(
        g => g.status !== "Completed"
    ).slice(0,3);

    if(pending.length === 0){

        tomorrowPlan.innerHTML =
            "<li>Enjoy your day. You're all caught up.</li>";

        return;

    }

    pending.forEach(goal=>{

        const li=document.createElement("li");

        li.textContent=goal.title;

        tomorrowPlan.appendChild(li);

    });

}

/* ===========================
   PRODUCTIVITY STYLE
=========================== */

function buildPersonality(goals, habits, journals){

    const completedGoals = goals.filter(
        g=>g.status==="Completed"
    ).length;

    const highestStreak = habits.length
        ? Math.max(...habits.map(h=>h.streak||0))
        : 0;

    if(highestStreak>=7){

        personalityTitle.textContent="Consistent Builder";

        personalityDescription.textContent=
            "You stay committed to routines and build progress steadily.";

        return;

    }

    if(completedGoals>=3){

        personalityTitle.textContent="Goal Chaser";

        personalityDescription.textContent=
            "You enjoy completing meaningful goals and keeping momentum.";

        return;

    }

    if(journals.length>=3){

        personalityTitle.textContent="Reflective Learner";

        personalityDescription.textContent=
            "You regularly reflect before taking your next step.";

        return;

    }

    personalityTitle.textContent="Growing Explorer";

    personalityDescription.textContent=
        "You're building productive habits. Stay consistent and your profile will evolve.";

}

/* ===========================
   START
=========================== */

loadCoach();
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