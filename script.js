
const jobs = [
    {
        id: 1,
        company: "Mobile First Corp",
        position: "React Native Developer",
        meta: "Remote • Full-time • $130,000 - $175,000",
        description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
        status: "all"
    },
    {
        id: 2,
        company: "WebFlow Agency",
        position: "Web Designer & Developer",
        meta: "Los Angeles, CA • Part-time • $80,000 - $120,000",
        description: "Create stunning web experiences for high-profile clients.",
        status: "all"
    }
];

const jobContainer = document.querySelector(".jobs-container");
const filterButtons = document.querySelectorAll(".filters button");
const totalCount = document.querySelector(".stat-card:nth-child(1) h2");
const interviewCount = document.querySelector(".stat-card:nth-child(2) h2");
const rejectedCount = document.querySelector(".stat-card:nth-child(3) h2");

let currentFilter = "all";

function renderJobs() {
    jobContainer.innerHTML = "";

    const filteredJobs = jobs.filter(job => job.status === currentFilter);

    filteredJobs.forEach(job => {
        const jobCard = document.createElement("div");
        jobCard.className = "job-card";

        jobCard.innerHTML = `
            <div class="job-top">
                <div>
                    <h3>${job.company}</h3>
                    <p class="position">${job.position}</p>
                    <p class="meta">${job.meta}</p>
                </div>
            </div>

            <p class="description">${job.description}</p>

            <div class="actions">
                ${job.status === "all" ? `
                <button class="btn interview">INTERVIEW</button>
                <button class="btn rejected">REJECTED</button>
                ` : ""}
            </div>
        `;

        if (job.status === "all") {
            jobCard.querySelector(".interview").addEventListener("click", () => {
                job.status = "interview";
                updateCounts();
                renderJobs();
            });

            jobCard.querySelector(".rejected").addEventListener("click", () => {
                job.status = "rejected";
                updateCounts();
                renderJobs();
            });
        }

        jobContainer.appendChild(jobCard);
    });
}

function updateCounts() {
    totalCount.textContent = jobs.filter(j => j.status === "all").length;
    interviewCount.textContent = jobs.filter(j => j.status === "interview").length;
    rejectedCount.textContent = jobs.filter(j => j.status === "rejected").length;
}

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.textContent.toLowerCase();
        renderJobs();
    });
});

updateCounts();
renderJobs();
