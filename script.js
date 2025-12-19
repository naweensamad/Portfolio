// ===== Mobile Navigation Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('active');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  };

  // Click with mouse / touch
  hamburger.addEventListener('click', toggleMenu);

  // Keyboard (Enter / Space)
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close menu when clicking a nav link
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}


 
 
 // Smooth scroll to section when clicking nav links
        document.querySelectorAll('nav a, .btn, .hero-links a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);
                    
                    if (targetSection) {
                        const navHeight = document.querySelector('nav').offsetHeight;
                        const targetPosition = targetSection.offsetTop - navHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Highlight active nav link on scroll
        function highlightNav() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('nav ul a');
            const navHeight = document.querySelector('nav').offsetHeight;
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            if (window.scrollY < 100) {
                currentSection = 'home';
            }
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + currentSection) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', highlightNav);
        window.addEventListener('load', highlightNav);

        // Add animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-card, .project-card, .timeline-item, .contact-card').forEach(el => {
            observer.observe(el);
        });


        // ===== Project filter buttons =====
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter; // "all", "cert3", "cert4", "diploma"

                // Update active state
                filterButtons.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');

                // Show / hide project cards
                projectCards.forEach((card) => {
                    const category = card.dataset.category;

                    if (filter === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }

                });
            });
        });


    // ===== Default project filter on page load =====
document.addEventListener('DOMContentLoaded', () => {
  const activeBtn = document.querySelector('.filter-btn.active');
  const defaultFilter = activeBtn ? activeBtn.dataset.filter : 'cert3';

  projectCards.forEach((card) => {
    const category = card.dataset.category;
    card.style.display = (category === defaultFilter) ? 'block' : 'none';
  });
});

