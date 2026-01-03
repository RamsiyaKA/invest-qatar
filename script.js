window.addEventListener("scroll", function () {
    const header = document.querySelector(".navbar");
    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Dropdown toggles (open/close on click) - supports mobile and desktop click toggling
document.querySelectorAll('.dropdown').forEach(drop => {
    drop.addEventListener('click', function (e) {
        e.stopPropagation();
        this.classList.toggle('open');

        // close others
        document.querySelectorAll('.dropdown').forEach(other => {
            if (other !== this) other.classList.remove('open');
        });
    });
});

// Close dropdowns / nav when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
    if (document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        navToggle?.setAttribute('aria-expanded', 'false');
    }
});

const dropdowns = document.querySelectorAll('.has-caret');

dropdowns.forEach(drop => {
    drop.addEventListener('mouseenter', () => {
        // Remove 'open' class from all dropdowns
        dropdowns.forEach(d => d.classList.remove('open'));

        // Add 'open' to the hovered one
        drop.classList.add('open');
    });

    drop.addEventListener('mouseleave', () => {
        // Optional: remove open when mouse leaves
        drop.classList.remove('open');
    });
});

// Smooth scroll to section
// nav why-qatar scroll to why qatar section
document.querySelector('.why-qatar').addEventListener('click', () => {
    const section = document.querySelector('.container-fluid');
    section.scrollIntoView({ behavior: 'smooth' });
});

// nav how we help scroll to how we help section
document.querySelector('.how-we-help').addEventListener('click', () => {
    const section = document.querySelector('.bg-box');
    section.scrollIntoView({ behavior: 'smooth' });
});

const navToggleBtn = document.querySelector('.nav-toggle');

navToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    // toggle aria-expanded
    const expanded = navToggleBtn.getAttribute('aria-expanded') === 'true';
    navToggleBtn.setAttribute('aria-expanded', String(!expanded));

    // toggle class to track open/close state
    navToggleBtn.classList.toggle('open');

    // change icon based on open state
    navToggleBtn.querySelector('.hamburger').textContent =
        navToggleBtn.classList.contains('open') ? '✖' : '☰';

    // toggle nav menu
    document.body.classList.toggle('nav-open');
});

// Close nav if clicking outside
document.addEventListener('click', () => {
    if (document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        navToggleBtn.classList.remove('open');
        navToggleBtn.setAttribute('aria-expanded', 'false');
        navToggleBtn.querySelector('.hamburger').textContent = '☰';  // reset to hamburger
    }
});


// ------------------------
// CAROUSEL SLIDER
// ------------------------
const slides = document.querySelectorAll(".hero-slider .slide");
const slider = document.querySelector(".hero-slider");
const indicatorsContainer = document.querySelector(".slider-indicators");
let index = 0;
const totalSlides = slides.length;

// Create slider bars
slides.forEach((_, i) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    if (i === 0) bar.classList.add("active"); // first slide active
    indicatorsContainer.appendChild(bar);
});
const bars = document.querySelectorAll(".slider-indicators .bar");

// Show slide and update active bar
function showSlide(i) {
    const percentage = -(i * 100 / totalSlides);
    slider.style.transform = `translateX(${percentage}%)`;

    // Update active bar
    bars.forEach((bar, idx) => {
        bar.classList.toggle("active", idx === i);
    });
}

// Next / Prev buttons
document.getElementById("next").onclick = () => {
    index = (index + 1) % totalSlides;
    showSlide(index);
};

document.getElementById("prev").onclick = () => {
    index = (index - 1 + totalSlides) % totalSlides;
    showSlide(index);
};

// Auto-slide every 5 seconds
setInterval(() => {
    index = (index + 1) % totalSlides;
    showSlide(index);
}, 5000);

// Initial slide
showSlide(index);

// Close nav or open dropdowns on resize or Escape
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        navToggle?.setAttribute('aria-expanded', 'false');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.body.classList.remove('nav-open');
        navToggle?.setAttribute('aria-expanded', 'false');
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
    }
});


