document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Navbar ---
    const header = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Counter Animation for Stats ---
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps approx
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // --- Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let currentScroll = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(a => {
                    a.classList.remove('active');
                    if(a.getAttribute('href') === '#' + sectionId) {
                        a.classList.add('active');
                    }
                });
            }
        });
    });

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other accordions
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Open clicked accordion if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // --- Roadmap Modal & Badge Logic ---
    const modal = document.getElementById('roadmapModal');
    const badge = document.getElementById('roadmapBadge');
    const closeBtn = document.querySelector('.close-modal');

    // Function to open modal
    const openModal = () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    // Function to close modal
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    // --- Masterclass Full Screen Overlay Logic ---
    const masterclassModal = document.getElementById('masterclassModal');
    const closeMasterclassBtn = document.querySelector('.close-masterclass');

    // Show masterclass landing page overlay after 3 seconds
    setTimeout(() => {
        if(masterclassModal) {
            masterclassModal.classList.add('show');
            document.body.classList.add('modal-locked');
        }
    }, 3000);

    // Close masterclass overlay
    if(closeMasterclassBtn) {
        closeMasterclassBtn.addEventListener('click', () => {
            masterclassModal.classList.remove('show');
            document.body.classList.remove('modal-locked');
        });
    }

    // Close masterclass overlay when clicking the backdrop (outside the card)
    if(masterclassModal) {
        masterclassModal.addEventListener('click', (e) => {
            if (e.target === masterclassModal) {
                masterclassModal.classList.remove('show');
                document.body.classList.remove('modal-locked');
            }
        });
    }

    // Event Listeners
    badge.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // Close modal if clicking outside the content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

});