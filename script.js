// إضافة تأثيرات حركية عند التمرير
document.addEventListener('DOMContentLoaded', function() {
    // تأثير ظهور العناصر عند التمرير
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    // تطبيق المراقبة على العناصر
    document.querySelectorAll('.meal-card, .cert-item, .badge').forEach((el) => {
        observer.observe(el);
    });

    // تحريك الصور عند تحريك الماوس
    document.querySelectorAll('.meal-card img').forEach(img => {
        img.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = img.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            img.style.transform = `scale(1.1) translate(${x * 10}px, ${y * 10}px)`;
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1) translate(0, 0)';
        });
    });
});

// تحسين أداء التمرير
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// إضافة تأثيرات عند التمرير
window.addEventListener('scroll', debounce(() => {
    const cards = document.querySelectorAll('.meal-card');
    cards.forEach(card => {
        const slideInAt = (window.scrollY + window.innerHeight) - card.offsetHeight / 2;
        const cardBottom = card.offsetTop + card.offsetHeight;
        const isHalfShown = slideInAt > card.offsetTop;
        const isNotScrolledPast = window.scrollY < cardBottom;
        
        if (isHalfShown && isNotScrolledPast) {
            card.classList.add('active');
        }
    });
}));

// التحكم في القائمة الثابتة وزر العودة للأعلى
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.sticky-nav');
    const backToTop = document.getElementById('back-to-top');
    
    // إظهار/إخفاء القائمة الثابتة
    if (window.scrollY > 100) {
        nav.classList.add('visible');
    } else {
        nav.classList.remove('visible');
    }
    
    // إظهار/إخفاء زر العودة للأعلى
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// وظيفة العودة للأعلى
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// تحريك شريط الإعلانات
const announcements = document.querySelector('.announcement-content');
if (announcements) {
    announcements.addEventListener('animationend', () => {
        announcements.style.animation = 'none';
        void announcements.offsetWidth; // إعادة تشغيل الرسوم المتحركة
        announcements.style.animation = 'scroll 20s linear infinite';
    });
}
