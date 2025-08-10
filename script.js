// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Hero animation on page load
    const heroContent = document.getElementById('hero-content');
    setTimeout(() => {
        heroContent.classList.remove('opacity-0', 'translate-y-10');
        heroContent.classList.add('opacity-100', 'translate-y-0');
    }, 300);

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Dark Mode Toggle Functionality
    const html = document.documentElement;
    const toggleBtn = document.getElementById('darkModeToggle');
    const toggleBtnMobile = document.getElementById('darkModeToggleMobile');
    const iconMobile = document.getElementById('darkModeIconMobile');

    // Unified toggle function
    function toggleDarkMode() {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');

    renderScrumChart();

    function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    renderScrumChart(); // re-render chart with updated colors
    }


    // Update icons
    if (toggleBtn) toggleBtn.textContent = isDark ? '☀️' : '🌙';
    if (iconMobile) {
        iconMobile.classList.toggle('fa-moon', !isDark);
        iconMobile.classList.toggle('fa-sun', isDark);
    }

    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Add listeners
    if (toggleBtn) toggleBtn.addEventListener('click', toggleDarkMode);
    if (toggleBtnMobile) toggleBtnMobile.addEventListener('click', toggleDarkMode);

    // Function to toggle dark mode
    function toggleDarkMode() {
        html.classList.toggle('dark');
        
        const isDark = html.classList.contains('dark');
        updateIcons(isDark);
        
        // Save preference to localStorage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Add a subtle animation effect
        document.body.style.transition = 'background-color 0.3s ease';
    }

    // Add event listeners to both toggle buttons
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleDarkMode);
    }
    
    if (toggleBtnMobile) {
        toggleBtnMobile.addEventListener('click', toggleDarkMode);
    }

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
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Add scroll effect to navigation
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        const currentScrollY = window.scrollY;
        
        if (nav) {
            if (currentScrollY > 100) {
                nav.classList.add('shadow-lg');
            } else {
                nav.classList.remove('shadow-lg');
            }
            
            // Optional: Hide/show nav on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 500) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation to feature cards
                const featureCards = entry.target.querySelectorAll('.card-hover');
                featureCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Add click handlers to CTA buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Skip if it's the dark mode toggle button
            if (this.id === 'darkModeToggle' || this.id === 'darkModeToggleMobile' || this.id === 'mobile-menu-btn') {
                return;
            }
            
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('Request Support') || buttonText.includes('Connect')) {
                showNotification('Thank you for your interest! This would normally open a contact form or redirect to a contact page.', 'success');
            } else if (buttonText.includes('Volunteer')) {
                showNotification('Thank you for wanting to volunteer! This would normally open a volunteer registration form.', 'info');
            } else if (buttonText.includes('Learn More')) {
                const processSection = document.getElementById('process');
                if (processSection) {
                    processSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Custom notification system
    function showNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.custom-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `custom-notification fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'info' ? 'bg-blue-500 text-white' : 
            'bg-gray-500 text-white'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <p class="text-sm">${message}</p>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateX(full)';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Toggle dark mode with Ctrl/Cmd + D
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            toggleDarkMode();
        }
        
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                html.classList.add('dark');
                updateIcons(true);
            } else {
                html.classList.remove('dark');
                updateIcons(false);
            }
        }
    });

    // Add loading animation to buttons
    function addLoadingState(button) {
        const originalText = button.innerHTML;
        button.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
        `;
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }

    // Add smooth reveal animation for stats
    const statsSection = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-4');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.gradient-text');
                    statNumbers.forEach((stat, index) => {
                        setTimeout(() => {
                            stat.style.opacity = '1';
                            stat.style.transform = 'scale(1)';
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
        
        // Initially hide stats for animation
        const statNumbers = statsSection.querySelectorAll('.gradient-text');
        statNumbers.forEach(stat => {
            stat.style.opacity = '0';
            stat.style.transform = 'scale(0.8)';
            stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }

    console.log('ScrumForce website loaded successfully! 🚀');
});

tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                darkbg: '#0f172a', // dark navy background
                darktext: '#e2e8f0', // light text
                border: "hsl(214.3 31.8% 91.4%)",
                input: "hsl(214.3 31.8% 91.4%)",
                ring: "hsl(222.2 84% 4.9%)",
                background: "hsl(0 0% 100%)",
                foreground: "hsl(222.2 84% 4.9%)",
                primary: {
                    DEFAULT: "hsl(222.2 47.4% 11.2%)",
                    foreground: "hsl(210 40% 98%)",
                },
                secondary: {
                    DEFAULT: "hsl(210 40% 96.1%)",
                    foreground: "hsl(222.2 47.4% 11.2%)",
                },
                destructive: {
                    DEFAULT: "hsl(0 84.2% 60.2%)",
                    foreground: "hsl(210 40% 98%)",
                },
                muted: {
                    DEFAULT: "hsl(210 40% 96.1%)",
                    foreground: "hsl(215.4 16.3% 46.9%)",
                },
                accent: {
                    DEFAULT: "hsl(210 40% 96.1%)",
                    foreground: "hsl(222.2 47.4% 11.2%)",
                },
                popover: {
                    DEFAULT: "hsl(0 0% 100%)",
                    foreground: "hsl(222.2 84% 4.9%)",
                },
                card: {
                    DEFAULT: "hsl(0 0% 100%)",
                    foreground: "hsl(222.2 84% 4.9%)",
                },
            },
            borderRadius: {
                lg: "0.5rem",
                md: "calc(0.5rem - 2px)",
                sm: "calc(0.5rem - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                slideUp: {
                    from: {
                        opacity: "0",
                        transform: "translateY(30px)",
                    },
                    to: {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                float: "float 6s ease-in-out infinite",
                "slide-up": "slideUp 0.6s ease-out",
            },
        }
    }
}

  document.querySelectorAll('.toggle-list').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const ul = toggle.parentElement.nextElementSibling; // ul is next sibling after paragraph
      if (!ul) return;
  
      if (ul.classList.contains('hidden')) {
        ul.classList.remove('hidden');
        toggle.textContent = 'show less..';
      } else {
        ul.classList.add('hidden');
        toggle.textContent = 'show more..';
      }
    });
  });

        const ctx = document.getElementById('scrumChart').getContext('2d');
        const scrumChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Planning', 'Design', 'Development', 'Testing', 'Deployment'],
            datasets: [
              {
                label: 'Scrum Master Involvement',
                data: [100, 80,60, 40, 20],
                borderColor: 'rgba(59, 130, 246, 1)',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                tension: 0.4,
                pointRadius:4,
                fill: true,
                pointBackgroundColor: '#6366F1'
              },
              {
                label: 'Team Involvement',
                data: [20, 40, 60, 80, 100],
                borderColor: 'rgba(20, 184, 166, 1)', // teal-500
                backgroundColor: 'rgba(20, 184, 166, 0.2)',
                tension: 0.4,
                fill: true,
                pointRadius:4,
                pointBackgroundColor: '#10B981'
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: getComputedStyle(document.documentElement).getPropertyValue('color') || '#000',
                  font: {
                    size: 12
                  }
                }
              }
            },
            scales: {
              x: {
                ticks: {
                  color: getComputedStyle(document.documentElement).getPropertyValue('color') || '#000'
                },
                grid: {
                  color: 'rgba(100, 100, 100, 0.1)'
                }
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: getComputedStyle(document.documentElement).getPropertyValue('color') || '#000'
                },
                grid: {
                  color: 'rgba(100, 100, 100, 0.1)'
                }
              }
            }
          }
        });
      
        // Optional: Update chart colors on dark mode toggle
        const updateChartColors = () => {
        const isDark = document.documentElement.classList.contains('dark');
        const textColor = isDark ? '#fff' : '#000';

        scrumChart.options.plugins.legend.labels.color = textColor;
        scrumChart.options.scales.x.ticks.color = textColor;
        scrumChart.options.scales.y.ticks.color = textColor;
        scrumChart.update();
    };
        // Listen for dark mode toggle
        const observer = new MutationObserver(updateChartColors);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  