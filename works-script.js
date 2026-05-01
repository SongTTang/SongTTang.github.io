gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".project").forEach((project) => {
    gsap.from(project, {
        scrollTrigger: {
            trigger: project,
            start: "top 92%",
            toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
    });
});

// Declare projects first — used by both blocks below
const projects = document.querySelectorAll(".project");

// Grayscale: dim all siblings when hovering a card,
// restore all when the mouse leaves that card entirely.
projects.forEach((project) => {
    project.addEventListener("mouseenter", () => {
        projects.forEach((p) => {
            if (p !== project) {
                p.style.filter = "grayscale(1) brightness(0.45)";
                p.style.transition = "filter 0.45s ease";
            }
        });
    });

    project.addEventListener("mouseleave", () => {
        projects.forEach((p) => {
            p.style.filter = "";
            p.style.transition = "filter 0.45s ease";
        });
    });
});

// Title color + image zoom + pan-follow on hover
const MAX_PAN = 50; // increased for bigger movement

projects.forEach((project) => {
    const imageLink = project.querySelector(".project-image-link");
    const img = project.querySelector(".project-image-link img");
    if (!imageLink || !img) return;

    imageLink.addEventListener("mouseenter", () => {
        project.classList.add("image-hovered");
        gsap.to(img, {
            scale: 1.5,
            duration: 0.5,
            ease: "power2.out",
        });
        gsap.to(project, {
            zIndex: 10,
            duration: 0,
        });
    });

    imageLink.addEventListener("mousemove", (e) => {
        const rect = imageLink.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(img, {
            x: relX * MAX_PAN * 2,
            y: relY * MAX_PAN * 2,
            duration: 0.6,
            ease: "power2.out",
        });
    });

    imageLink.addEventListener("mouseleave", () => {
        project.classList.remove("image-hovered");
        gsap.killTweensOf(img);
        gsap.to(img, {
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
        });
        gsap.to(project, {
            zIndex: 0,
            duration: 0,
            delay: 0.5,
        });
    });
});