const projects = [
    {
        name: "Personal Portfolio",
        desc: "Professional portfolio with dynamic sections, smooth motion, and a responsive design system.",
        img: "https://images.unsplash.com/photo-1650919031731-0a1ffb23285a?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
        tech: "HTML, CSS, JavaScript",
        role: "Design + Development",
        outcome: "Improved presentation and clarity",
        link: "#contact",
    },
    {
        name: "Coffee Shop Landing Page",
        desc: "Conversion-focused landing page with high-impact visuals and crisp product messaging.",
        img: "https://images.unsplash.com/photo-1764023874653-f1bc06f59022?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
        tech: "HTML, CSS",
        role: "UI Engineering",
        outcome: "Higher lead conversion",
        link: "#contact",
    },
    {
        name: "Task Tracker App",
        desc: "Lightweight task manager featuring filtering, status updates, and local persistence.",
        img: "https://images.unsplash.com/photo-1753715613651-749ef230482c?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
        tech: "JavaScript, LocalStorage",
        role: "Frontend + Logic",
        outcome: "Improved team productivity",
        link: "#contact",
    },
    {
        name: "Hypermarket App",
        desc: "Viral hypermarket app in Kenya with real-time inventory, cart, and order tracking.",
        img: "https://images.unsplash.com/photo-1758876201966-a680772a41ef?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
        tech: "Flutter, Firebase, REST APIs",
        role: "Developer + Admin",
        outcome: "30% faster checkout",
        link: "#contact",
    },
];

const testimonials = [
    {
        quote: "Dennis transformed our rough idea into a polished product and shipped ahead of schedule.",
        author: "Sarah M.",
        role: "Product Manager",
        img: "https://i.pravatar.cc/96?img=47",
    },
    {
        quote: "His code quality is excellent, and he communicates tradeoffs clearly before implementation.",
        author: "Brian K.",
        role: "Engineering Lead",
        img: "https://i.pravatar.cc/96?img=12",
    },
    {
        quote: "We saw a noticeable performance improvement after Dennis optimized our frontend.",
        author: "Naomi T.",
        role: "Startup Founder",
        img: "https://i.pravatar.cc/96?img=5",
    },
    {
        quote: "Reliable, detail-oriented, and easy to work with. He consistently delivers what he promises.",
        author: "James O.",
        role: "Project Coordinator",
        img: "https://i.pravatar.cc/96?img=15",
    },
    {
        quote: "Dennis helped us build scalable API features that reduced support issues significantly.",
        author: "Amina L.",
        role: "Operations Manager",
        img: "https://i.pravatar.cc/96?img=32",
    },
];

const projectContainer = document.getElementById("projects-container");
const testimonialsTrack = document.getElementById("testimonials-track");
const projectsToggle = document.getElementById("projects-toggle");
const skillsToggle = document.getElementById("skills-toggle");
const experienceToggle = document.getElementById("experience-toggle");
const skillsList = document.getElementById("skills-list");
const scrollBar = document.getElementById("scroll-bar");
const heroPhoto = document.querySelector(".hero-photo");
const blobs = document.querySelectorAll(".blob");
const themeToggle = document.getElementById("theme-toggle");
const introVeil = document.getElementById("intro-veil");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const introText = document.getElementById("intro-text");
const navLinks = document.querySelectorAll(".nav-links a");
const parallaxText = document.querySelector(".parallax-text");

function renderProjects() {
    if (!projectContainer) return;

    projectContainer.innerHTML = projects
        .map(
            (project) => `
        <article class="project-item tilt">
            <img src="${project.img}" alt="${project.name}">
            <div class="project-body">
                <h3>${project.name}</h3>
                <p>${project.desc}</p>
                <div class="project-meta">
                    <span>${project.role}</span>
                    <span>${project.outcome}</span>
                </div>
                <span class="tech-pill">${project.tech}</span>
                <div class="project-actions">
                    <a class="btn btn-outline" href="${project.link}">Request Details</a>
                    <a class="btn btn-primary" href="#contact">Start a Project</a>
                </div>
            </div>
        </article>
    `
        )
        .join("");
}

function setupScrollReveal() {
    const revealItems = document.querySelectorAll(".reveal");
    if (!revealItems.length) return;

    if (!prefersReducedMotion) {
        revealItems.forEach((item) => item.classList.add("wipe"));
    }

    const directions = [
        { x: -120, y: 0 },
        { x: 120, y: 0 },
        { x: 0, y: -120 },
        { x: 0, y: 120 },
        { x: -90, y: -70 },
        { x: 90, y: 70 },
        { x: -60, y: 120 },
        { x: 60, y: -120 },
    ];
    const motions = ["motion-a", "motion-b", "motion-c"];

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    const inner = entry.target.querySelectorAll(".reveal-item");
                    inner.forEach((el) => el.classList.add("visible"));
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealItems.forEach((item) => {
        if (!prefersReducedMotion) {
            const pick = directions[Math.floor(Math.random() * directions.length)];
            item.style.setProperty("--reveal-x", `${pick.x}px`);
            item.style.setProperty("--reveal-y", `${pick.y}px`);
        }
        const staggerItems = item.querySelectorAll(
            ".card, .project-item, .stat-card, .testimonial-card, .metric-card, .tool-row, .skills-list li"
        );
        staggerItems.forEach((child, index) => {
            const delay = Math.min(index * 140, 560);
            child.style.transitionDelay = `${delay}ms`;
            child.style.animationDelay = `${delay}ms`;
            if (!prefersReducedMotion) {
                const choice = directions[Math.floor(Math.random() * directions.length)];
                child.style.setProperty("--reveal-x", `${choice.x}px`);
                child.style.setProperty("--reveal-y", `${choice.y}px`);
                const rot = Math.floor(Math.random() * 10) - 5;
                const scale = 0.94 + Math.random() * 0.06;
                child.style.setProperty("--reveal-rot", `${rot}deg`);
                child.style.setProperty("--reveal-scale", `${scale}`);
                child.style.setProperty("--reveal-blur", "10px");
            }
            const motionPick = motions[Math.floor(Math.random() * motions.length)];
            child.classList.add(motionPick);
            child.classList.add("reveal-item");
        });
        observer.observe(item);
    });
}

function setupParallax() {
    if (prefersReducedMotion) return;
    if (!blobs.length && !heroPhoto) return;

    const handleScroll = () => {
        const scrolled = window.scrollY || 0;
        if (heroPhoto) {
            heroPhoto.style.transform = `translateY(${scrolled * 0.03}px)`;
        }
        blobs.forEach((blob, index) => {
            const offset = (index + 1) * 0.02;
            blob.style.transform = `translateY(${scrolled * offset}px)`;
        });
        if (parallaxText) {
            parallaxText.style.transform = `translateY(${scrolled * 0.04}px)`;
        }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
}

function setupThemeToggle() {
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || "dark";

    setTheme(initialTheme);

    themeToggle.addEventListener("click", () => {
        const next = document.body.dataset.theme === "dark" ? "light" : "dark";
        setTheme(next);
    });
}

function setTheme(theme) {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    if (!themeToggle) return;

    const icon = theme === "dark" ? "☀️" : "🌙";
    const label = theme === "dark" ? "Light" : "Dark";
    themeToggle.querySelector(".theme-icon").textContent = icon;
    themeToggle.querySelector(".theme-text").textContent = label;
    themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
}
function renderTestimonials() {
    if (!testimonialsTrack) return;

    const cards = testimonials
        .map(
            (item) => `
        <article class="testimonial-card tilt">
            <p>"${item.quote}"</p>
            <div class="testimonial-person">
                <img src="${item.img}" alt="${item.author}" class="testimonial-avatar">
                <div>
                    <div class="testimonial-author">${item.author}</div>
                    <div class="testimonial-role">${item.role}</div>
                </div>
            </div>
        </article>
    `
        )
        .join("");

    testimonialsTrack.innerHTML = cards + cards;
}

function setupTilt() {
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const tiltTargets = document.querySelectorAll(".tilt, .card, .metric-card, .stat-card, .hero-card");
    tiltTargets.forEach((el) => el.classList.add("tilt"));

    const maxTilt = 8;

    tiltTargets.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateX = ((y / rect.height) - 0.5) * -maxTilt;
            const rotateY = ((x / rect.width) - 0.5) * maxTilt;
            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
        });
    });
}

renderProjects();
renderTestimonials();
setupScrollReveal();
setupParallax();
setupThemeToggle();
setupTilt();

function setupShowMore() {
    if (projectContainer && projectsToggle) {
        const cards = Array.from(projectContainer.querySelectorAll(".project-item"));
        const limit = 6;
        const apply = (expanded) => {
            cards.forEach((card, index) => {
                card.classList.toggle("is-hidden", !expanded && index >= limit);
            });
            projectsToggle.textContent = expanded ? "Show Less" : "Show More";
        };
        let expanded = false;
        apply(expanded);
        projectsToggle.addEventListener("click", () => {
            expanded = !expanded;
            apply(expanded);
        });
    }

    if (skillsList && skillsToggle) {
        const items = Array.from(skillsList.querySelectorAll("li"));
        const limit = 10;
        const apply = (expanded) => {
            items.forEach((item, index) => {
                item.classList.toggle("is-hidden", !expanded && index >= limit);
            });
            skillsToggle.textContent = expanded ? "Show Less" : "Show More";
        };
        let expanded = false;
        apply(expanded);
        skillsToggle.addEventListener("click", () => {
            expanded = !expanded;
            apply(expanded);
        });
    }

    const experienceItems = document.querySelectorAll("#experience .timeline-item");
    if (experienceItems.length && experienceToggle) {
        const limit = 2;
        const apply = (expanded) => {
            experienceItems.forEach((item, index) => {
                item.classList.toggle("is-hidden", !expanded && index >= limit);
            });
            experienceToggle.textContent = expanded ? "Show Less" : "Show More";
        };
        let expanded = false;
        apply(expanded);
        experienceToggle.addEventListener("click", () => {
            expanded = !expanded;
            apply(expanded);
        });
    }
}

setupShowMore();

function setupScrollProgress() {
    if (!scrollBar) return;
    const update = () => {
        const doc = document.documentElement;
        const scrollTop = doc.scrollTop || document.body.scrollTop;
        const scrollHeight = doc.scrollHeight - doc.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        scrollBar.style.width = `${progress}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
}

setupScrollProgress();
setupIntroRotation();

function setupNavAnimations() {
    if (prefersReducedMotion) return;
    if (!navLinks.length) return;

    const animations = [
        "nav-zoom",
        "nav-swing",
        "nav-flip",
        "nav-skew",
        "nav-pop",
        "nav-slide-left",
        "nav-slide-right",
        "nav-slide-up",
        "nav-slide-down",
        "nav-diag-left",
        "nav-diag-right",
    ];

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const pick = animations[Math.floor(Math.random() * animations.length)];
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;
            target.classList.remove(...animations);
            void target.offsetWidth;
            target.classList.add(pick);
            const cleanup = () => target.classList.remove(pick);
            target.addEventListener("animationend", cleanup, { once: true });
        });
    });
}

setupNavAnimations();

function setupIntroRotation() {
    if (prefersReducedMotion) return;
    if (introText) {
        const base = "Dennis Kamuri Nyambura";
        const repeated = `${base} • `.repeat(12);
        introText.textContent = repeated;
    }
    const rope = setupRopeIntro();
    const duration = rope ? rope.duration : 5000;
    const minSide = Math.min(window.innerWidth, window.innerHeight);
    const introRadius = Math.max(160, Math.round((Math.min(window.innerWidth, window.innerHeight) * 0.48)));
    document.documentElement.style.setProperty("--intro-radius", `${introRadius}px`);
    document.documentElement.style.setProperty("--intro-duration", `${duration}ms`);
    document.body.classList.add("is-intro");
    window.setTimeout(() => {
        document.body.classList.remove("is-intro");
        if (rope && rope.cleanup) rope.cleanup();
        if (introVeil) {
            introVeil.remove();
        }
    }, duration);
}

function setupRopeIntro() {
    const targets = Array.from(document.querySelectorAll(".brand-name"));
    if (!targets.length) return null;

    const splitElements = [];
    targets.forEach((el) => {
        if (el.dataset.split === "true") return;
        const text = el.textContent || "";
        el.dataset.split = "true";
        el.textContent = "";
        for (const ch of text) {
            const span = document.createElement("span");
            span.className = "rope-char";
            span.textContent = ch === " " ? "\u00A0" : ch;
            el.appendChild(span);
        }
        splitElements.push(el);
    });

    const allChars = Array.from(document.querySelectorAll(".rope-char"));
    if (!allChars.length || allChars.length > 500) return null;

    document.body.classList.add("rope-hidden");

    const overlay = document.createElement("div");
    overlay.className = "rope-overlay";
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("rope-svg");
    overlay.appendChild(svg);
    document.body.appendChild(overlay);

    const brandAvatar = document.querySelector(".brand-avatar");
    const avatarRect = brandAvatar ? brandAvatar.getBoundingClientRect() : null;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const orbitX = avatarRect ? avatarRect.left + avatarRect.width / 2 : centerX;
    const orbitY = avatarRect ? avatarRect.top + avatarRect.height / 2 : centerY;
    const baseR = avatarRect ? Math.max(48, avatarRect.width * 1.6) : Math.min(window.innerWidth, window.innerHeight) * 0.18;
    const minR = baseR;
    const maxR = baseR + 60;

    allChars.forEach((span, index) => {
        const rect = span.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;
        const t = index / allChars.length;
        const angle = t * Math.PI * 2;
        const radius = maxR;
        const startX = centerX + Math.cos(angle) * radius;
        const startY = centerY + Math.sin(angle) * radius;

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", startX);
        line.setAttribute("y1", startY);
        line.setAttribute("x2", startX);
        line.setAttribute("y2", startY);
        line.classList.add("rope-line");
        svg.appendChild(line);

        const length = Math.hypot(targetX - startX, targetY - startY);
        line.style.strokeDasharray = `${length}`;
        line.style.strokeDashoffset = `${length}`;

        const letter = document.createElement("span");
        letter.className = "rope-letter";
        letter.textContent = span.textContent || "";
        const computed = window.getComputedStyle(span);
        letter.style.fontFamily = computed.fontFamily;
        letter.style.fontSize = computed.fontSize;
        letter.style.fontWeight = computed.fontWeight;
        letter.style.color = computed.color;
        letter.style.left = `${startX}px`;
        letter.style.top = `${startY}px`;
        letter.style.setProperty("--tx", `${targetX - startX}px`);
        letter.style.setProperty("--ty", `${targetY - startY}px`);
        const delay = index * 900;
        line.style.transitionDelay = `${delay}ms`;
        overlay.appendChild(letter);

        requestAnimationFrame(() => {
            const startDelay = delay + 300;
            window.setTimeout(() => {
                const dx = startX - centerX;
                const dy = startY - centerY;
                const len = Math.hypot(dx, dy) || 1;
                const bloom = 40;
                const bloomX = startX + (dx / len) * bloom;
                const bloomY = startY + (dy / len) * bloom;
                const phase = index * 0.35;
                const rotations = 1.2;
                const waveRadius = baseR + 80;
                const waveAmp = 60;
                const orbitAngle = angle + phase + rotations * Math.PI * 2;
                const waveX = orbitX + Math.cos(orbitAngle) * (waveRadius + Math.sin(phase) * waveAmp);
                const waveY = orbitY + Math.sin(orbitAngle) * (waveRadius + Math.cos(phase) * waveAmp);
                const scatterX = waveX;
                const scatterY = waveY;
                const total = 10000;
                line.animate(
                    [
                        { x2: startX, y2: startY, strokeDashoffset: length },
                        { x2: bloomX, y2: bloomY, strokeDashoffset: length * 0.7, offset: 0.25 },
                        { x2: scatterX, y2: scatterY, strokeDashoffset: length * 0.4, offset: 0.7 },
                        { x2: targetX, y2: targetY, strokeDashoffset: 0 },
                    ],
                    {
                        duration: total,
                        delay: 0,
                        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                        fill: "forwards",
                    }
                );
                letter.animate(
                    [
                        { transform: "translate(-50%, -50%)" },
                        { transform: `translate(-50%, -50%) translate(${bloomX - startX}px, ${bloomY - startY}px)`, offset: 0.25 },
                        { transform: `translate(-50%, -50%) translate(${scatterX - startX}px, ${scatterY - startY}px)`, offset: 0.7 },
                        { transform: `translate(-50%, -50%) translate(${targetX - startX}px, ${targetY - startY}px)` },
                    ],
                    {
                        duration: total,
                        delay: 0,
                        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                        fill: "forwards",
                    }
                );
            }, startDelay);
        });
    });

    const maxDelay = (allChars.length - 1) * 600;
    const totalDuration = maxDelay + 10000 + 600;

    return {
        duration: totalDuration,
        cleanup: () => {
            document.body.classList.remove("rope-hidden");
            overlay.remove();
        },
    };
}
