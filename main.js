// Initialize EmailJS
(function () {
    // IMPORTANT: Replace with your actual Public Key from EmailJS dashboard
    // If you don't have one, the form will show an error but won't crash.
    // For now using a placeholder or the one found in previous script if valid.
    emailjs.init("user_placeholder_key");
})();

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update active nav link
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + pageId) {
            link.classList.add('active');
        }
    });

    // Close mobile menu
    document.getElementById('nav-menu').classList.remove('show');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Tab Switching
function showTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Show selected tab content
    document.getElementById(tabId).classList.add('active');

    // Update active tab button
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Find the button that triggered this and make it active
    // We use event.target, but we need to be careful if called programmatically
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }
}

// Mobile Menu Toggle
function toggleMenu() {
    document.getElementById('nav-menu').classList.toggle('show');
}

// Handle Hash Navigation
function handleHashChange() {
    const page = location.hash.slice(1) || 'home';
    if (document.getElementById(page)) {
        showPage(page);
    }
}

window.addEventListener('hashchange', handleHashChange);
window.addEventListener('load', () => {
    handleHashChange();

    // Set current year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        const formMessage = document.getElementById('formMessage');

        // Loading state
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
        formMessage.innerHTML = '';

        // Get form values
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };

        // Use the Service ID and Template ID found in the old script.js
        // Service ID: service_p0jmn58
        // Template ID: template_elzug1n
        emailjs.send("service_p0jmn58", "template_elzug1n", templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                formMessage.innerHTML = '<div class="success">Message sent successfully! We will contact you soon.</div>';
                contactForm.reset();
            }, function (error) {
                console.log('FAILED...', error);
                // Fallback to mailto if EmailJS fails (e.g. invalid keys)
                const subject = encodeURIComponent('Quote Request - ' + templateParams.service);
                const body = encodeURIComponent(`Name: ${templateParams.from_name}\nEmail: ${templateParams.from_email}\nPhone: ${templateParams.phone}\nService: ${templateParams.service}\n\nDetails:\n${templateParams.message}`);

                formMessage.innerHTML = '<div class="error">Automated sending failed. Opening your email client...</div>';

                setTimeout(() => {
                    window.location.href = `mailto:info@spine-eng.sl?subject=${subject}&body=${body}`;
                }, 1500);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            });
    });
}

// Recruitment Form Handling
const recruitmentForm = document.getElementById('recruitmentForm');
if (recruitmentForm) {
    recruitmentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        const formMessage = document.getElementById('appFormMessage');

        // Loading state
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting...';
        formMessage.innerHTML = '';

        // Get form values
        const appParams = {
            name: document.getElementById('appName').value,
            email: document.getElementById('appEmail').value,
            phone: document.getElementById('appPhone').value,
            position: document.getElementById('appPosition').value,
            link: document.getElementById('appLink').value,
            cover: document.getElementById('appCover').value
        };

        // Simulate sending (or use EmailJS if you have a template for this)
        // For now, we'll just simulate a success and fallback to mailto
        console.log('Application submitted:', appParams);

        // Simulate network delay
        setTimeout(() => {
            // We can try to use the same EmailJS service if we had a template, 
            // but for now let's just use mailto as the primary method for this demo 
            // or just show success if we assume backend handling.

            // Let's use mailto for robustness since we don't have a specific template ID for recruitment
            const subject = encodeURIComponent('Job Application - ' + appParams.position);
            const body = encodeURIComponent(`Name: ${appParams.name}\nEmail: ${appParams.email}\nPhone: ${appParams.phone}\nPosition: ${appParams.position}\nResume Link: ${appParams.link}\n\nCover Letter:\n${appParams.cover}`);

            // Show success message
            formMessage.innerHTML = '<div class="success">Application prepared! Opening email client to send...</div>';

            setTimeout(() => {
                window.location.href = `mailto:careers@spine-eng.sl?subject=${subject}&body=${body}`;
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
                recruitmentForm.reset();
            }, 1500);

        }, 1000);
    });
}
