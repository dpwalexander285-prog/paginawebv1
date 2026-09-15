// ===== INICIALIZAR ICONOS DE LUCIDE =====
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Inicializar animaciones de scroll
    initScrollAnimations();
    
    // Inicializar contadores animados
    initCounters();
    
    // Inicializar navbar scroll effect
    initNavbarScroll();
});

// ===== MENÚ MÓVIL =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// ===== ANIMACIONES AL HACER SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .scale-in').forEach(el => {
        observer.observe(el);
    });
}

// ===== CONTADORES ANIMADOS =====
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
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

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-xl');
                navbar.classList.add('bg-white/95');
                navbar.classList.add('backdrop-blur-md');
            } else {
                navbar.classList.remove('shadow-xl');
                navbar.classList.remove('bg-white/95');
                navbar.classList.remove('backdrop-blur-md');
            }
        });
    }
}

// ===== FAQ ACORDEÓN =====
function toggleFaq(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('i');
    const isOpen = !answer.classList.contains('hidden');
    
    // Cerrar todos los demás
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
    document.querySelectorAll('.faq-item button i').forEach(i => {
        i.style.transform = 'rotate(0deg)';
    });
    
    // Abrir el seleccionado si estaba cerrado
    if (!isOpen) {
        answer.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    }
}

// ===== FORMULARIO MULTI-PASO =====
let currentStep = 1;

function nextStep(step) {
    const currentForm = document.getElementById(`step${currentStep}`);
    const inputs = currentForm.querySelectorAll('input[required], select[required], textarea[required]');
    let valid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            valid = false;
            input.classList.add('border-red-500');
            setTimeout(() => input.classList.remove('border-red-500'), 2000);
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    if (!valid) {
        alert('Por favor, completa todos los campos obligatorios');
        return;
    }
    
    document.getElementById(`step${currentStep}`).classList.add('hidden');
    document.getElementById(`step${step}`).classList.remove('hidden');
    currentStep = step;
    
    // Smooth scroll al formulario
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
}

function prevStep(step) {
    document.getElementById(`step${currentStep}`).classList.add('hidden');
    document.getElementById(`step${step}`).classList.remove('hidden');
    currentStep = step;
}

function resetForm() {
    document.getElementById('contact-form').reset();
    document.getElementById('step3').classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');
    currentStep = 1;
}

// Manejar envío del formulario
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    nextStep(3);
});

// ===== BUSCADOR INTELIGENTE =====
const searchData = [
    { title: 'Requisitos de Admisión', url: 'pages/admision.html', category: 'Admisión', icon: 'file-text' },
    { title: 'Diseño y Programación Web', url: '#carreras', category: 'Carreras', icon: 'code' },
    { title: 'Enfermería Técnica', url: '#carreras', category: 'Carreras', icon: 'heart-pulse' },
    { title: 'Mecatrónica Automotriz', url: '#carreras', category: 'Carreras', icon: 'car' },
    { title: 'Industrias Alimentarias', url: '#carreras', category: 'Carreras', icon: 'wheat' },
    { title: 'Producción Agropecuaria', url: '#carreras', category: 'Carreras', icon: 'sprout' },
    { title: 'Horarios de Atención', url: '#contacto', category: 'Contacto', icon: 'clock' },
    { title: 'Trámite de Certificados', url: '#', category: 'Trámites', icon: 'file-check' },
    { title: 'Pensum de Estudios', url: '#carreras', category: 'Académico', icon: 'book-open' },
    { title: 'Biblioteca', url: '#servicios', category: 'Servicios', icon: 'library' },
    { title: 'Laboratorios', url: '#servicios', category: 'Servicios', icon: 'flask-conical' },
    { title: 'Misión y Visión', url: '#nosotros', category: 'Instituto', icon: 'target' },
    { title: 'Contáctanos', url: '#contacto', category: 'Contacto', icon: 'mail' },
    { title: 'Becas y Beneficios', url: 'pages/admision.html', category: 'Admisión', icon: 'award' },
    { title: 'Calendario Académico', url: '#', category: 'Académico', icon: 'calendar' },
];

const searchInput = document.getElementById('site-search');
const searchResults = document.getElementById('search-results');

if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.classList.add('hidden');
            return;
        }
        
        const filtered = searchData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query)
        );
        
        if (filtered.length > 0) {
            searchResults.innerHTML = filtered.map(item => `
                <a href="${item.url}" class="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 border-b last:border-b-0 transition">
                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i data-lucide="${item.icon}" class="w-4 h-4 text-blue-600"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold text-gray-800 text-sm">${item.title}</div>
                        <div class="text-xs text-blue-600">${item.category}</div>
                    </div>
                    <i data-lucide="arrow-right" class="w-4 h-4 text-gray-400"></i>
                </a>
            `).join('');
            searchResults.classList.remove('hidden');
            lucide.createIcons();
        } else {
            searchResults.innerHTML = `
                <div class="px-4 py-6 text-center text-gray-500">
                    <i data-lucide="search-x" class="w-8 h-8 mx-auto mb-2 text-gray-400"></i>
                    <p class="text-sm">No se encontraron resultados</p>
                </div>
            `;
            searchResults.classList.remove('hidden');
            lucide.createIcons();
        }
    });

    // Cerrar buscador al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#site-search') && !e.target.closest('#search-results')) {
            searchResults.classList.add('hidden');
        }
    });
}

// ===== SLIDER HERO (Opcional) =====
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slide-dot');

function goToSlide(index) {
    if (slides.length === 0) return;
    
    slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? '1' : '0';
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('bg-white', i === index);
        dot.classList.toggle('bg-white/50', i !== index);
    });
    
    currentSlide = index;
}

// Auto-play del slider (cada 5 segundos)
if (slides.length > 0) {
    setInterval(() => {
        const nextSlide = (currentSlide + 1) % slides.length;
        goToSlide(nextSlide);
    }, 5000);
}

// ===== SMOOTH SCROLL PARA LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== ANIMACIÓN DE BOTONES AL HACER HOVER =====
document.querySelectorAll('button, .hover\\:scale-105').forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    el.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

console.log('✅ IESTP Huanta - Sitio web cargado correctamente');