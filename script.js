//旋转卡片
gsap.registerPlugin(ScrollTrigger);

document.addEventListener ("DOMContentLoaded", function () {
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
            })
        }
    });

    cards.forEach((card) => {
        ScrollTrigger.create({
            trigger: "card.id",
            start: "top top",
            end: "+=1200vh",
            scrub: 1,
            onUpdate: (self) => {
                gsap.to(card.id, {
                    x: `${card.endTranslateX * self.progress}px`,
                    rotate: `${card.rotate * self.progress * 2}`,
                    duration: 0.5,
                    ease: "power3.out",
                })
            }
        })
    });

});

// 下面是project cards的部分
document.addEventListener("DOMContentLoaded", function () {
    const work = document.querySelector("h2");
    const close = document.querySelector(".close");
    const cardContainer = document.querySelector(".project-cards");
    const backgroundOverlay = document.querySelector('.background-overlay');

    const tl = gsap.timeline({
        paused: true,
        reversed: true,
        onStart: function () {
            cardContainer.style.display = "flex"; // 动画开始时显示
            cardContainer.style.visibility = "visible"; // 动画开始时可见
            cardContainer.style.opacity = 1; // 动画开始时不透明
            cardContainer.style.pointerEvents = "all"; // 允许点击
        },
        onReverseComplete: function () {
            cardContainer.style.display = "none"; // 动画反转完成时隐藏
            cardContainer.style.opacity = 0; // 动画反转完成时透明
            cardContainer.style.pointerEvents = "none"; // 禁止点击
        },
    });

    tl.from(".project-cards .project-card", 1.5, {
        y: 1000,
        stagger: {
            amount: 0.3,
        },
        ease: "power4.inOut",
    })
    .from(
        ".close",
        0.5,
        {
            scale: 0,
            delay: 1,
        },
        "<"
    )
    .from(".footer", 0.5, {
        opacity: 0,
    });

    work.addEventListener("click", function () {
        if (tl.reversed()) {
            tl.play();
        } else {
            tl.reverse();
        }
        backgroundOverlay.style.display = 'block'; // 显示背景遮罩
        setTimeout(() => {
            backgroundOverlay.classList.add('show'); // 添加渐变显示类
        }, 10); // 延迟一点，确保样式生效
    });

    close.addEventListener("click", function () {
        tl.reverse(); // 反转卡片动画

        // 1秒后开始背景渐出
        setTimeout(() => {
            backgroundOverlay.classList.remove('show'); // 移除渐变显示类
            // 背景渐出，持续0.5秒
            setTimeout(() => {
                backgroundOverlay.style.display = 'none'; // 隐藏背景遮罩
            }, 500); // 设置与渐出过渡时间一致
        }, 1500); // 设置延迟1.5秒开始背景渐出
    });
});

/////////////////////////////////////点击work自动滑动到底部
document.querySelector('.work').addEventListener('click', function () {
    // 滑动到页面底部
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });

    // 自动点击 h2 展开 project-cards
    setTimeout(function () {
        document.querySelector('h2').click();
    }, 400);  // 延迟1秒，确保页面滑动完成后触发点击
});

/////////////////////////////////////project-card添加hover上浮效果
// 获取所有 project-card 元素
const projectCards = document.querySelectorAll('.project-card');

// 给每个 .project-card 添加 hover 事件
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // 鼠标进入时，上移 60px
        gsap.to(card, { y: -30, duration: 0.3, ease: "power1.inOut" });
    });

    card.addEventListener('mouseleave', () => {
        // 鼠标离开时，回到原位
        gsap.to(card, { y: 0, duration: 0.3, ease: "power1.inOut" });
    });
});
