
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // Close mobile menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Update current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const department = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;

            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            this.reset();
        });
    }

    // Appointment booking functionality
    const appointmentButtons = document.querySelectorAll('.btn-outline');
    appointmentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const doctorName = this.closest('.doctor-card').querySelector('h3').textContent;
            showNotification(`Appointment request sent for ${doctorName}. We'll contact you soon!`, 'success');
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-card input');
    const searchButton = document.querySelector('.search-card .btn');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                showNotification(`Searching for: ${query}`, 'info');
                // Here you would typically implement actual search functionality
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    // Department card interactions
const departmentCards = document.querySelectorAll('.dept');

departmentCards.forEach(card => {
  card.addEventListener('click', function () {
    const departmentName = this.querySelector('.dept-name').textContent;
    showNotification(`Redirecting to ${departmentName} services...`, 'info');
    // Optional: window.location.href = `/departments/${departmentName.toLowerCase()}`;
  });
});


    // Service card interactions
const serviceLinks = document.querySelectorAll('.service-link');

serviceLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const serviceName = this.closest('.service-card').querySelector('h3').textContent;
    showNotification(`Loading ${serviceName} information...`, 'info');
    // Optionally: loadServiceDetails(serviceName);
  });
});


    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .doctor-card, .testimonial-card, .dept');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-value');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                if (numericValue > 0) {
                    animateCounter(target, 0, numericValue, 2000);
                }
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // Floating card animation
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        let isAnimating = false;
        
        floatingCard.addEventListener('mouseenter', function() {
            if (!isAnimating) {
                isAnimating = true;
                this.style.transform = 'scale(1.05) rotate(2deg)';
                setTimeout(() => {
                    this.style.transform = 'scale(1) rotate(0deg)';
                    isAnimating = false;
                }, 300);
            }
        });
    }
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;

    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const originalText = element.textContent;
    const suffix = originalText.replace(/\d/g, '');
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Add CSS for mobile menu
// const mobileMenuCSS = `
//     @media (max-width: 768px) {
//         .nav-links {
//             position: fixed;
//             top: 100%;
//             left: 0;
//             right: 0;
//             background: var(--card);
//             flex-direction: column;
//             padding: 20px;
//             box-shadow: var(--shadow-2);
//             transform: translateY(-100%);
//             opacity: 0;
//             visibility: hidden;
//             transition: all 0.3s ease;
//         }
        
//         .nav-links.active {
//             transform: translateY(0);
//             opacity: 1;
//             visibility: visible;
//         }
        
//         .nav-links a {
//             width: 100%;
//             text-align: center;
//             padding: 12px;
//         }
        
//         .btn-chip {
//             margin-left: 0;
//             width: 100%;
//         }
//     }
// `;

// // Inject mobile menu CSS
//   const mobileBtn = document.getElementById("mobileMenuBtn");
//   const navLinks = document.getElementById("navLinks");

//   mobileBtn.addEventListener("click", () => {
//     navLinks.classList.toggle("show");
//     mobileBtn.innerHTML = navLinks.classList.contains("show")
//       ? '<i class="fas fa-times"></i>'   // change to X
//       : '<i class="fas fa-bars"></i>';   // back to burger
//   });

  // Back button inside sections
  function goBack() {
    showSection("home"); // always go home
    history.replaceState({ section: "home" }, "", "#home");
  }

  // Handle browser navigation (back/forward)
  window.onpopstate = function() {
    showSection("home", false); // always return home
    history.replaceState({ section: "home" }, "", "#home");
  };

  // Default load state
  history.replaceState({ section: "home" }, "", "#home");

