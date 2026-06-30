const API_URL = "/api/goals";
console.log("mygoals.js loaded");
const modal = document.getElementById("goalModal");

const openBtn = document.querySelector(".new-goal-btn");
const sidebarBtn = document.getElementById("sidebarAddGoal");

const closeBtn = document.querySelector(".close-modal");
const cancelBtn = document.getElementById("cancelGoal");

const goalForm = document.getElementById("goalForm");

const goalId = document.getElementById("goalId");
const goalTitle = document.getElementById("goalTitle");
const goalDescription = document.getElementById("goalDescription");
const goalCategory = document.getElementById("goalCategory");
const goalPriority = document.getElementById("goalPriority");
const goalDeadline = document.getElementById("goalDeadline");

const modalTitle = document.getElementById("modalTitle");
const saveGoalBtn = document.getElementById("saveGoalBtn");

const searchGoal = document.getElementById("searchGoal");
const statusFilter = document.getElementById("statusFilter");

const goalsContainer = document.getElementById("goalsContainer");

let allGoals = [];

function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

function resetForm() {

    goalForm.reset();

    goalId.value = "";

    modalTitle.textContent = "Create Goal";

    saveGoalBtn.textContent = "Save Goal";
}

function createGoalCard(goal) {

    const card = document.createElement("div");

    card.className = "goal-card";

    card.dataset.id = goal.id;

    card.dataset.status = goal.status;

    card.dataset.title = goal.title.toLowerCase();

    card.innerHTML = `
        <div class="goal-status ${goal.status.toLowerCase().replace(/\s+/g, "-")}">
            ${goal.status}
        </div>

        <h3>${goal.title}</h3>

        <p class="goal-description">
            ${goal.description || ""}
        </p>

        <div class="goal-meta">
            <span><strong>Category</strong> ${goal.category}</span>
            <span><strong>Priority</strong> ${goal.priority}</span>
            <span><strong>Due</strong> ${goal.targetDate || "No deadline"}</span>
        </div>

        <div class="goal-actions">

            <button
                class="edit-btn"
                data-id="${goal.id}">
                Edit
            </button>

            <button
                class="delete-btn"
                data-id="${goal.id}">
                Delete
            </button>

            ${
                goal.status !== "Completed"
                    ? `
                    <button
                        class="complete-btn"
                        data-id="${goal.id}">
                        Complete
                    </button>
                    `
                    : ""
            }

        </div>
    `;

    return card;
}

function renderGoals(goals) {

    goalsContainer.innerHTML = "";

    if (goals.length === 0) {

        goalsContainer.innerHTML = `
            <div class="empty-state">
                <h3>No Goals Found</h3>
                <p>Create a new goal to get started.</p>
            </div>
        `;

        return;
    }

    goals.forEach(goal => {

        goalsContainer.appendChild(createGoalCard(goal));

    });

}

async function loadGoals() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {

            throw new Error("Unable to load goals.");

        }

        allGoals = await response.json();

        renderGoals(allGoals);

    } catch (error) {

        console.error(error);

        goalsContainer.innerHTML = `
            <div class="empty-state">
                Failed to load goals.
            </div>
        `;
    }

}

function filterGoals() {

    const keyword = searchGoal.value.trim().toLowerCase();

    const status = statusFilter.value;

    const filtered = allGoals.filter(goal => {

        const matchesSearch =
            goal.title.toLowerCase().includes(keyword) ||
            (goal.description || "")
                .toLowerCase()
                .includes(keyword);

        const matchesStatus =
            status === "All" ||
            goal.status === status;

        return matchesSearch && matchesStatus;

    });

    renderGoals(filtered);

}

openBtn.addEventListener("click", () => {

    console.log("New Goal button clicked");

    resetForm();

    openModal();

});

sidebarBtn.addEventListener("click", e => {

    e.preventDefault();

    resetForm();

    openModal();

});

closeBtn.addEventListener("click", closeModal);

cancelBtn.addEventListener("click", closeModal);

window.addEventListener("click", e => {

    if (e.target === modal) {

        closeModal();

    }

});
goalForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const goal = {

        title: goalTitle.value.trim(),
        description: goalDescription.value.trim(),
        category: goalCategory.value,
        priority: goalPriority.value,
        targetDate: goalDeadline.value,
        status: "Pending"

    };

    try {

        if (goalId.value === "") {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(goal)

            });

            if (!response.ok) {

                throw new Error("Failed to create goal.");

            }

        } else {

            const existingGoal = allGoals.find(g => g.id === goalId.value);

            if (existingGoal) {

                goal.status = existingGoal.status;

            }

            const response = await fetch(`${API_URL}/${goalId.value}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(goal)

            });

            if (!response.ok) {

                throw new Error("Failed to update goal.");

            }

        }

        closeModal();

        resetForm();

        await loadGoals();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

});

goalsContainer.addEventListener("click", async function (e) {

    const id = e.target.dataset.id;

    if (!id) {

        return;

    }

    const goal = allGoals.find(g => g.id === id);

    if (!goal) {

        return;

    }

    if (e.target.classList.contains("edit-btn")) {

        goalId.value = goal.id;

        goalTitle.value = goal.title;

        goalDescription.value = goal.description || "";

        goalCategory.value = goal.category;

        goalPriority.value = goal.priority;

        goalDeadline.value = goal.targetDate || "";

        modalTitle.textContent = "Edit Goal";

        saveGoalBtn.textContent = "Update Goal";

        openModal();

        return;

    }

    if (e.target.classList.contains("delete-btn")) {

        const confirmed = confirm(
            "Are you sure you want to delete this goal?"
        );

        if (!confirmed) {

            return;

        }

        try {

            const response = await fetch(`${API_URL}/${id}`, {

                method: "DELETE"

            });

            if (!response.ok) {

                throw new Error("Failed to delete goal.");

            }

            await loadGoals();

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

        return;

    }

    if (e.target.classList.contains("complete-btn")) {

        try {

            const response = await fetch(`${API_URL}/${id}/complete`, {

                method: "PATCH"

            });

            if (!response.ok) {

                throw new Error("Failed to complete goal.");

            }

            await loadGoals();

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    }

});
searchGoal.addEventListener("input", filterGoals);

statusFilter.addEventListener("change", filterGoals);

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        closeModal();

    }

});

async function initializePage() {

    resetForm();

    await loadGoals();

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