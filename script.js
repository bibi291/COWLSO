/* =====================================================
   COWLSO JAVASCRIPT
   ===================================================== */


/* =====================================================
   MOBILE MENU
   ===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});


document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});


/* =====================================================
   FIVE IMAGE STORY SLIDER
   ===================================================== */

const storySlides =
    document.querySelectorAll(".story-slide");

const storyDots =
    document.querySelectorAll(".story-dot");

let currentStory = 0;


function showStory(index) {

    storySlides.forEach(slide => {
        slide.classList.remove("active");
    });

    storyDots.forEach(dot => {
        dot.classList.remove("active");
    });

    storySlides[index].classList.add("active");
    storyDots[index].classList.add("active");

}


function nextStory() {

    currentStory++;

    if (currentStory >= storySlides.length) {
        currentStory = 0;
    }

    showStory(currentStory);

}


if (storySlides.length) {
    setInterval(nextStory, 5000);
}


storyDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentStory = index;

        showStory(currentStory);

    });

});


/* =====================================================
   PAST CONFERENCE YEAR SLIDER
   ===================================================== */

const yearTrack =
    document.getElementById("yearTrack");

const yearCards =
    document.querySelectorAll(".year-card");

const previousYear =
    document.querySelector(".prev-year");

const nextYear =
    document.querySelector(".next-year");

let yearPosition = 0;


function getYearVisible() {

    if (window.innerWidth <= 900) {
        return 1;
    }

    return 3;

}


function moveYears(direction) {

    if (!yearTrack || !yearCards.length) {
        return;
    }

    const visible = getYearVisible();

    const maximum =
        Math.max(0, yearCards.length - visible);

    yearPosition += direction;

    if (yearPosition < 0) {
        yearPosition = 0;
    }

    if (yearPosition > maximum) {
        yearPosition = maximum;
    }

    const cardWidth =
        yearCards[0].getBoundingClientRect().width;

    const gap = 30;

    yearTrack.style.transform =
        `translateX(-${yearPosition * (cardWidth + gap)}px)`;

}


if (previousYear) {
    previousYear.addEventListener("click", () => {
        moveYears(-1);
    });
}

if (nextYear) {
    nextYear.addEventListener("click", () => {
        moveYears(1);
    });
}


window.addEventListener("resize", () => {

    moveYears(0);

});


/* =====================================================
   MAIN DIVISION SLIDER
   ===================================================== */

const divisionTrack =
    document.getElementById("divisionTrack");

const divisionCards =
    document.querySelectorAll(".division-card");

const divisionPrev =
    document.querySelector(".division-prev");

const divisionNext =
    document.querySelector(".division-next");

let divisionPosition = 0;


function getDivisionVisible() {

    if (window.innerWidth <= 900) {
        return 1;
    }

    return 3;

}


function moveDivisions(direction) {

    if (!divisionTrack || !divisionCards.length) {
        return;
    }

    const visible =
        getDivisionVisible();

    const maximum =
        Math.max(
            0,
            divisionCards.length - visible
        );

    divisionPosition += direction;

    if (divisionPosition < 0) {
        divisionPosition = 0;
    }

    if (divisionPosition > maximum) {
        divisionPosition = maximum;
    }

    const cardWidth =
        divisionCards[0].getBoundingClientRect().width;

    const gap = 30;

    divisionTrack.style.transform =
        `translateX(-${divisionPosition * (cardWidth + gap)}px)`;

}


if (divisionPrev) {
    divisionPrev.addEventListener("click", () => {
        moveDivisions(-1);
    });
}

if (divisionNext) {
    divisionNext.addEventListener("click", () => {
        moveDivisions(1);
    });
}


/* =====================================================
   IMAGE FALLBACK
   Prevents broken-looking empty sections
   ===================================================== */

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", () => {

        img.style.background =
            "linear-gradient(135deg,#222,#555)";

        img.style.minHeight = "200px";

        img.alt = "COWLSO image";

    });

});


/* =====================================================
   GENERIC PEOPLE / PHOTO TRACK SLIDER
   Used for Community, Speakers, Panel Discussants, Photos
   on conference-2025.html (and reusable for future years)
   ===================================================== */

document.querySelectorAll(".people-track").forEach(track => {

    let position = 0;

    const items = track.children;

    if (!items.length) {
        return;
    }

    function getVisible() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 4;
    }

    function move(direction) {

        const visible = getVisible();

        const maximum = Math.max(0, items.length - visible);

        position += direction;

        if (position < 0) position = 0;
        if (position > maximum) position = maximum;

        const itemWidth = items[0].getBoundingClientRect().width;

        const gap = 25;

        track.style.transform =
            `translateX(-${position * (itemWidth + gap)}px)`;

    }

    const prevBtn = document.querySelector(
        `.people-prev[data-target="${track.id}"]`
    );

    const nextBtn = document.querySelector(
        `.people-next[data-target="${track.id}"]`
    );

    if (prevBtn) {
        prevBtn.addEventListener("click", () => move(-1));
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => move(1));
    }

    window.addEventListener("resize", () => move(0));

});


