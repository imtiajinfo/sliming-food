// Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth Scroll for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                // Close mobile menu
                const navCollapse = document.querySelector('.navbar-collapse');
                if (navCollapse.classList.contains('show')) {
                    new bootstrap.Collapse(navCollapse).hide();
                }
            });
        });

        // Intersection Observer for Animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-up, .slide-left, .slide-right').forEach(el => {
            observer.observe(el);
        });

        // Form Submission
        document.getElementById('orderForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('customerName').value.trim();
            const phone = document.getElementById('customerPhone').value.trim();
            const address = document.getElementById('customerAddress').value.trim();
            
            // Validate phone number (Bangladesh)
            const phoneRegex = /^01[3-9]\d{8}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                showToast('error', 'ত্রুটি!', 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন');
                return;
            }
            
            // Show success toast
            showToast('success', 'অর্ডার সফল হয়েছে! ✓', 'শীঘ্রই আমাদের টিম আপনার সাথে যোগাযোগ করবে।');
            
            // Reset form
            this.reset();
        });

        // Toast Function
        function showToast(type, title, message) {
            const toast = document.getElementById('toast');
            const toastTitle = document.getElementById('toastTitle');
            const toastMessage = document.getElementById('toastMessage');
            const toastIcon = toast.querySelector('.toast-icon i');
            
            toast.className = 'custom-toast ' + type;
            toastTitle.textContent = title;
            toastMessage.textContent = message;
            toastIcon.className = type === 'success' ? 'bi bi-check2' : 'bi bi-exclamation-triangle';
            
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        }

        // Add stagger animation delay to cards
        document.querySelectorAll('.benefit-card, .testimonial-card, .pricing-card').forEach((card, index) => {
            card.style.transitionDelay = (index % 3) * 0.1 + 's';
        });