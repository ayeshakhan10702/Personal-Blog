  // Scroll indicator
        function updateScrollIndicator() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.querySelector(".scrollingindicator").style.width = scrolled + "%";
        }

        // Header background on scroll
        function updateHeader() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.1)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = 'none';
            }
        }

        // Filter posts by category
        function filterPosts(category) {
            const posts = document.querySelectorAll('.post-card');
            
            posts.forEach(post => {
                if (category === 'all' || post.dataset.category === category) {
                    post.style.display = 'block';
                    post.style.animation = 'slideUp 0.5s ease forwards';
                } else {
                    post.style.display = 'none';
                }
            });

            // Update active category
            const categories = document.querySelectorAll('.category-card');
            categories.forEach(cat => cat.style.transform = 'translateY(0)');
            event.target.closest('.category-card').style.transform = 'translateY(-5px)';
        }

        // Open post (simulate navigation)
        function openPost(postId) {
            alert(`Opening post: ${postId}\n\nThis would normally navigate to the full article page.`);
        }

        // Toggle search
        function toggleSearch() {
            const searchQuery = prompt("What would you like to search for?");
            if (searchQuery) {
                alert(`Searching for: "${searchQuery}"\n\nThis would normally show search results.`);
            }
        }

        // Smooth scrolling for navigation links
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

        // Add scroll event listeners
        window.addEventListener('scroll', () => {
            updateScrollIndicator();
            updateHeader();
        });

        // Add intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.addEventListener('DOMContentLoaded', () => {
            const animateElements = document.querySelectorAll('.post-card, .category-card');
            animateElements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = `all 0.6s ease ${index * 0.1}s`;
                observer.observe(el);
            });
        });

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });