if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

//spinning cards
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
    const cards = [
        { id: "#card-1", endTranslateX: -2000, rotate: 45 },
        { id: "#card-2", endTranslateX: -1000, rotate: -30 },
        { id: "#card-3", endTranslateX: -2000, rotate: 45 },
        { id: "#card-4", endTranslateX: -1500, rotate: -30 },
        { id: "#card-5", endTranslateX: -2000, rotate: 45 },
        { id: "#card-6", endTranslateX: -1500, rotate: 20 },
        { id: "#card-7", endTranslateX: -2000, rotate: -30 },
        { id: "#card-8", endTranslateX: -1000, rotate: -30 },
        { id: "#card-9", endTranslateX: -2000, rotate: 45 },
        { id: "#card-10", endTranslateX: -1500, rotate: -30 },
        { id: "#card-11", endTranslateX: -2000, rotate: 45 },
        { id: "#card-12", endTranslateX: -1000, rotate: -30 },
    ];

    // Only set up the spinning cards scroll effect if .wrapper exists
    if (document.querySelector(".wrapper")) {
        ScrollTrigger.create({
            trigger: ".wrapper",
            start: "top top",
            end: "+=900vh",
            scrub: 1,
            pin: true,
            onUpdate: (self) => {
                gsap.to(".wrapper", {
                    x: `${-350 * self.progress}vw`,
                    duration: 0.5,
                    ease: "power3.out",
                });
            }
        });

        cards.forEach((card) => {
            if (!document.querySelector(card.id)) return;
            ScrollTrigger.create({
                trigger: card.id,
                start: "top top",
                end: "+=1200vh",
                scrub: 1,
                onUpdate: (self) => {
                    gsap.to(card.id, {
                        x: `${card.endTranslateX * self.progress}px`,
                        rotate: `${card.rotate * self.progress * 2}`,
                        duration: 0.5,
                        ease: "power3.out",
                    });
                }
            });
        });
    }
});

// ─── Project-cards overlay (index.html only) ──────────────────────────
document.addEventListener("DOMContentLoaded", function () {
    // Prefer the outro's h2 specifically, fall back to first h2
    const trigger = document.querySelector(".outro h2") || document.querySelector("h2");
    const close = document.querySelector(".close");
    const cardContainer = document.querySelector(".project-cards");
    const backgroundOverlay = document.querySelector('.background-overlay');

    // Bail out if this page doesn't have the overlay system
    if (!trigger || !close || !cardContainer || !backgroundOverlay) return;

    const tl = gsap.timeline({
        paused: true,
        reversed: true,
        onStart: function () {
            cardContainer.style.display = "flex";
            cardContainer.style.visibility = "visible";
            cardContainer.style.opacity = 1;
            cardContainer.style.pointerEvents = "all";
        },
        onReverseComplete: function () {
            cardContainer.style.display = "none";
            cardContainer.style.opacity = 0;
            cardContainer.style.pointerEvents = "none";
        },
    });

    tl.from(".project-cards .project-card", 1.5, {
        y: 1000,
        stagger: { amount: 0.3 },
        ease: "power4.inOut",
    })
    .from(".close", 0.5, {
        scale: 0,
        delay: 1,
    }, "<")
    .from(".footer", 0.5, {
        opacity: 0,
    });

    trigger.addEventListener("click", function () {
        if (tl.reversed()) {
            tl.play();
        } else {
            tl.reverse();
        }
        backgroundOverlay.style.display = 'block';
        setTimeout(() => {
            backgroundOverlay.classList.add('show');
        }, 10);
    });

    close.addEventListener("click", function () {
        tl.reverse();
        setTimeout(() => {
            backgroundOverlay.classList.remove('show');
            setTimeout(() => {
                backgroundOverlay.style.display = 'none';
            }, 500);
        }, 1500);
    });
});

// ─── Project-card hover lift ──────────────────────────────────────────
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -30, duration: 0.3, ease: "power1.inOut" });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, duration: 0.3, ease: "power1.inOut" });
    });
});