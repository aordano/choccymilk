import anime from "animejs/lib/anime.es.js";

try {
    const introText = document.querySelector("[animated-hero-index]");

    if (!introText) {
        throw new Error("No Intro");
    }

    var tl = anime.timeline({
        easing: "easeInOutQuad",
        duration: 450,
        complete: () => {
            localStorage.setItem("animationHeroIndex", "1");
        },
    });

    tl.add(
        {
            targets: "[animated-hero-index] [animated-title]",
            opacity: 1,
            delay: anime.stagger(100),
        },
        "-=100"
    );

    tl.add(
        {
            targets: "[animated-hero-index] [animated-p-1]",
            opacity: 1,
            delay: anime.stagger(100),
        },
        "-=100"
    );

    tl.add(
        {
            targets: "[animated-hero-index] [animated-t-1]",
            opacity: 1,
            delay: anime.stagger(100),
        },
        "-=100"
    );

    tl.add(
        {
            targets: "[animated-hero-index] [animated-t-2]",
            opacity: 1,
            delay: anime.stagger(100),
        },
        "-=100"
    );

    tl.add({
        targets: "[animated-hero-index] [animated-t-3]",
        opacity: 1,
        scale: 1.2,
        rotate: 30,
        delay: anime.stagger(100),
    });

    tl.add({
        targets: "[animated-hero-index] [animated-t-3]",
        scale: 1,
        rotate: -3,
        delay: anime.stagger(100),
    });

    tl.add(
        {
            targets: "[animated-hero-index] [animated-t-4]",
            opacity: 1,
            scale: 1.1,
            rotate: -15,
            delay: anime.stagger(100),
        },
        "-=800"
    );

    tl.add({
        targets: "[animated-hero-index] [animated-t-4]",
        scale: 1,
        rotate: 3,
        delay: anime.stagger(100),
    });

    tl.add({
        targets: "[animated-hero-index] [animated-t-5]",
        opacity: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        delay: anime.stagger(100),
    });

    tl.add({
        targets: "[animated-hero-index] [animated-t-7]",
        opacity: 1,
        delay: anime.stagger(100),
    });

    tl.add({
        targets: "[animated-hero-index] [animated-t-8]",
        opacity: 1,
        delay: anime.stagger(100),
    });

    tl.add({
        targets: "[animated-hero-index] [animated-p-3]",
        opacity: 1,
        delay: anime.stagger(100),
    });

    tl.add({
        targets: "[animated-hero-index] [animated-p-4]",
        opacity: 1,
        delay: anime.stagger(100),
    });

    if (localStorage.getItem("animationHeroIndex")) {
        tl.seek(tl.duration);
        tl.pause();
    }
} catch {}
