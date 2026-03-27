// domains.js - Domain & Hosting Application Form Handler

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('domainApplicationForm');
    const fileInputs = document.querySelectorAll('input[type="file"]');
    const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

    // File size validation
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (file.size > maxFileSize) {
                    alert(`File "${file.name}" is too large. Maximum size is 5MB.`);
                    e.target.value = ''; // Clear the input
                }
                // Check file type
                if (file.type !== 'application/pdf') {
                    alert('Please upload PDF files only.');
                    e.target.value = '';
                }
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#dc2626';
            } else {
                field.style.borderColor = '#e4e4e7';
            }
        });

        // Check file uploads
        fileInputs.forEach(input => {
            if (!input.files[0]) {
                isValid = false;
                input.style.borderColor = '#dc2626';
            } else {
                input.style.borderColor = '#e4e4e7';
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields and upload all documents.');
            return;
        }

        // Check data consent
        const consent = document.getElementById('dataConsent');
        if (!consent.checked) {
            alert('Please agree to the data protection notice.');
            return;
        }

        // Simulate form submission
        alert('Application submitted successfully! You will receive a confirmation email shortly.');

        // Reset form
        form.reset();
    });

    // Real-time validation feedback
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc2626';
            } else {
                this.style.borderColor = '#e4e4e7';
            }
        });

        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#e4e4e7';
            }
        });
    });

    // Theme toggle (if exists)
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.documentElement.setAttribute('data-theme',
                document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
            );
            localStorage.setItem('theme',
                document.documentElement.getAttribute('data-theme')
            );
        });
    }

    // Menu toggle for mobile
    const menuToggle = document.getElementById('menuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const closeDrawer = document.getElementById('closeDrawer');

    if (menuToggle && mobileDrawer && drawerOverlay) {
        menuToggle.addEventListener('click', function() {
            mobileDrawer.classList.add('open');
            drawerOverlay.classList.add('show');
        });

        closeDrawer.addEventListener('click', function() {
            mobileDrawer.classList.remove('open');
            drawerOverlay.classList.remove('show');
        });

        drawerOverlay.addEventListener('click', function() {
            mobileDrawer.classList.remove('open');
            drawerOverlay.classList.remove('show');
        });
    }

    // Mega menu functionality
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const isActive = item.classList.contains('active-dropdown');

                // Close all mega menus
                navItems.forEach(otherItem => {
                    otherItem.classList.remove('active-dropdown');
                });

                // Toggle current menu
                if (!isActive) {
                    item.classList.add('active-dropdown');
                }
            });
        }
    });

    // Close mega menus when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item')) {
            navItems.forEach(item => {
                item.classList.remove('active-dropdown');
            });
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Update year in footer
    const yearCurrent = document.getElementById('year-current');
    if (yearCurrent) {
        yearCurrent.textContent = new Date().getFullYear();
    }
});