// ------------------------
// TESTIMONIAL SLIDER
// ------------------------
const testimonialData = [
    {
        quote: "Expanding to Qatar in 2016 was the right choice — great results, strong support, and an easy transition for my family. ",
        company: "-talabat",
        person_img: "images/person1.png",
        name: "Mr. Francisco Miguel de Sousa",
        role: "Managing Director"
    },
    {
        quote: "Qatar provided unmatched opportunities. The support system helped us scale rapidly.",
        company: "-Microsoft",
        person_img: "images/person3.jpg",
        name: "Sarah Williams",
        role: "Head of Growth"
    },
    {
        quote: "Our transition to Qatar was seamless. Amazing business ecosystem!",
        company: "-Amazon",
        person_img: "images/person2.jpeg",
        name: "Jonathan Miller",
        role: "CEO"
    }
];

const MAX_LENGTH = 150; // characters before truncation
const sliderContainer = document.getElementById("testimonial-slider-inner");

testimonialData.forEach((item, i) => {
    const slide = document.createElement("div");
    slide.classList.add("testimonial-slide");

    const isLong = item.quote.length > MAX_LENGTH;
    const shortText = item.quote.substring(0, MAX_LENGTH) + "...";

    slide.innerHTML = `
        <div class="t-slide-left elegant-quote">
            <div class="head-class">
                <img src="images/mission.png" width="20">
                <p>Voices of Success</p>
            </div>
            <div style="margin-top: 20px;">
            <img src="images/quote2.png" class="quote-icon" width="40" height="40" style="float: left;margin-right: 10px;">
                <p class="quote" id="quote-${i}">
                    ${isLong ? shortText : item.quote}

                <img src="images/quote.png" class="quote-icon" width="40" height="40" style="float: right;">
                </p>

                ${isLong ? `<button class="see-more" data-id="${i}">See More</button>` : ""}

                <h3 class="company">${item.company}</h3>
            </div>
        </div>

        <div class="t-slide-right">            
                <div class="person-card">
                    <img src="${item.person_img}" class="person-img">
                    <h4>${item.name}</h4>
                    <p>${item.role}</p>
                                        
                    <!-- Controls -->
                    <div class="controls">
                        <button id="testimonial-prev">❮</button>
                        <button id="testimonial-next">❯</button>
                    </div>
                </div>
                
        </div>
    `;

    sliderContainer.appendChild(slide);
});

// see more / see less functionality
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("see-more")) {

        const id = e.target.getAttribute("data-id");
        const quoteEl = document.getElementById("quote-" + id);

        const fullText = testimonialData[id].quote;
        const shortText = fullText.substring(0, MAX_LENGTH) + "...";

        const expanded = e.target.getAttribute("data-expanded") === "true";

        if (expanded) {
            quoteEl.textContent = shortText;
            e.target.textContent = "See More";
            e.target.setAttribute("data-expanded", "false");
        } else {
            quoteEl.textContent = fullText;
            e.target.textContent = "See Less";
            e.target.setAttribute("data-expanded", "true");
        }
    }
});


let tIndex = 0;
const tSlider = document.querySelector(".testimonial-slider-inner");

function updateTestimonial() {
    tSlider.style.transform = `translateX(-${tIndex * 100}%)`;
}

document.getElementById("testimonial-next").onclick = () => {
    tIndex = (tIndex + 1) % testimonialData.length;
    updateTestimonial();
};

document.getElementById("testimonial-prev").onclick = () => {
    tIndex = (tIndex - 1 + testimonialData.length) % testimonialData.length;
    updateTestimonial();
};

// Auto-slide every 5 seconds
setInterval(() => {
    tIndex = (tIndex + 1) % testimonialData.length;
    updateTestimonial();
}, 5000);



// ------------------------
// NEWS & ARTICLES SLIDER
// ------------------------

const newsData = [
    {
        img: "images/news/news1.jpg",
        title: "Qatar Achieves Major Milestone",
        date: "03. JAN. 2025",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        img: "images/news/news2.jpg",
        title: "Tech Investments Rising",
        date: "19. FEB. 2025",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        img: "images/news/news3.jpg",
        title: "New Business Policies",
        date: "13. MAY. 2025",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        img: "images/news/news4.jpg",
        title: "Expo 2025 Preparations",
        date: "23. AUG. 2025",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        img: "images/news/news5.jpg",
        title: "Tourism Boost Expected",
        date: "13. OCT. 2025",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        img: "images/news/news6.jpg",
        title: "Sports Sector Development",
        date: "13. DEC. 2025",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

const newsTrack = document.querySelector(".news-track");

// Generate cards
newsData.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("news-card");

    const shortText = item.desc.substring(0, 400);
    const isLong = item.desc.length > 400;

    card.innerHTML = `
        <img src="${item.img}" alt="">
        <h3>${item.title}</h3>
        <p class="news-date">${item.date}</p>
        <hr>

        <p class="news-desc" id="desc-${index}">
            ${isLong ? shortText + "..." : item.desc}
        </p>

        ${isLong ? `<span class="read-more" data-id="${index}">Read More</span>` : ""}
    `;

    newsTrack.appendChild(card);
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("read-more")) {
        const id = e.target.getAttribute("data-id");
        const descElement = document.getElementById(`desc-${id}`);

        // find the full data
        const fullText = newsData[id].desc;

        if (e.target.innerText === "Read More") {
            descElement.innerText = fullText;
            e.target.innerText = "Show Less";
        } else {
            descElement.innerText = fullText.substring(0, 400) + "...";
            e.target.innerText = "Read More";
        }
    }
});


