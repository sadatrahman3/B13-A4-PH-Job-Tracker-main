const jobsContainer = document.querySelector('.jobs-container');
let jobCards = Array.from(document.querySelectorAll('.job-card'));

const filterButtons = document.querySelectorAll('.filters button');
const emptyState = document.getElementById('emptyState');

const totalCount = document.getElementById('totalCount');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');
const jobCountText = document.getElementById('jobCountText');

let currentFilter = "all";

// Update UI stats, visibility, and empty state
function updateUI() {
    let total = jobCards.length;
    let interview = jobCards.filter(j=>j.dataset.status==="interview").length;
    let rejected = jobCards.filter(j=>j.dataset.status==="rejected").length;

    totalCount.textContent = total;
    interviewCount.textContent = interview;
    rejectedCount.textContent = rejected;

    // Filter visibility
    let visible = 0;
    jobCards.forEach(card => {
        const status = card.dataset.status;
        const show = currentFilter === "all" || status === currentFilter;
        card.style.display = show ? "block" : "none";
        if(show) visible++;
    });

    jobCountText.textContent = `${visible} job${visible!==1?'s':''}`;
    emptyState.style.display = visible === 0 ? "flex" : "none";
}

// Add event listeners to buttons for each card
function attachCardEvents(card) {
    const interviewBtn = card.querySelector('.interview-btn');
    const rejectedBtn = card.querySelector('.rejected-btn');
    const deleteBtn = card.querySelector('.delete-btn');

    interviewBtn.addEventListener('click', ()=>{
        card.dataset.status="interview";
        updateUI();
    });

    rejectedBtn.addEventListener('click', ()=>{
        card.dataset.status="rejected";
        updateUI();
    });

    deleteBtn.addEventListener('click', ()=>{
        card.remove();
        jobCards = jobCards.filter(j=>j!==card); // remove from array
        updateUI();
    });
}

// Attach events to all initial cards
jobCards.forEach(attachCardEvents);

// Filter buttons
filterButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        filterButtons.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        updateUI();
    });
});

// Initial render
updateUI();