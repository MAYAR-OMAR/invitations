document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-btn');
    const introCover = document.getElementById('intro-cover');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');

    // 1. Cover Open Animation
 // 1. Cover Open Animation
// 1. Cover Open Animation & Auto Scroll
// 1. Cover Open Animation & Smooth Slow Auto-Scroll
// 1. Cover Open Animation & Super Slow Smooth Auto-Scroll to Bottom
// 1. Cover Open Animation & Interruptible Smooth Scroll
openBtn.addEventListener('click', () => {
    // Fire Confetti
    confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#cba135', '#4a121a']
    });

    // إظهار المحتوى الأساسي
    mainContent.classList.remove('hidden');

    // تشغيل الموسيقى
    bgMusic.play().catch(err => console.log('Autoplay blocked:', err));

    // إخفاء الـ Cover
    introCover.style.opacity = '0';
    introCover.style.transition = 'opacity 0.8s ease';

    setTimeout(() => {
        introCover.style.display = 'none';
        
        let isAutoScrolling = true; // متغير عشان نعرف هل السكرول التلقائي شغال ولا لأ
        let animationFrameId = null;

        // دالة لإيقاف السكرول التلقائي فوراً لو المستخدم تدخل
        const stopAutoScroll = () => {
            if (isAutoScrolling) {
                isAutoScrolling = false;
                cancelAnimationFrame(animationFrameId);
                // بنشيل الـ Listeners عشان متفضلش شغالة في الخلفية
                window.removeEventListener('wheel', stopAutoScroll);
                window.removeEventListener('touchstart', stopAutoScroll);
                window.removeEventListener('keydown', stopAutoScroll);
            }
        };

        // مراقبة أي تدخل من المستخدم (ماوس، لمس الشاشة، أو كيبورد)
        window.addEventListener('wheel', stopAutoScroll, { passive: true });
        window.addEventListener('touchstart', stopAutoScroll, { passive: true });
        window.addEventListener('keydown', stopAutoScroll, { passive: true });

        // دالة السكرول اللي هتتوقف لو المستخدم لمس حاجة
        function controlledScroll(targetY, duration) {
            const startY = window.pageYOffset;
            const distance = targetY - startY;
            let startTime = null;

            function animation(currentTime) {
                if (!isAutoScrolling) return; // لو المستخدم أوقفها، اخرج فوراً

                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                
                const ease = progress < 0.5 
                    ? 2 * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                window.scrollTo(0, startY + distance * ease);

                if (timeElapsed < duration && isAutoScrolling) {
                    animationFrameId = requestAnimationFrame(animation);
                } else {
                    // لو خلص السكرول لوحده، نشيل الـ Listeners برضه
                    stopAutoScroll();
                }
            }

            animationFrameId = requestAnimationFrame(animation);
        }

        // حطينا المدة طويلة (مثلاً 20000 أو 25000 زي ما عملتي) 
        // عشان تنزل ببطء شديد، بس أول ما المستخدم يحרק الماوس أو يلمس الشاشة هتوقف فوراً وتسيب له التحكم!
        const targetY = document.documentElement.scrollHeight - window.innerHeight;
        controlledScroll(targetY, 25000); 

    }, 400);
});
    // 2. Swiper Initialization (3D Coverflow)
    if (typeof Swiper !== 'undefined') {
        new Swiper('.mySwiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
            },
        });
    }
// Tḥded el taree5 wel sa3a (29 Oct 2026, Sa3a 18:00)
    var countDownDate = new Date("Oct 29, 2026 18:00:00").getTime();

    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Nḥot el arqam fel HTML
        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;

        // Lw el waqt 5eles
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown-timer").innerHTML = "IT'S TIME!";
        }
    }, 1000);
    // 4. Music Toggle logic
    let isPlaying = false;
    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            isPlaying = true;
        } else {
            bgMusic.pause();
            isPlaying = false;
        }
    });
});
let currentIndex = 0;
const cards = document.querySelectorAll('.gallery-card');
const dots = document.querySelectorAll('.gallery-dots .dot');

function updateGallery(index) {
    cards.forEach((card, i) => {
        card.classList.remove('active', 'prev', 'next', 'hidden-card');
        
        if (i === index) {
            card.classList.add('active');
        } else if (i === (index - 1 + cards.length) % cards.length) {
            card.classList.add('prev');
        } else if (i === (index + 1) % cards.length) {
            card.classList.add('next');
        } else {
            card.classList.add('hidden-card');
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateGallery(currentIndex);
}

function currentSlide(index) {
    currentIndex = index;
    updateGallery(currentIndex);
}

// By2leb kol 3 swany awtomatik (tqdry t8yry el raqam da)
let slideInterval = setInterval(nextSlide, 3000);

// Stop el autoplay lw el user daas 3al gallery w yrga3 ytahrak tany
const container = document.getElementById('galleryContainer');
container.addEventListener('mouseenter', () => clearInterval(slideInterval));
container.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 3000));

// Initialization
updateGallery(currentIndex);


