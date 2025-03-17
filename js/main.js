// Smooth scrolling untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Tampilkan semua konten saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
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

// Fungsi untuk mengecek apakah elemen visible dalam viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Fungsi untuk menambahkan class fade-in ke elemen yang visible
function handleScrollAnimation() {
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    const aboutInfo = document.querySelector('.about-info');
    const infoItems = document.querySelectorAll('.info-item');

    if (isElementInViewport(aboutImage)) {
        aboutImage.classList.add('fade-in');
    }

    if (isElementInViewport(aboutText)) {
        aboutText.classList.add('fade-in');
    }

    if (isElementInViewport(aboutInfo)) {
        aboutInfo.classList.add('fade-in');
        infoItems.forEach(item => {
            setTimeout(() => {
                item.classList.add('fade-in');
            }, 100);
        });
    }
}

// Event listener untuk scroll
window.addEventListener('scroll', handleScrollAnimation);

// Trigger animation pada load
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimation();
});

// Tambahkan class visible ke semua elemen yang memiliki class fade-in saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
            element.classList.add('visible');
    });
});

// Efek hover untuk info items
document.querySelectorAll('.info-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(5px)';
        item.style.background = 'rgba(50, 50, 50, 0.9)';
        item.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.2)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'none';
        item.style.background = 'rgba(40, 40, 40, 0.8)';
        item.style.boxShadow = 'none';
    });
});

// Intersection Observer untuk animasi scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const element = entry.target;
        
        // Hitung opacity berdasarkan intersection ratio
        const opacity = Math.min(entry.intersectionRatio * 1.5, 1);
        const translateY = 30 * (1 - entry.intersectionRatio);
        
        // Terapkan efek fade dan transform
        element.style.opacity = opacity;
        element.style.transform = `translateY(${translateY}px)`;
        
        // Tambahkan/hapus kelas untuk efek hover dan garis
        if (entry.intersectionRatio > 0) {
            element.classList.add('in-view');
            
            // Jika elemen adalah section, form-group, atau experience-item
            // tambahkan kelas in-view ke pseudo-element ::after
            if (element.tagName.toLowerCase() === 'section' ||
                element.classList.contains('form-group') ||
                element.classList.contains('experience-item') ||
                element.classList.contains('hero')) {
                element.classList.add('in-view');
            }
        } else {
            element.classList.remove('in-view');
        }
    });
}, observerOptions);

// Fungsi untuk menginisialisasi animasi scroll
function initScrollAnimation() {
    const elements = document.querySelectorAll(`
        .section-title,
        .about-image,
        .about-text,
        .about-info,
        .info-item,
        .skills-grid,
        .skill-card,
        .experience-item,
        .contact-form,
        .form-group,
        section,
        .hero
    `);

    elements.forEach(element => {
        // Set initial state
        element.style.opacity = 0;
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Observe element
        observer.observe(element);
    });
}

// Inisialisasi animasi setelah DOM dimuat
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimation();
});

// Handle Contact Form Submission
const contactForm = document.getElementById('contact-form');
const notification = document.getElementById('notification');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    
    try {
        // Kirim data ke Formspree
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Reset form
            contactForm.reset();
            
            // Tampilkan notifikasi sukses
            notification.classList.add('show');
            
            // Sembunyikan notifikasi setelah 3 detik
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        } else {
            // Jika ada error, ubah pesan notifikasi
            const notifMessage = notification.querySelector('.notification-message');
            const notifIcon = notification.querySelector('i');
            
            notifMessage.textContent = 'Gagal mengirim pesan. Silakan coba lagi.';
            notifIcon.className = 'fas fa-exclamation-circle';
            notifIcon.style.color = '#ff4444';
            
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
                // Reset pesan notifikasi ke default
                notifMessage.textContent = 'Pesan berhasil terkirim!';
                notifIcon.className = 'fas fa-check-circle';
                notifIcon.style.color = 'var(--neon-blue)';
            }, 3000);
        }
    } catch (error) {
        console.error('Error:', error);
        // Tampilkan notifikasi error
        const notifMessage = notification.querySelector('.notification-message');
        const notifIcon = notification.querySelector('i');
        
        notifMessage.textContent = 'Terjadi kesalahan. Silakan coba lagi.';
        notifIcon.className = 'fas fa-exclamation-circle';
        notifIcon.style.color = '#ff4444';
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            // Reset pesan notifikasi ke default
            notifMessage.textContent = 'Pesan berhasil terkirim!';
            notifIcon.className = 'fas fa-check-circle';
            notifIcon.style.color = 'var(--neon-blue)';
        }, 3000);
    }
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