/* =====================================================
   VIDEOS — LOAD MORE
   ===================================================== */

const loadMoreBtn = document.getElementById("loadMoreVideos");

if (loadMoreBtn) {

    loadMoreBtn.addEventListener("click", () => {

        document.querySelectorAll(".hidden-video").forEach(video => {
            video.classList.remove("hidden-video");
        });

        loadMoreBtn.style.display = "none";

    });

}


/* =====================================================
   HIGHLIGHTS — COUNT-UP STAT ANIMATION
   Numbers count up from 0 once they scroll into view
   ===================================================== */

const statNumbers = document.querySelectorAll(".stat-number");

if (statNumbers.length) {

    const animateCount = (el) => {

        const target = parseInt(el.dataset.target, 10);

        const duration = 1600;

        const start = performance.now();

        function tick(now) {

            const progress = Math.min((now - start) / duration, 1);

            // ease-out for a natural "speeding up then settling" feel
            const eased = 1 - Math.pow(1 - progress, 3);

            const current = Math.round(eased * target);

            el.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = target.toLocaleString();
            }

        }

        requestAnimationFrame(tick);

    };

    const statObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }

        });

    }, { threshold: 0.4 });

    statNumbers.forEach(el => statObserver.observe(el));

}


/* =====================================================
   YEAR HERO — background photo slideshow
   ===================================================== */

const yearHeroSlides = document.querySelectorAll(".year-hero-slide");

if (yearHeroSlides.length) {

    let heroSlideIndex = 0;

    setInterval(() => {

        yearHeroSlides[heroSlideIndex].classList.remove("active");

        heroSlideIndex = (heroSlideIndex + 1) % yearHeroSlides.length;

        yearHeroSlides[heroSlideIndex].classList.add("active");

    }, 4500);

}


/* =====================================================
   PHOTOS — LOAD MORE
   ===================================================== */

const loadMorePhotosBtn = document.getElementById("loadMorePhotos");

if (loadMorePhotosBtn) {

    loadMorePhotosBtn.addEventListener("click", () => {

        document.querySelectorAll(".hidden-photo").forEach(photo => {
            photo.classList.remove("hidden-photo");
        });

        loadMorePhotosBtn.style.display = "none";

    });

}


/* =====================================================
   TESTIMONIALS — center-focus carousel
   ===================================================== */

const testimonialPrev = document.getElementById("testimonialPrev");
const testimonialActive = document.getElementById("testimonialActive");
const testimonialNext = document.getElementById("testimonialNext");
const testimonialDots = document.getElementById("testimonialDots");

if (testimonialActive && testimonialDots) {

    // REPLACE with the actual testimonials — add or remove entries freely,
    // the carousel and dots adjust automatically to however many are here.
    const testimonialsData = [
        {
            name: "Name Surname",
            role: "Role @ Organisation",
            quote: "Replace this with the attendee's actual quote about their experience at COWLSO 2025.",
            rating: 5,
            avatar: "images/testimonial-1.jpg"
        },
        {
            name: "Name Surname",
            role: "Role @ Organisation",
            quote: "Replace this with the attendee's actual quote about their experience at COWLSO 2025.",
            rating: 5,
            avatar: "images/testimonial-2.jpg"
        },
        {
            name: "Name Surname",
            role: "Role @ Organisation",
            quote: "Replace this with the attendee's actual quote about their experience at COWLSO 2025.",
            rating: 4,
            avatar: "images/testimonial-3.jpg"
        },
        {
            name: "Name Surname",
            role: "Role @ Organisation",
            quote: "Replace this with the attendee's actual quote about their experience at COWLSO 2025.",
            rating: 5,
            avatar: "images/testimonial-4.jpg"
        }
    ];

    let testimonialIndex = 0;

    function fillTestimonialCard(cardEl, data) {

        cardEl.querySelector(".testimonial-avatar img").src = data.avatar;
        cardEl.querySelector(".testimonial-avatar img").alt = data.name;

        cardEl.querySelector(".stars").textContent =
            "★".repeat(data.rating) + "☆".repeat(5 - data.rating);

        cardEl.querySelector(".testimonial-quote").textContent = `“${data.quote}”`;
        cardEl.querySelector(".testimonial-name").textContent = data.name;
        cardEl.querySelector(".testimonial-role").textContent = data.role;

    }

    function renderDots() {

        testimonialDots.innerHTML = "";

        testimonialsData.forEach((_, i) => {

            const dot = document.createElement("span");

            dot.className = "testimonial-dot" + (i === testimonialIndex ? " active" : "");

            dot.addEventListener("click", () => {
                testimonialIndex = i;
                renderTestimonials();
            });

            testimonialDots.appendChild(dot);

        });

    }

    function renderTestimonials() {

        const n = testimonialsData.length;

        const prevIndex = (testimonialIndex - 1 + n) % n;
        const nextIndex = (testimonialIndex + 1) % n;

        fillTestimonialCard(testimonialPrev, testimonialsData[prevIndex]);
        fillTestimonialCard(testimonialActive, testimonialsData[testimonialIndex]);
        fillTestimonialCard(testimonialNext, testimonialsData[nextIndex]);

        renderDots();

    }

    renderTestimonials();

    setInterval(() => {

        testimonialIndex = (testimonialIndex + 1) % testimonialsData.length;

        renderTestimonials();

    }, 6000);

}


