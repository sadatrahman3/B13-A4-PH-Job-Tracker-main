const jobs = [
    {
        id: 1,
        company: "Mobile First Corp",
        position: "React Native Developer",
        meta: "Remote • Full-time • $130k - $175k",
        description: "Build cross-platform mobile apps.",
        status: "all"
    },
    {
        id: 2,
        company: "WebFlow Agency",
        position: "Web Designer",
        meta: "LA • Part-time • $80k - $120k",
        description: "Create modern web experiences.",
        status: "all"
    }
];

const jobContainer = document.querySelector(".jobs-container");
const filterButtons = document.querySelectorAll(".filters button");

const availableCount = document.getElementById("availableCount");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const jobCountText = document.getElementById("jobCountText");

let currentFilter = "all";

function renderJobs() {
    jobContainer.innerHTML = "";

    const filtered = jobs.filter(job => job.status === currentFilter);

    if (filtered.length === 0) {
        jobContainer.innerHTML = `
            <div class="empty-state">
                No jobs found in this category.
            </div>
        `;
        return;
    }

    filtered.forEach(job => {
        const card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML = `
            <div class="job-top">
                <div>
                    <h3>${job.company}</h3>
                    <p class="position">${job.position}</p>
                    <p class="meta">${job.meta}</p>
                </div>
            </div>

            <p class="description">${job.description}</p>

            ${job.status === "all" ? `
            <div class="actions">
                <button class="btn interview-btn">INTERVIEW</button>
                <button class="btn rejected-btn">REJECTED</button>
            </div>
            ` : ""}
        `;

        if (job.status === "all") {
            card.querySelector(".interview-btn").addEventListener("click", () => {
                job.status = "interview";
                updateUI();
            });

            card.querySelector(".rejected-btn").addEventListener("click", () => {
                job.status = "rejected";
                updateUI();
            });
        }

        jobContainer.appendChild(card);
    });
}

function updateCounts() {
    const total = jobs.length;
    const available = jobs.filter(j => j.status === "all").length;
    const interview = jobs.filter(j => j.status === "interview").length;
    const rejected = jobs.filter(j => j.status === "rejected").length;

    availableCount.textContent = available;
    interviewCount.textContent = interview;
    rejectedCount.textContent = rejected;

    let visible = 0;
    if (currentFilter === "all") visible = available;
    if (currentFilter === "interview") visible = interview;
    if (currentFilter === "rejected") visible = rejected;

    jobCountText.textContent = `${visible} of ${total} jobs`;
}

function updateUI() {
    updateCounts();
    renderJobs();
}

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentFilter = btn.dataset.filter;
        updateUI();
    });
});

updateUI();