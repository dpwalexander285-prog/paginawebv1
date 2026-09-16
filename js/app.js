// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando carga de componentes...');
    loadComponentsSequentially();
});

// ===== CARGAR COMPONENTES =====
async function loadComponentsSequentially() {
    const components = [
        'navbar',
        'slider',
        'banner',
        'card-carrera',
        'estadisticas',
        'nosotros',
        'servicios',
        'eventos',
        'galeria',
        'noticias',
        'contacto',
        'footer'
    ];

    for (const component of components) {
        try {
            await loadComponent(component);
            console.log(`✅ ${component}.html cargado`);
        } catch (error) {
            console.error(`❌ Error cargando ${component}:`, error);
        }
    }

    // Inicializar todo después de cargar
    setTimeout(() => {
        lucide.createIcons();
        initScrollAnimations();
        initCounters();
        initNavbarScroll();
        initSlider();
        initVideoModal();
        console.log('✅ Sitio web cargado correctamente');
    }, 500);
}

function loadComponent(name) {
    return fetch(`components/${name}.html`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
        })
        .then(html => {
            const container = document.getElementById(`${name}-container`);
            if (container) {
                container.innerHTML = html;
            }
        });
}

// ===== ANIMACIONES AL SCROLL =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== CONTADORES ANIMADOS =====
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (target > 100 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ===== NAVBAR SCROLL =====
function initNavbarScroll() {
    const navbar = document.querySelector('header');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
}

// ===== SLIDER CON ANIMACIÓN DE FORMAS =====
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const sliderContainer = document.querySelector('.slider-container');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // Animar formas geométricas
        if (sliderContainer) {
            sliderContainer.classList.remove('active');
            void sliderContainer.offsetWidth; // Trigger reflow
            sliderContainer.classList.add('active');
        }
        
        // Cambiar slide
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
        });
        
        // Actualizar dots
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
                dot.classList.remove('bg-white/50');
            } else {
                dot.classList.remove('active');
                dot.classList.add('bg-white/50');
            }
        });
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
   
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });
    
   
    let interval = setInterval(nextSlide, 5000);
    
    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
    }
    
    // Iniciar
    showSlide(0);
}

// ===== MODAL DE VIDEO =====
function initVideoModal() {
    const playBtn = document.getElementById('play-video-btn');
    const modal = document.getElementById('video-modal');
    const closeBtn = document.getElementById('close-video');
    const video = document.getElementById('institutional-video');
    
    if (!playBtn || !modal) return;
    
    // Abrir modal
    playBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    });
    
    // Cerrar modal
    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    // Cerrar al hacer clic fuera del video
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});