// Add this to your existing main.js file
document.addEventListener('DOMContentLoaded', function() {
    // ... Your existing code ...

    // Nav icon animations
    const navIcons = document.querySelectorAll('.nav-icon');
    if (navIcons.length > 0) {
        navIcons.forEach(icon => {
            // Add tooltip functionality
            icon.addEventListener('mouseenter', function() {
                const title = this.getAttribute('title');
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = title;
                document.body.appendChild(tooltip);
                
                const iconRect = this.getBoundingClientRect();
                tooltip.style.position = 'absolute';
                tooltip.style.top = (iconRect.bottom + 10) + 'px';
                tooltip.style.left = (iconRect.left + iconRect.width/2 - tooltip.offsetWidth/2) + 'px';
                tooltip.style.backgroundColor = 'white';
                tooltip.style.color = '#333';
                tooltip.style.padding = '5px 10px';
                tooltip.style.borderRadius = '4px';
                tooltip.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
                tooltip.style.zIndex = '1000';
                tooltip.style.opacity = '0';
                tooltip.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    tooltip.style.opacity = '1';
                }, 10);
                
                this.tooltip = tooltip;
            });
            
            icon.addEventListener('mouseleave', function() {
                if (this.tooltip) {
                    this.tooltip.style.opacity = '0';
                    setTimeout(() => {
                        if (this.tooltip && this.tooltip.parentNode) {
                            this.tooltip.parentNode.removeChild(this.tooltip);
                            this.tooltip = null;
                        }
                    }, 300);
                }
            });
        });
    }
});

// main.js - Add this file to your project
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add a hover effect to cards
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
                this.style.transition = 'all 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                this.style.transition = 'all 0.3s ease';
            });
        });
    }

    // Social media icon animations
    const socialIcons = document.querySelectorAll('.social-icon');
    if (socialIcons.length > 0) {
        socialIcons.forEach(icon => {
            icon.addEventListener('click', function(e) {
                // Prevent default only if the href is # (placeholder)
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                    this.classList.add('pulse');
                    setTimeout(() => {
                        this.classList.remove('pulse');
                    }, 1000);
                    
                    // You could add a message that would normally link to social profiles
                    alert('Social media link clicked - replace with actual URL');
                }
            });
        });
    }

    // Add a simple fade-in animation for page content
    const container = document.querySelector('.container');
    if (container) {
        container.style.opacity = '0';
        container.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            container.style.opacity = '1';
        }, 100);
    }

    // Simple form validation for contact form (if you add one later)
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let valid = true;
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (valid) {
                alert('Form submitted successfully!');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
});

// Add this keyframe animation to your CSS
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

.pulse {
    animation: pulse 0.5s ease-in-out;
}

.active {
    font-weight: bold;
    text-decoration: underline;
}

.error {
    border: 2px solid red !important;
    background-color: rgba(255, 0, 0, 0.05) !important;
}
</style>
`);