const API_URL = "/api/habits";

const modal = document.getElementById("habitModal");

const openBtn = document.querySelector(".new-habit-btn");
const sidebarBtn = document.getElementById("sidebarAddHabit");

const closeBtn = document.querySelector(".close-modal");
const cancelBtn = document.getElementById("cancelHabit");
console.log("closeBtn:", closeBtn);
console.log("cancelBtn:", cancelBtn);
const habitForm = document.getElementById("habitForm");

const habitId = document.getElementById("habitId");
const habitTitle = document.getElementById("habitTitle");
const habitDescription = document.getElementById("habitDescription");
const habitCategory = document.getElementById("habitCategory");
const habitFrequency = document.getElementById("habitFrequency");
const habitTargetTime = document.getElementById("habitTargetTime");

const modalTitle = document.getElementById("modalTitle");
const saveHabitBtn = document.getElementById("saveHabitBtn");

const searchHabit = document.getElementById("searchHabit");
const statusFilter = document.getElementById("statusFilter");

const habitsContainer = document.getElementById("habitsContainer");

let allHabits = [];

function openModal() {

    modal.style.display = "flex";

}

function closeModal() {

    modal.style.display = "none";

    habitForm.reset();

    habitId.value = "";

}

function resetForm() {

    habitForm.reset();

    habitId.value = "";

    modalTitle.textContent = "Create Habit";

    saveHabitBtn.textContent = "Save Habit";

}

function createHabitCard(habit) {

    const card = document.createElement("div");

    card.className = "habit-card";

    card.dataset.id = habit.id;

    card.innerHTML = `

        <div class="habit-status">
            ${habit.status}
        </div>

        <h3>${habit.title}</h3>

        <p class="habit-description">
            ${habit.description || ""}
        </p>

        <div class="habit-meta">

            <span>
                <strong>Category</strong>
                ${habit.category}
            </span>

            <span>
                <strong>Frequency</strong>
                ${habit.frequency}
            </span>

            <span>
                <strong>Time</strong>
                ${habit.targetTime || "-"}
            </span>

            <span>
                <strong>Streak</strong>
                ${habit.streak} 🔥
            </span>

        </div>

        <div class="habit-actions">

            <button
                class="edit-btn"
                data-id="${habit.id}">
                Edit
            </button>

            <button
                class="delete-btn"
                data-id="${habit.id}">
                Delete
            </button>

            ${
                habit.status !== "Completed"
                ? `
                <button
                    class="complete-btn"
                    data-id="${habit.id}">
                    Complete
                </button>
                `
                : ""
            }

        </div>

    `;

    return card;

}

function renderHabits(habits) {

    habitsContainer.innerHTML = "";

    if (habits.length === 0) {

        habitsContainer.innerHTML = `

            <div class="empty-state">

                <h3>No Habits Yet</h3>

                <p>Create your first habit.</p>

            </div>

        `;

        return;

    }

    habits.forEach(habit => {

        habitsContainer.appendChild(
            createHabitCard(habit)
        );

    });

}

async function loadHabits() {

    const response = await fetch(API_URL);

    allHabits = await response.json();

    renderHabits(allHabits);

}
habitForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const habit = {

        title: habitTitle.value.trim(),
        description: habitDescription.value.trim(),
        category: habitCategory.value,
        frequency: habitFrequency.value,
        targetTime: habitTargetTime.value,
        status: "Pending",
        streak: 0

    };

    try {

        if (habitId.value === "") {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(habit)

            });

            if (!response.ok) {

                throw new Error("Failed to create habit.");

            }

        } else {

            const existingHabit =
                allHabits.find(h => h.id === habitId.value);

            if (existingHabit) {

                habit.status = existingHabit.status;
                habit.streak = existingHabit.streak;

            }

            const response = await fetch(

                `${API_URL}/${habitId.value}`,

                {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(habit)

                }

            );

            if (!response.ok) {

                throw new Error("Failed to update habit.");

            }

        }

        closeModal();

        resetForm();

        await loadHabits();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

});

habitsContainer.addEventListener("click", async function (e) {

    const id = e.target.dataset.id;

    if (!id) {

        return;

    }

    const habit = allHabits.find(h => h.id === id);

    if (!habit) {

        return;

    }

    if (e.target.classList.contains("edit-btn")) {

        habitId.value = habit.id;

        habitTitle.value = habit.title;

        habitDescription.value = habit.description || "";

        habitCategory.value = habit.category;

        habitFrequency.value = habit.frequency;

        habitTargetTime.value = habit.targetTime || "";

        modalTitle.textContent = "Edit Habit";

        saveHabitBtn.textContent = "Update Habit";

        openModal();

        return;

    }

    if (e.target.classList.contains("delete-btn")) {

        if (!confirm("Delete this habit?")) {

            return;

        }

        try {

            const response = await fetch(

                `${API_URL}/${id}`,

                {

                    method: "DELETE"

                }

            );

            if (!response.ok) {

                throw new Error("Failed to delete habit.");

            }

            await loadHabits();

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

        return;

    }

    if (e.target.classList.contains("complete-btn")) {

        try {

            const response = await fetch(

                `${API_URL}/${id}/complete`,

                {

                    method: "PATCH"

                }

            );

            if (!response.ok) {

                throw new Error("Failed to complete habit.");

            }

            await loadHabits();

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    }

});

function filterHabits() {

    const keyword =
        searchHabit.value.toLowerCase();

    const status =
        statusFilter.value;

    const filtered = allHabits.filter(habit => {

        const matchesSearch =
            habit.title.toLowerCase().includes(keyword) ||
            (habit.description || "")
                .toLowerCase()
                .includes(keyword);

        const matchesStatus =
            status === "All" ||
            habit.status === status;

        return matchesSearch && matchesStatus;

    });

    renderHabits(filtered);

}

searchHabit.addEventListener(
    "input",
    filterHabits
);

statusFilter.addEventListener(
    "change",
    filterHabits
);

openBtn.addEventListener("click", () => {

    resetForm();

    openModal();

});

sidebarBtn.addEventListener("click", e => {

    e.preventDefault();

    resetForm();

    openModal();

});

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector(".close-modal")?.addEventListener("click", closeModal);

    document.getElementById("cancelHabit")?.addEventListener("click", closeModal);

});
window.addEventListener("click", e => {

    if (e.target === modal) {

        closeModal();

    }

});

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        closeModal();

    }

});

async function initializePage() {

    resetForm();

    await loadHabits();

}

initializePage();
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