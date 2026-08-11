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