/* =====================================================
   NEWS / ARTICLES / PUBLICATIONS
   ===================================================== */

const newsGrid = document.getElementById("newsGrid");

if (newsGrid) {

    // REPLACE with your actual articles — add, remove or edit freely.
    // "category" values must match the data-filter values on the
    // filter pills in index.html.
    const newsData = [
        {
            title: "COWLSO Launches New Community Initiative",
            excerpt: "A short summary of the article goes here — replace with the real excerpt.",
            date: "2026-05-12",
            category: "announcements",
            image: "images/news-1.jpg"
        },
        {
            title: "Highlights from the Medical Outreach Day",
            excerpt: "A short summary of the article goes here — replace with the real excerpt.",
            date: "2026-04-28",
            category: "events",
            image: "images/news-2.jpg"
        },
        {
            title: "Meet the Women Behind COWLSO",
            excerpt: "A short summary of the article goes here — replace with the real excerpt.",
            date: "2026-04-10",
            category: "community",
            image: "images/news-3.jpg"
        },
        {
            title: "COWLSO Featured in Lagos Press",
            excerpt: "A short summary of the article goes here — replace with the real excerpt.",
            date: "2026-03-22",
            category: "press",
            image: "images/news-4.jpg"
        },
        {
            title: "Sustainability Division Tree-Planting Drive",
            excerpt: "A short summary of the article goes here — replace with the real excerpt.",
            date: "2026-03-05",
            category: "events",
            image: "images/news-5.jpg"
        },
        {
            title: "COWLSO Newsletter: Q1 Round-Up",
            excerpt: "A short summary of the article goes here — replace with the real excerpt.",
            date: "2026-02-18",
            category: "announcements",
            image: "images/news-6.jpg"
        }
    ];

    let newsFilter = "all";
    let newsSearch = "";
    let newsSort = "newest";
    let newsVisibleCount = 3;

    const newsFiltersWrap = document.getElementById("newsFilters");
    const newsSearchInput = document.getElementById("newsSearchInput");
    const newsSortSelect = document.getElementById("newsSortSelect");
    const loadMoreNewsBtn = document.getElementById("loadMoreNews");

    function formatDate(iso) {
        const d = new Date(iso);
        return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    }

    function renderNews() {

        let filtered = newsData.filter(item => {
            const matchesFilter = newsFilter === "all" || item.category === newsFilter;
            const matchesSearch = item.title.toLowerCase().includes(newsSearch.toLowerCase());
            return matchesFilter && matchesSearch;
        });

        filtered.sort((a, b) => {
            const diff = new Date(a.date) - new Date(b.date);
            return newsSort === "newest" ? -diff : diff;
        });

        newsGrid.innerHTML = "";

        if (!filtered.length) {
            newsGrid.innerHTML = '<p class="news-empty">No articles match your search.</p>';
            loadMoreNewsBtn.style.display = "none";
            return;
        }

        const toShow = filtered.slice(0, newsVisibleCount);

        toShow.forEach(item => {

            const card = document.createElement("div");
            card.className = "news-card";

            card.innerHTML = `
                <div class="news-card-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="news-card-body">
                    <span class="news-card-category">${item.category}</span>
                    <h3>${item.title}</h3>
                    <p>${item.excerpt}</p>
                    <span class="news-card-date">${formatDate(item.date)}</span>
                </div>
            `;

            newsGrid.appendChild(card);

        });

        loadMoreNewsBtn.style.display = newsVisibleCount >= filtered.length ? "none" : "inline-block";

    }

    if (newsFiltersWrap) {
        newsFiltersWrap.querySelectorAll(".filter-pill").forEach(pill => {

            pill.addEventListener("click", () => {

                newsFiltersWrap.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
                pill.classList.add("active");

                newsFilter = pill.dataset.filter;
                newsVisibleCount = 3;

                renderNews();

            });

        });
    }

    if (newsSearchInput) {
        newsSearchInput.addEventListener("input", (e) => {
            newsSearch = e.target.value;
            newsVisibleCount = 3;
            renderNews();
        });
    }

    if (newsSortSelect) {
        newsSortSelect.addEventListener("change", (e) => {
            newsSort = e.target.value;
            renderNews();
        });
    }

    if (loadMoreNewsBtn) {
        loadMoreNewsBtn.addEventListener("click", () => {
            newsVisibleCount += 3;
            renderNews();
        });
    }

    renderNews();

}


/* =====================================================
   KEY LEADERSHIP
   ===================================================== */

