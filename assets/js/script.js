const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    const duration = 2000; // animation time (ms)
    const increment = target / (duration / 16);

    let count = 0;

    const updateCount = () => {
        count += increment;

        if (count < target) {
            counter.innerText = formatNumber(Math.floor(count));
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = formatNumber(target);
        }
    };

    updateCount();
});

/* Format numbers like 7K+, 200M+ */
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + "M+";
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + "K+";
    } else {
        return num;
    }
}

/* ANNOUNCEMENT */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            const items = entry.target.parentElement.querySelectorAll(".reveal");

            items.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add("active");
                }, index * 200); // delay between cards
            });

        }
    });
}, { threshold: 0.3 });

reveals.forEach(el => observer.observe(el));

/* BACKGROUND ANIMATION */
const glows = document.querySelectorAll(".glow");

document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    glows.forEach((glow, index) => {
        const speed = (index + 1) * 0.3;
        glow.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});



/********* PAGE TRANSITION *********/

/* Page transition */
const transition = document.querySelector(".page-transition");

/* Fade IN when page loads */
window.addEventListener("load", () => {
    setTimeout(() => {
        transition.classList.add("loaded");
    }, 100);
});

/* Fade OUT when clicking links */
const links = document.querySelectorAll("a");

links.forEach(link => {
    link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        /* ignore empty or same page links */
        if (href && !href.startsWith("#")) {
            e.preventDefault();

            transition.classList.remove("loaded");
            transition.classList.add("active");

            setTimeout(() => {
                window.location.href = href;
            }, 500);
        }
    });
});