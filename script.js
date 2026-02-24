const jobCards = document.querySelectorAll(".job-card");
const filterButtons = document.querySelectorAll(".filters button");

const availableCount = document.getElementById("availableCount");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const jobCountText = document.getElementById("jobCountText");

let currentFilter = "all";

// Update counts and visibility
function updateUI() {
    let available = 0, interview = 0, rejected = 0, visible = 0;

    jobCards.forEach(card => {
        const status = card.dataset.status;

        if (status === "all") available++;
        else if (status === "interview") interview++;
        else if (status === "rejected") rejected++;

        if (currentFilter === "all" || currentFilter === status) {
            card.style.display = "block";
            visible++;
        } else {
            card.style.display = "none";
        }
    });

    availableCount.textContent = available;
    interviewCount.textContent = interview;
    rejectedCount.textContent = rejected;
    jobCountText.textContent = `${visible} of ${jobCards.length} jobs`;
}

// Button actions
jobCards.forEach(card => {
    const interviewBtn = card.querySelector(".interview-btn");
    const rejectedBtn = card.querySelector(".rejected-btn");
    const deleteBtn = card.querySelector(".delete-btn");

    if (interviewBtn) interviewBtn.addEventListener("click", () => {
        card.dataset.status = "interview";
        updateUI();
    });

    if (rejectedBtn) rejectedBtn.addEventListener("click", () => {
        card.dataset.status = "rejected";
        updateUI();
    });

    if (deleteBtn) deleteBtn.addEventListener("click", () => {
        card.remove();
        updateUI();
    });
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

// Initial render
updateUI();