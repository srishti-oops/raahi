const ANALYTICS_API = "/api/analytics";

/* ===========================
   ELEMENTS
=========================== */

const productivityScore =
    document.getElementById("productivityScore");

const consistencyScore =
    document.getElementById("consistencyScore");

const weeklyProgress =
    document.getElementById("weeklyProgress");

const monthlyProgress =
    document.getElementById("monthlyProgress");

const goalProgress =
    document.getElementById("goalProgress");

const habitProgress =
    document.getElementById("habitProgress");

const journalProgress =
    document.getElementById("journalProgress");

const goalText =
    document.getElementById("goalText");

const habitText =
    document.getElementById("habitText");

const journalText =
    document.getElementById("journalText");

const topCategory =
    document.getElementById("topCategory");

const topCategoryText =
    document.getElementById("topCategoryText");

const completedGoals =
    document.getElementById("completedGoals");

const completedHabits =
    document.getElementById("completedHabits");

const journalEntries =
    document.getElementById("journalEntries");

const insights =
    document.getElementById("insights");

const timelineBars = [

    document.getElementById("barMon"),
    document.getElementById("barTue"),
    document.getElementById("barWed"),
    document.getElementById("barThu"),
    document.getElementById("barFri"),
    document.getElementById("barSat"),
    document.getElementById("barSun")

];

/* ===========================
   LOAD
=========================== */

async function loadAnalytics() {

    try {

        const response = await fetch(ANALYTICS_API);

        const analytics = await response.json();

        renderAnalytics(analytics);

    }

    catch (error) {

        console.error(error);

    }

}

/* ===========================
   RENDER
=========================== */

function renderAnalytics(data) {

    productivityScore.textContent =
        data.productivityScore + "%";

    consistencyScore.textContent =
        data.consistencyScore + "%";

    weeklyProgress.textContent =
        data.weeklyProgress + "%";

    monthlyProgress.textContent =
        data.monthlyProgress + "%";

    goalProgress.style.width =
        data.goalCompletion + "%";

    habitProgress.style.width =
        data.habitConsistency + "%";

    journalProgress.style.width =
        data.journalActivity + "%";

    goalText.textContent =
        data.goalCompletion + "% Completed";

    habitText.textContent =
        data.habitConsistency + "% Consistent";

    journalText.textContent =
        data.journalEntries + " Journal Entries";

    completedGoals.textContent =
        data.completedGoals;

    completedHabits.textContent =
        data.completedHabits;

    journalEntries.textContent =
        data.journalEntries;

    topCategory.textContent =
        data.mostProductiveArea;

    topCategoryText.textContent =
        data.areaDescription;
            /* ===========================
               INSIGHTS
            =========================== */

            insights.innerHTML = "";

            if (data.insights && data.insights.length > 0) {

                data.insights.forEach(insight => {

                    const li = document.createElement("li");

                    li.textContent = insight;

                    insights.appendChild(li);

                });

            }

            /* ===========================
               TIMELINE
            =========================== */

            const progress = [

                Math.max(data.weeklyProgress - 18, 15),
                Math.max(data.weeklyProgress - 12, 20),
                Math.max(data.weeklyProgress - 8, 25),
                Math.max(data.weeklyProgress - 4, 35),
                Math.max(data.weeklyProgress - 2, 45),
                Math.max(data.weeklyProgress, 55),
                Math.min(data.monthlyProgress, 100)

            ];

            timelineBars.forEach((bar, index) => {

                bar.style.width = progress[index] + "%";

            });

        }

        /* ===========================
           INITIALIZE
        =========================== */

        document.addEventListener("DOMContentLoaded", () => {

            loadAnalytics();

        });
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