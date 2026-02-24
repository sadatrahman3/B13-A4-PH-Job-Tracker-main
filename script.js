const jobsContainer = document.getElementById("jobsContainer");
const filterButtons = document.querySelectorAll(".filters button");

const availableCount = document.getElementById("availableCount");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const jobCountText = document.getElementById("jobCountText");

let currentFilter = "all";

function getJobCards() {
    return document.querySelectorAll(".job-card");
}

function updateUI() {
    const jobCards = getJobCards();
    let totalAvailable = jobCards.length;
    let interview = 0;
    let rejected = 0;
    let visible = 0;

    jobCards.forEach(card => {
        const status = card.dataset.status;
        const badge = card.querySelector(".status-badge");

        badge.classList.add("hidden");
        badge.classList.remove("interview", "rejected");

        if (status === "interview") {
            interview++;
            badge.classList.remove("hidden");
            badge.classList.add("interview");
            badge.textContent = "Interview";
        }

        if (status === "rejected") {
            rejected++;
            badge.classList.remove("hidden");
            badge.classList.add("rejected");
            badge.textContent = "Rejected";
        }

        if (currentFilter === "all") {
            card.classList.remove("hidden");
            visible++;
        } else if (status === currentFilter) {
            card.classList.remove("hidden");
            visible++;
        } else {
            card.classList.add("hidden");
        }
    });

    availableCount.textContent = totalAvailable;
    interviewCount.textContent = interview;
    rejectedCount.textContent = rejected;
    jobCountText.textContent = `${visible} of ${totalAvailable} jobs`;

    handleEmptyState(visible);
}

function handleEmptyState(visible) {
    let existing = document.querySelector(".empty-state");

    if (visible === 0) {
        if (!existing) {
            const empty = document.createElement("div");
            empty.className = "empty-state";
            empty.textContent = "No jobs available in this tab.";
            jobsContainer.appendChild(empty);
        }
    } else {
        if (existing) existing.remove();
    }
}

// Event Delegation
jobsContainer.addEventListener("click", function (e) {
    const card = e.target.closest(".job-card");
    if (!card) return;

    if (e.target.classList.contains("interview-btn")) {
        card.dataset.status = "interview";
        updateUI();
    }

    if (e.target.classList.contains("rejected-btn")) {
        card.dataset.status = "rejected";
        updateUI();
    }

    if (e.target.classList.contains("delete-btn")) {
        card.remove();
        updateUI();
    }
});

// Filter buttons
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        updateUI();
    });
});

updateUI();