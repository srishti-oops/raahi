const API_URL = "/api/journals";

const modal = document.getElementById("journalModal");

const openBtn = document.querySelector(".new-journal-btn");
const sidebarBtn = document.getElementById("sidebarAddJournal");

const closeBtn = document.querySelector(".close-modal");
const cancelBtn = document.getElementById("cancelJournal");

const journalForm = document.getElementById("journalForm");

const journalId = document.getElementById("journalId");
const journalTitle = document.getElementById("journalTitle");
const journalContent = document.getElementById("journalContent");
const journalMood = document.getElementById("journalMood");
const journalDate = document.getElementById("journalDate");

const modalTitle = document.getElementById("modalTitle");
const saveJournalBtn = document.getElementById("saveJournalBtn");

const searchJournal = document.getElementById("searchJournal");
const moodFilter = document.getElementById("moodFilter");

const journalsContainer = document.getElementById("journalsContainer");

let allJournals = [];

function openModal() {

    modal.style.display = "flex";

}

function closeModal() {

    modal.style.display = "none";

    resetForm();

}
function resetForm() {

    journalForm.reset();

    journalId.value = "";

    modalTitle.textContent = "New Journal Entry";

    saveJournalBtn.textContent = "Save Entry";

}

function createJournalCard(journal) {

    const card = document.createElement("div");

    card.className = "journal-card";

    card.innerHTML = `

        <h3>${journal.title}</h3>

        <p class="journal-content">

            ${journal.content}

        </p>

        <div class="journal-meta">

            <span>${journal.mood}</span>

            <span>${journal.date}</span>

        </div>

        <div class="journal-actions">

            <button
                class="edit-btn"
                data-id="${journal.id}">
                Edit
            </button>

            <button
                class="delete-btn"
                data-id="${journal.id}">
                Delete
            </button>

        </div>

    `;

    return card;

}

function renderJournals(journals) {

    journalsContainer.innerHTML = "";

    if (journals.length === 0) {

        journalsContainer.innerHTML = `

            <div class="empty-state">

                <h3>No Journal Entries</h3>

                <p>Start writing your first reflection.</p>

            </div>

        `;

        return;

    }

    journals.forEach(journal => {

        journalsContainer.appendChild(

            createJournalCard(journal)

        );

    });

}

async function loadJournals() {

    const response = await fetch(API_URL);

    allJournals = await response.json();

    renderJournals(allJournals);

}
journalForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const journal = {

        title: journalTitle.value.trim(),
        content: journalContent.value.trim(),
        mood: journalMood.value,
        date: journalDate.value

    };

    try {

        if (journalId.value === "") {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(journal)

            });

            if (!response.ok) {

                throw new Error("Failed to save journal.");

            }

        } else {

            const response = await fetch(

                `${API_URL}/${journalId.value}`,

                {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(journal)

                }

            );

            if (!response.ok) {

                throw new Error("Failed to update journal.");

            }

        }

        closeModal();

        resetForm();

        await loadJournals();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

});

journalsContainer.addEventListener("click", async function (e) {

    const id = e.target.dataset.id;

    if (!id) {

        return;

    }

    const journal = allJournals.find(j => j.id === id);

    if (!journal) {

        return;

    }

    if (e.target.classList.contains("edit-btn")) {

        journalId.value = journal.id;

        journalTitle.value = journal.title;

        journalContent.value = journal.content;

        journalMood.value = journal.mood;

        journalDate.value = journal.date;

        modalTitle.textContent = "Edit Journal Entry";

        saveJournalBtn.textContent = "Update Entry";

        openModal();

        return;

    }

    if (e.target.classList.contains("delete-btn")) {

        if (!confirm("Delete this journal entry?")) {

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

                throw new Error("Failed to delete journal.");

            }

            await loadJournals();

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    }

});

function filterJournals() {

    const keyword = searchJournal.value.toLowerCase();

    const mood = moodFilter.value;

    const filtered = allJournals.filter(journal => {

        const matchesSearch =

            journal.title.toLowerCase().includes(keyword) ||

            (journal.content || "")
                .toLowerCase()
                .includes(keyword);

        const matchesMood =

            mood === "All" ||

            journal.mood === mood;

        return matchesSearch && matchesMood;

    });

    renderJournals(filtered);

}

searchJournal.addEventListener(

    "input",

    filterJournals

);

moodFilter.addEventListener(

    "change",

    filterJournals

);

openBtn.addEventListener("click", () => {

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

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        closeModal();

    }

});

async function initializePage() {

    resetForm();

    await loadJournals();

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