const leadershipGrid = document.getElementById("leadershipGrid");

if (leadershipGrid) {

    // REPLACE with your actual leadership team — add, remove or edit freely.
    const leadershipData = [
        { name: "Name Surname", role: "President", email: "president@cowlso.org", photo: "images/leader-1.jpg" },
        { name: "Name Surname", role: "Vice President", email: "vp@cowlso.org", photo: "images/leader-2.jpg" },
        { name: "Name Surname", role: "Secretary", email: "secretary@cowlso.org", photo: "images/leader-3.jpg" },
        { name: "Name Surname", role: "Treasurer", email: "treasurer@cowlso.org", photo: "images/leader-4.jpg" },
        { name: "Name Surname", role: "Financial Secretary", email: "finsec@cowlso.org", photo: "images/leader-5.jpg" },
        { name: "Name Surname", role: "Publicity Secretary", email: "publicity@cowlso.org", photo: "images/leader-6.jpg" },
        { name: "Name Surname", role: "Welfare Officer", email: "welfare@cowlso.org", photo: "images/leader-7.jpg" },
        { name: "Name Surname", role: "Provost", email: "provost@cowlso.org", photo: "images/leader-8.jpg" }
    ];

    let leadershipSearch = "";
    let leadershipVisibleCount = 4;

    const leadershipSearchInput = document.getElementById("leadershipSearchInput");
    const loadMoreLeadershipBtn = document.getElementById("loadMoreLeadership");

    function renderLeadership() {

        const filtered = leadershipData.filter(person =>
            person.name.toLowerCase().includes(leadershipSearch.toLowerCase())
        );

        leadershipGrid.innerHTML = "";

        if (!filtered.length) {
            leadershipGrid.innerHTML = '<p class="news-empty">No members match your search.</p>';
            loadMoreLeadershipBtn.style.display = "none";
            return;
        }

        const toShow = filtered.slice(0, leadershipVisibleCount);

        toShow.forEach(person => {

            const card = document.createElement("div");
            card.className = "leader-card";

            card.innerHTML = `
                <img src="${person.photo}" alt="${person.name}">
                <div class="leader-overlay">
                    <strong>${person.name}</strong>
                    <span>${person.role}</span>
                    <span class="leader-email">${person.email}</span>
                </div>
            `;

            leadershipGrid.appendChild(card);

        });

        loadMoreLeadershipBtn.style.display = leadershipVisibleCount >= filtered.length ? "none" : "inline-block";

    }

    if (leadershipSearchInput) {
        leadershipSearchInput.addEventListener("input", (e) => {
            leadershipSearch = e.target.value;
            leadershipVisibleCount = 4;
            renderLeadership();
        });
    }

    if (loadMoreLeadershipBtn) {
        loadMoreLeadershipBtn.addEventListener("click", () => {
            leadershipVisibleCount += 4;
            renderLeadership();
        });
    }

    renderLeadership();

}


/* =====================================================
   MEDICAL DIVISION — interactive archive
   ===================================================== */

const medYearPanel = document.getElementById("medYearPanel");

