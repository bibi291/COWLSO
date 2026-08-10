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