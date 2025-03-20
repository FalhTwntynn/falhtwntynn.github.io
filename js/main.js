l-links a');
    socialLinks.forEach((link, index) => {
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, index * 200); // Delay 200ms untuk setiap ikon
    });

    // Tampilkan konten lainnya
    const elements = document.querySelectorAll('.about-content, .about-image, .about-text, .about-info, .info-item, .contact-form, .section-title');
    elements.forEach(element => {
        if (element) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.style.visibility = 'visible';
        }
    });
});

// Custom cursor
const cursor = document.createElement('div');
const cursorFollower = document.createElement('div');
cursor.className = 'cursor';
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursor);
document.body.appendChild(cursorFollower);

let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    posX += (mouseX - posX) * 0.1;
    posY += (mouseY - posY) * 0.1;
    
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    cursorFollower.style.transform = `translate(${posX}px, ${posY}px)`;
    
    requestAnimationFrame(updateCursor);
}

updateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, input, textarea, .skill-card, .info-item');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// Hide default cursor
document.body.style.cursor = 'none';

// Handle cursor visibility
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
});

// Efek parallax sederhana
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    }
});

// Animasi typing untuk tagline
const tagline = document.querySelector('.tagline');
if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Mulai animasi typing saat halaman dimuat
    window.addEventListener('load', typeWriter);
}

// Intersection Observer untuk animasi
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Khusus untuk social links, tambahkan class in-view ke semua link
            if (entry.target.classList.contains('social-links')) {
                const links = entry.target.querySelectorAll('a');
                links.forEach((link, index) => {
                    setTimeout(() => {
                        link.classList.add('in-view');
                    }, 200 * index);
                });
            }
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '50px'
});

// Fungsi inisialisasi animasi scroll
function initScrollAnimation() {
    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });
    
    // Observe elements dengan class fade-element
    document.querySelectorAll('.fade-element').forEach(el => {
        observer.observe(el);
    });
    
    // Observe social links
    document.querySelectorAll('.social-links').forEach(el => {
        observer.observe(el);
    });
    
    // Observe skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe experience items
    document.querySelectorAll('.experience-item').forEach(item => {
        observer.observe(item);
    });
    
    // Observe about section elements
    document.querySelectorAll('.about-text, .about-info, .info-item, .about-image').forEach(el => {
        observer.observe(el);
    });
    
    // Observe contact form elements
    document.querySelectorAll('.contact-form, .form-group').forEach(el => {
        observer.observe(el);
    });
}

// Scroll to Top Button
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Handle contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        
        try {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            submitBtn.disabled = true;
            
            const response = await fetch('https://formspree.io/f/mvgkgwrq', {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showNotification('Pesan berhasil terkirim!', 'success');
                this.reset();
            } else {
                showNotification('Gagal mengirim pesan. Silakan coba lagi.', 'error');
            }
        } catch (error) {
            showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message, type = 'success') {
    const notification = document.querySelector('.notification');
    const messageEl = notification.querySelector('.notification-message');
    const icon = notification.querySelector('i');
    
    // Set pesan dan icon
    messageEl.textContent = message;
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    // Tampilkan notifikasi
    notification.classList.add('show');
    
    // Sembunyikan notifikasi setelah 3 detik
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Observe contact form elements
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            if (entry.target.classList.contains('contact-form')) {
                const formGroups = entry.target.querySelectorAll('.form-group');
                const submitBtn = entry.target.querySelector('.submit-btn');
                
                formGroups.forEach((group, index) => {
                    setTimeout(() => {
                        group.classList.add('in-view');
                    }, 100 * index);
                });
                
                if (submitBtn) {
                    setTimeout(() => {
                        submitBtn.classList.add('in-view');
                    }, 100 * (formGroups.length + 1));
                }
            }
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '50px'
});

// Observe contact elements
document.querySelectorAll('.contact-form, .form-group, .submit-btn').forEach(el => {
    contactObserver.observe(el);
});

// Inisialisasi animasi scroll saat dokumen siap
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimation();
});

// Mouse move effect untuk cards
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.skill-card, .experience-item');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Background hover effect
document.querySelectorAll('section').forEach(section => {
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        section.style.setProperty('--mouse-x', `${x}%`);
        section.style.setProperty('--mouse-y', `${y}%`);
    });
}); 