if (medYearPanel) {

    // REPLACE with real COWLSO Medical Division data. Pin positions
    // (top/left) are percentages within the stylised map box in
    // index.html's .med-map — adjust them to taste. Photos/videos
    // arrays take any number of entries.
    const medicalData = {
        "2026": { outreach: [], programmes: [] },
        "2025": {
            outreach: [
                {
                    id: "yaba",
                    name: "Yaba",
                    top: "30%",
                    left: "38%",
                    date: "July 2025",
                    description: "COWLSO brought free screenings, consultations and health education directly to the Yaba community, reaching families who don't always have easy access to care.",
                    image: "images/medical-yaba-1.jpg",
                    peopleReached: 320,
                    volunteers: 18,
                    services: "Screenings, consultations, health education",
                    photos: [
                        "images/medical-yaba-1.jpg",
                        "images/medical-yaba-2.jpg",
                        "images/medical-yaba-3.jpg",
                        "images/medical-yaba-4.jpg",
                        "images/medical-yaba-5.jpg",
                        "images/medical-yaba-6.jpg"
                    ],
                    videos: [
                        { poster: "images/medical-yaba-video-1.jpg", src: "videos/medical-yaba-1.mp4" },
                        { poster: "images/medical-yaba-video-2.jpg", src: "videos/medical-yaba-2.mp4" }
                    ]
                },
                {
                    id: "ikeja",
                    name: "Ikeja",
                    top: "48%",
                    left: "58%",
                    date: "September 2025",
                    description: "A full day of maternal health screenings and consultations for women across Ikeja.",
                    image: "images/medical-ikeja-1.jpg",
                    peopleReached: 210,
                    volunteers: 14,
                    services: "Maternal health screenings",
                    photos: [
                        "images/medical-ikeja-1.jpg",
                        "images/medical-ikeja-2.jpg",
                        "images/medical-ikeja-3.jpg"
                    ],
                    videos: [
                        { poster: "images/medical-ikeja-video-1.jpg", src: "videos/medical-ikeja-1.mp4" }
                    ]
                },
                {
                    id: "surulere",
                    name: "Surulere",
                    top: "62%",
                    left: "35%",
                    date: "November 2025",
                    description: "Blood pressure and diabetes screening drive with on-site nurses and follow-up referrals.",
                    image: "images/medical-surulere-1.jpg",
                    peopleReached: 180,
                    volunteers: 10,
                    services: "Blood pressure & diabetes screening",
                    photos: [
                        "images/medical-surulere-1.jpg",
                        "images/medical-surulere-2.jpg"
                    ],
                    videos: []
                }
            ],
            programmes: [
                {
                    id: "training-workshop",
                    name: "Medical Training Workshop",
                    date: "May 2025",
                    description: "A hands-on workshop equipping volunteer nurses and first-responders with updated emergency care skills.",
                    image: "images/medical-programme-1.jpg",
                    photos: ["images/medical-programme-1.jpg", "images/medical-programme-1b.jpg"],
                    videos: []
                },
                {
                    id: "health-education",
                    name: "Community Health Education",
                    date: "June 2025",
                    description: "In-community sessions on nutrition, hygiene and preventive care for families across Lagos.",
                    image: "images/medical-programme-2.jpg",
                    photos: ["images/medical-programme-2.jpg"],
                    videos: [
                        { poster: "images/medical-programme-2-video.jpg", src: "videos/medical-programme-2.mp4" }
                    ]
                }
            ]
        },
        "2024": { outreach: [], programmes: [] },
        "2023": { outreach: [], programmes: [] }
    };

    let medState = { year: "2025", selection: null };

    const medBreadcrumb = document.getElementById("medBreadcrumb");
    const medYearTabs = document.getElementById("medYearTabs");
    const medOverlay = document.getElementById("medOverlay");
    const medSlideover = document.getElementById("medSlideover");
    const medSlideoverContent = document.getElementById("medSlideoverContent");

    function escapeHtml(str) {
        const div = document.createElement("div");
        div.textContent = str || "";
        return div.innerHTML;
    }

    /* ---------- BREADCRUMB ---------- */

    function renderBreadcrumb() {

        let html = `<button data-crumb="root">Medical Division</button>`;
        html += `<span class="med-crumb-sep">/</span>`;
        html += `<button data-crumb="year">${medState.year}</button>`;

        if (medState.selection) {

            const yearData = medicalData[medState.year];

            if (medState.selection.type === "location") {
                const loc = yearData.outreach.find(l => l.id === medState.selection.id);
                html += `<span class="med-crumb-sep">/</span>`;
                html += `<span class="med-crumb-current">Lagos</span>`;
                html += `<span class="med-crumb-sep">/</span>`;
                html += `<span class="med-crumb-current">${escapeHtml(loc ? loc.name : "")}</span>`;
            } else if (medState.selection.type === "programme") {
                const prog = yearData.programmes.find(p => p.id === medState.selection.id);
                html += `<span class="med-crumb-sep">/</span>`;
                html += `<span class="med-crumb-current">${escapeHtml(prog ? prog.name : "")}</span>`;
            }

        }

        medBreadcrumb.innerHTML = html;

    }

    medBreadcrumb.addEventListener("click", (e) => {

        const btn = e.target.closest("button[data-crumb]");
        if (!btn) return;

        closeSlideover();

        if (btn.dataset.crumb === "root" || btn.dataset.crumb === "year") {
            medState.selection = null;
            renderBreadcrumb();
        }

    });

    /* ---------- YEAR PANEL ---------- */

    function buildMapHTML(outreach) {

        if (!outreach.length) {
            return `<p class="med-empty-note">No medical outreach recorded for this year yet.</p>`;
        }

        let pins = outreach.map(loc => `
            <button class="med-map-pin" style="top:${loc.top}; left:${loc.left};" data-loc="${loc.id}">
                <div class="med-map-tooltip">
                    <strong>${escapeHtml(loc.name)}</strong>
                    <span>Medical Outreach<br>${escapeHtml(loc.date)}</span>
                    <span class="med-map-tooltip-meta">${loc.photos.length} Photos · ${loc.videos.length} Videos</span>
                </div>
                <div class="med-map-pin-dot"></div>
                <div class="med-map-pin-label">${escapeHtml(loc.name)}</div>
            </button>
        `).join("");

        return `
            <div class="med-map-wrap">
                <div class="med-map">${pins}</div>
            </div>
        `;

    }

    function buildProgrammesHTML(programmes) {

        if (!programmes.length) {
            return `<p class="med-empty-note">No other programmes recorded for this year yet.</p>`;
        }

        return `
            <div class="med-programmes-grid">
                ${programmes.map(p => `
                    <div class="med-programme-card" data-prog="${p.id}">
                        <span class="med-programme-date">${escapeHtml(p.date)}</span>
                        <h4>${escapeHtml(p.name)}</h4>
                        <p>${escapeHtml(p.description)}</p>
                        <span class="text-link">Explore Programme →</span>
                    </div>
                `).join("")}
            </div>
        `;

    }

    function renderYearPanel() {

        const data = medicalData[medState.year] || { outreach: [], programmes: [] };

        medYearPanel.innerHTML = `
            <div class="med-year-subheading">
                <span>MEDICAL OUTREACH</span>
                <h3>Lagos, ${medState.year}</h3>
            </div>
            ${buildMapHTML(data.outreach)}

            <div class="med-year-subheading">
                <span>${medState.year}</span>
                <h3>Other Programmes</h3>
            </div>
            ${buildProgrammesHTML(data.programmes)}
        `;

    }

    function switchYear(year) {

        if (year === medState.year) return;

        closeSlideover();

        medYearPanel.classList.add("fading");

        setTimeout(() => {

            medState.year = year;
            medState.selection = null;

            medYearTabs.querySelectorAll(".med-year-tab").forEach(t => {
                t.classList.toggle("active", t.dataset.year === year);
            });

            renderYearPanel();
            renderBreadcrumb();

            medYearPanel.classList.remove("fading");

        }, 200);

    }

    medYearTabs.addEventListener("click", (e) => {
        const btn = e.target.closest(".med-year-tab");
        if (btn) switchYear(btn.dataset.year);
    });

    medYearPanel.addEventListener("click", (e) => {

        const pin = e.target.closest(".med-map-pin");
        if (pin) {
            openLocation(pin.dataset.loc);
            return;
        }

        const prog = e.target.closest(".med-programme-card");
        if (prog) {
            openProgramme(prog.dataset.prog);
        }

    });

    /* ---------- SLIDE-OVER ---------- */

    function statBlock(value, label) {
        if (value === undefined || value === null || value === "") return "";
        return `<div><strong>${escapeHtml(String(value))}</strong><span>${escapeHtml(label)}</span></div>`;
    }

    function mediaSectionsHTML(item) {

        let html = "";

        html += `<div class="med-slide-section-label">PHOTOS</div>`;

        if (item.photos && item.photos.length) {
            html += `<div class="med-slide-photo-grid">`;
            item.photos.forEach((src, i) => {
                html += `<button data-photo-index="${i}"><img src="${src}" alt="${escapeHtml(item.name)} photo ${i + 1}"></button>`;
            });
            html += `</div>`;
        } else {
            html += `<p style="color:#999; font-size:13px;">No photos added yet.</p>`;
        }

        html += `<div class="med-slide-section-label">VIDEOS</div>`;

        if (item.videos && item.videos.length) {
            html += `<div class="med-slide-video-row">`;
            item.videos.forEach((v, i) => {
                html += `
                    <button class="med-portrait-card" data-video-index="${i}">
                        <img src="${v.poster}" alt="${escapeHtml(item.name)} video ${i + 1}">
                        <span class="med-portrait-play">▶</span>
                    </button>
                `;
            });
            html += `</div>`;
        } else {
            html += `<p style="color:#999; font-size:13px;">No videos added yet.</p>`;
        }

        return html;

    }

    let currentSlideItem = null;

    function openLocation(locId) {

        const yearData = medicalData[medState.year];
        const loc = yearData.outreach.find(l => l.id === locId);
        if (!loc) return;

        currentSlideItem = loc;
        medState.selection = { type: "location", id: locId };
        renderBreadcrumb();

        medSlideoverContent.innerHTML = `
            <div class="med-slide-image"><img src="${loc.image}" alt="${escapeHtml(loc.name)} medical outreach"></div>
            <span class="med-slide-meta">Lagos · ${escapeHtml(loc.date)}</span>
            <h2>${escapeHtml(loc.name)} Medical Outreach</h2>
            <p>${escapeHtml(loc.description)}</p>
            <div class="med-slide-stats">
                ${statBlock(loc.peopleReached, "People Reached")}
                ${statBlock(loc.volunteers, "Volunteers")}
                ${statBlock(loc.services, "Services")}
            </div>
            ${mediaSectionsHTML(loc)}
        `;

        openSlideover();

    }

    function openProgramme(progId) {

        const yearData = medicalData[medState.year];
        const prog = yearData.programmes.find(p => p.id === progId);
        if (!prog) return;

        currentSlideItem = prog;
        medState.selection = { type: "programme", id: progId };
        renderBreadcrumb();

        medSlideoverContent.innerHTML = `
            <div class="med-slide-image"><img src="${prog.image}" alt="${escapeHtml(prog.name)}"></div>
            <span class="med-slide-meta">${escapeHtml(prog.date)}</span>
            <h2>${escapeHtml(prog.name)}</h2>
            <p>${escapeHtml(prog.description)}</p>
            ${mediaSectionsHTML(prog)}
        `;

        openSlideover();

    }

    function openSlideover() {
        medOverlay.classList.add("open");
        medSlideover.classList.add("open");
        document.body.classList.add("med-no-scroll");
    }

    function closeSlideover() {
        medOverlay.classList.remove("open");
        medSlideover.classList.remove("open");
        document.body.classList.remove("med-no-scroll");
    }

    document.getElementById("medSlideoverClose").addEventListener("click", closeSlideover);
    medOverlay.addEventListener("click", closeSlideover);

    medSlideoverContent.addEventListener("click", (e) => {

        const photoBtn = e.target.closest("[data-photo-index]");
        if (photoBtn && currentSlideItem) {
            openLightbox(currentSlideItem.photos, parseInt(photoBtn.dataset.photoIndex, 10));
            return;
        }

        const videoBtn = e.target.closest("[data-video-index]");
        if (videoBtn && currentSlideItem) {
            openVideo(currentSlideItem.videos[parseInt(videoBtn.dataset.videoIndex, 10)]);
        }

    });

    /* ---------- LIGHTBOX ---------- */

    const medLightbox = document.getElementById("medLightbox");
    const medLightboxImg = document.getElementById("medLightboxImg");
    const medLightboxCounter = document.getElementById("medLightboxCounter");
    const medLightboxDownload = document.getElementById("medLightboxDownload");

    let lightboxPhotos = [];
    let lightboxIndex = 0;

    function renderLightbox() {
        const src = lightboxPhotos[lightboxIndex];
        medLightboxImg.src = src;
        medLightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxPhotos.length}`;
        medLightboxDownload.href = src;
    }

    function openLightbox(photos, index) {
        lightboxPhotos = photos;
        lightboxIndex = index;
        renderLightbox();
        medLightbox.classList.add("open");
    }

    function closeLightbox() {
        medLightbox.classList.remove("open");
    }

    document.getElementById("medLightboxClose").addEventListener("click", closeLightbox);

    document.getElementById("medLightboxPrev").addEventListener("click", () => {
        lightboxIndex = (lightboxIndex - 1 + lightboxPhotos.length) % lightboxPhotos.length;
        renderLightbox();
    });

    document.getElementById("medLightboxNext").addEventListener("click", () => {
        lightboxIndex = (lightboxIndex + 1) % lightboxPhotos.length;
        renderLightbox();
    });

    /* ---------- VIDEO MODAL ---------- */

    const medVideoModal = document.getElementById("medVideoModal");
    const medVideoPlayer = document.getElementById("medVideoPlayer");
    const medVideoDownload = document.getElementById("medVideoDownload");

    function openVideo(video) {
        if (!video) return;
        medVideoPlayer.src = video.src;
        medVideoDownload.href = video.src;
        medVideoModal.classList.add("open");
        medVideoPlayer.play().catch(() => {});
    }

    function closeVideo() {
        medVideoPlayer.pause();
        medVideoPlayer.currentTime = 0;
        medVideoModal.classList.remove("open");
    }

    document.getElementById("medVideoClose").addEventListener("click", closeVideo);

    /* ---------- keyboard support ---------- */

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeLightbox();
            closeVideo();
            closeSlideover();
        }
        if (medLightbox.classList.contains("open")) {
            if (e.key === "ArrowLeft") document.getElementById("medLightboxPrev").click();
            if (e.key === "ArrowRight") document.getElementById("medLightboxNext").click();
        }
    });

    /* ---------- FEATURED STORY LINK ---------- */

    const medFeaturedLink = document.getElementById("medFeaturedLink");
    if (medFeaturedLink) {
        medFeaturedLink.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("journey").scrollIntoView({ behavior: "smooth" });
            if (medState.year !== "2025") switchYear("2025");
            setTimeout(() => openLocation("yaba"), 350);
        });
    }

    /* ---------- INIT ---------- */

    renderYearPanel();
    renderBreadcrumb();

}


/* =====================================================
   CONFERENCE 2026 — flip-clock countdown
   ===================================================== */

const flipClock = document.getElementById("flipClock");

if (flipClock) {

    // REPLACE with the confirmed 2026 conference date/time if it changes
    const countdownTarget = new Date("2026-10-22T09:00:00+01:00").getTime();

    const flipDays = document.getElementById("flipDays").querySelector("span");
    const flipHours = document.getElementById("flipHours").querySelector("span");
    const flipMinutes = document.getElementById("flipMinutes").querySelector("span");
    const flipSeconds = document.getElementById("flipSeconds").querySelector("span");

    const cards = {
        days: document.getElementById("flipDays"),
        hours: document.getElementById("flipHours"),
        minutes: document.getElementById("flipMinutes"),
        seconds: document.getElementById("flipSeconds")
    };

    const prevValues = { days: null, hours: null, minutes: null, seconds: null };

    function pad(n) {
        return String(n).padStart(2, "0");
    }

    function setUnit(cardEl, span, key, value) {

        const padded = pad(value);

        if (prevValues[key] !== null && prevValues[key] !== padded) {
            cardEl.classList.remove("flipping");
            // force reflow so the animation can restart
            void cardEl.offsetWidth;
            cardEl.classList.add("flipping");
        }

        prevValues[key] = padded;
        span.textContent = padded;

    }

    function tickCountdown() {

        const now = Date.now();
        const distance = countdownTarget - now;

        if (distance <= 0) {

            flipClock.classList.add("hide");
            document.getElementById("conf26CountdownDone").classList.add("show");

            clearInterval(countdownInterval);
            return;

        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setUnit(cards.days, flipDays, "days", days);
        setUnit(cards.hours, flipHours, "hours", hours);
        setUnit(cards.minutes, flipMinutes, "minutes", minutes);
        setUnit(cards.seconds, flipSeconds, "seconds", seconds);

    }

    tickCountdown();
    const countdownInterval = setInterval(tickCountdown, 1000);

}


/* =====================================================
   CONFERENCE 2026 — CENTRAL DATA
   Edit prices/dates/date/theme here only — everything on the
   page renders from this object. Gala Night is included free
   for conference ticket holders; the fee applies to exhibitors
   only (see registration.exhibition.galaAccess).
   ===================================================== */

const conferenceData = {

    date: "22 October 2026",

    theme: "25 Years of Visionary Legacy, Inspiring the Next Generation",

    registration: {

        physical: {
            standard: "₦150,000",
            late: "₦165,000",
            standardDates: "20 September – 15 October",
            lateDates: "16 October – 24 October",
            galaIncluded: true
        },

        virtual: {
            standard: "₦40,000",
            late: "₦40,000",
            standardDates: "20 September – 15 October",
            lateDates: "16 October – 24 October"
        },

        exhibition: {
            backStall: "₦250,000",
            frontStall: "₦300,000",
            galaAccess: "₦50,000"
        }

    }

};

const conf26RegisterSection = document.getElementById("register");

if (conf26RegisterSection) {

    function setText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    const reg = conferenceData.registration;

    // timeline (shared dates, taken from the physical tier)
    setText("timelineStandardDates", reg.physical.standardDates.toUpperCase());
    setText("timelineLateDates", reg.physical.lateDates.toUpperCase());

    // physical pass
    setText("physicalStandardPrice", reg.physical.standard);
    setText("physicalStandardDates", reg.physical.standardDates);
    setText("physicalLatePrice", reg.physical.late);
    setText("physicalLateDates", reg.physical.lateDates);

    // virtual pass
    setText("virtualStandardPrice", reg.virtual.standard);
    setText("virtualStandardDates", reg.virtual.standardDates);
    setText("virtualLatePrice", reg.virtual.late);
    setText("virtualLateDates", reg.virtual.lateDates);

    // gala — exhibitor-only fee, shown in the Gala Night section,
    // the Exhibition Booth section, and the FAQ
    setText("galaAudiencePrice", reg.exhibition.galaAccess);
    setText("exhibitorGalaPrice", reg.exhibition.galaAccess);
    setText("faqExhibitorGala", reg.exhibition.galaAccess);
    setText("faqExhibitorGala2", reg.exhibition.galaAccess);

    // exhibition stalls
    setText("backStallPrice", reg.exhibition.backStall);
    setText("frontStallPrice", reg.exhibition.frontStall);
    setText("faqBackStall", reg.exhibition.backStall);
    setText("faqFrontStall", reg.exhibition.frontStall);

    // FAQ fee summary
    setText("faqPhysicalStandard", reg.physical.standard);
    setText("faqPhysicalLate", reg.physical.late);
    setText("faqVirtualStandard", reg.virtual.standard);
    setText("faqVirtualLate", reg.virtual.late);

}


/* =====================================================
   CONFERENCE 2026 — FAQ ACCORDION
   ===================================================== */

const conf26FaqList = document.getElementById("conf26FaqList");

if (conf26FaqList) {

    conf26FaqList.querySelectorAll(".conf26-faq-item").forEach(item => {

        const question = item.querySelector(".conf26-faq-question");
        const answer = item.querySelector(".conf26-faq-answer");

        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("open");

            // close any other open item (accordion behaviour)
            conf26FaqList.querySelectorAll(".conf26-faq-item.open").forEach(openItem => {
                if (openItem !== item) {
                    openItem.classList.remove("open");
                    openItem.querySelector(".conf26-faq-answer").style.maxHeight = null;
                }
            });

            if (isOpen) {
                item.classList.remove("open");
                answer.style.maxHeight = null;
            } else {
                item.classList.add("open");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }

        });

        question.setAttribute("aria-expanded", "false");
        question.setAttribute("role", "button");
        question.setAttribute("tabindex", "0");

        question.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                question.click();
            }
        });

    });

}


/* =====================================================
   CONFERENCE 2026 — WHAT TO EXPECT (scroll reveal)
   ===================================================== */

const conf26ExpectItems = document.querySelectorAll(".conf26-expect-item");

if (conf26ExpectItems.length) {

    const expectObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });

    }, { threshold: 0.3 });

    conf26ExpectItems.forEach(item => expectObserver.observe(item));

}