const newsPrev = document.querySelector(".nws-prev");
const newsNext = document.querySelector(".nws-next");
const newsCards = document.querySelectorAll(".news-card");

let newsIndex = 0;
const cardsPerView = 3;
const totalCards = newsCards.length;

const maxIndex = Math.ceil(totalCards / cardsPerView) - 1;

function updateNewsSlider() {
    const slideWidth = newsCards[0].offsetWidth + 25; // card width + gap
    const moveX = -(newsIndex * slideWidth * cardsPerView);
    newsTrack.style.transform = `translateX(${moveX}px)`;
}

newsNext.addEventListener("click", () => {
    newsIndex = newsIndex >= maxIndex ? 0 : newsIndex + 1;
    updateNewsSlider();
});

newsPrev.addEventListener("click", () => {
    newsIndex = newsIndex <= 0 ? maxIndex : newsIndex - 1;
    updateNewsSlider();
});

let autoSlide = setInterval(() => {
    newsIndex = newsIndex >= maxIndex ? 0 : newsIndex + 1;
    updateNewsSlider();
}, 4000);

// Reset auto slide when user clicks arrows
function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
        newsIndex = newsIndex >= maxIndex ? 0 : newsIndex + 1;
        updateNewsSlider();
    }, 4000);
}

// ------------------------
// EVENTS SECTION ANIMATION AND CONTENT SWITCH
// ------------------------
function animateImage() {
    const imgWrapper = document.querySelector(".events-image");

    imgWrapper.classList.remove("show");     // reset
    void imgWrapper.offsetWidth;             // force reflow
    imgWrapper.classList.add("show");        // trigger animation
}

// Run animation on initial load
window.addEventListener("load", animateImage);


const events = [
    {
        title: "Qatar Business Expo 2025",
        desc: "Invest Qatar 2025 conference, a premier event bringing together global investors, industry leaders, and government officials to explore investment opportunities in Qatar's dynamic economy.",
        img: "images/events/events1.jpg",
        date: "12-14 NOV 2025",
        time: "09:00 AM - 06:00 PM",
        venue: "Doha Exhibition and Convention Center"
    },
    {
        title: "Tech Investment Summit",
        desc: "A showcase of Qatar's growth in technology and AI.",
        img: "images/events/events2.jpg",
        date: "05-07 MAR 2025",
        time: "10:00 AM - 04:00 PM",
        venue: "Qatar National Convention Center"
    },
    {
        title: "Qatar Innovation Week",
        desc: "Meet the brightest startups reshaping Qatar’s future.",
        img: "images/events/events3.jpeg",
        date: "20-22 JUN 2025",
        time: "09:00 AM - 05:00 PM",
        venue: "Msheireb Downtown Doha"
    }
];

let i = 0;

setInterval(() => {
    i = (i + 1) % events.length;

    document.querySelector(".events-text h2").textContent = events[i].title;
    document.querySelector(".events-desc").textContent = events[i].desc;
    document.querySelector(".events-image img").src = events[i].img;

    document.querySelector(".section-date-time .events-date").textContent = events[i].date;
    document.querySelector(".section-date-time .events-time").textContent = events[i].time;
    document.querySelector(".section-date-time .events-venue").textContent = events[i].venue;

    animateImage();   // pop-in on content change
}, 4000);

// ------------------------
// BACK TO TOP BUTTON
// ------------------------
const backToTop = document.getElementById('backToTop');

// Show button after scrolling down 200px
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// Scroll to top on click
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
