/* ==============================================================
   1. CUSTOM CYBER CURSOR (Hanya jalan jika pakai Mouse/PC)
   ============================================================== */
const cursorDot = document.getElementById("cursor-dot");
const cursorOutline = document.getElementById("cursor-outline");

if (cursorDot && cursorOutline && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener("mousemove", function(e) {
        mouseX = e.clientX; mouseY = e.clientY;
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
        let distX = mouseX - outlineX; let distY = mouseY - outlineY;
        outlineX = outlineX + (distX * 0.15); outlineY = outlineY + (distY * 0.15);
        cursorOutline.style.left = `${outlineX}px`; cursorOutline.style.top = `${outlineY}px`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

/* ==============================================================
   2. LOADING SCREEN
   ============================================================== */
window.addEventListener("load", function() {
    setTimeout(function() {
        var loader = document.getElementById("loader");
        loader.style.opacity = "0";
        setTimeout(function() { loader.style.display = "none"; }, 600);
    }, 1500);
});

/* ==============================================================
   3. SMART PARTICLES.JS (Mengurangi partikel di HP agar tidak lemot)
   ============================================================== */
document.addEventListener("DOMContentLoaded", function() {
    if(window.particlesJS) {
        // Cek ukuran layar, jika HP partikel dikurangi jadi 20, jika PC 60.
        let particleCount = window.innerWidth < 768 ? 20 : 60;
        
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": particleCount, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#facc15" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#facc15", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { 
                    "onhover": { "enable": window.innerWidth > 768, "mode": "grab" }, // Hover partikel hanya di PC
                    "onclick": { "enable": true, "mode": "push" }, 
                    "resize": true 
                },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } }, "push": { "particles_nb": 3 } }
            },
            "retina_detect": true
        });
    }
});

/* ==============================================================
   4. SCROLL REVEAL (Safe for Mobile)
   ============================================================== */
function revealOnScroll() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 50;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', revealOnScroll);
setTimeout(revealOnScroll, 1600);

/* ==============================================================
   5. GLASSMORPHISM NAVBAR
   ============================================================== */
window.addEventListener("scroll", function() {
    var header = document.getElementById("navbar");
    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

/* ==============================================================
   6. TYPEWRITER EFFECT
   ============================================================== */
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate; this.el = el; this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000; this.txt = '';
    this.tick(); this.isDeleting = false;
};
TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) { this.txt = fullTxt.substring(0, this.txt.length - 1); } 
    else { this.txt = fullTxt.substring(0, this.txt.length + 1); }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this; var delta = 100 - Math.random() * 50;

    if (this.isDeleting) { delta /= 2; }
    if (!this.isDeleting && this.txt === fullTxt) { delta = this.period; this.isDeleting = true; } 
    else if (this.isDeleting && this.txt === '') { this.isDeleting = false; this.loopNum++; delta = 500; }

    setTimeout(function() { that.tick(); }, delta);
};

setTimeout(function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) { new TxtType(elements[i], JSON.parse(toRotate), period); }
    }
}, 1500);

/* ==============================================================
   7. INTERACTIVE FAQ ACCORDION
   ============================================================== */
const faqBtns = document.querySelectorAll('.faq-btn');
faqBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        this.parentElement.classList.toggle('active');
        const content = this.nextElementSibling;
        const icon = this.querySelector('.faq-icon');
        
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.textContent = '+';
        } else {
            document.querySelectorAll('.faq-content').forEach(c => c.style.maxHeight = null);
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            document.querySelectorAll('.faq-icon').forEach(ic => ic.textContent = '+');
            
            this.parentElement.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
            icon.textContent = '-';
        }
    });
});

/* ==============================================================
   8. SMART BACK TO TOP BUTTON
   ============================================================== */
const progressPath = document.querySelector('.progress-wrap path');
if (progressPath) {
    const pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

    const updateProgress = function () {
        const scroll = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    window.addEventListener('scroll', updateProgress);

    const progressWrap = document.querySelector('.progress-wrap');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 150) { progressWrap.classList.add('active-progress'); } 
        else { progressWrap.classList.remove('active-progress'); }
    });

    progressWrap.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return false;
    });
}