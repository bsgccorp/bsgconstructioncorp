// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('quickContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validation
            if (!validateContactForm(data)) {
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('.submit-button');
            const originalHTML = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showContactSuccess();
                this.reset();
                submitButton.innerHTML = originalHTML;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    function validateContactForm(data) {
        // Required fields validation
        const requiredFields = ['contactName', 'contactEmail', 'contactMessage'];
        
        for (let field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                showContactError(`Please fill in the ${field.replace('contact', '').toLowerCase()} field.`);
                return false;
            }
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.contactEmail)) {
            showContactError('Please enter a valid email address.');
            return false;
        }
        
        return true;
    }
    
    function showContactError(message) {
        // Remove existing error messages
        const existingError = document.querySelector('.contact-error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create and show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'contact-error-message';
        errorDiv.style.cssText = `
            background: #ff4444;
            color: white;
            padding: 1rem;
            border-radius: 5px;
            margin-bottom: 1rem;
            text-align: center;
        `;
        errorDiv.textContent = message;
        
        const form = document.getElementById('quickContactForm');
        form.insertBefore(errorDiv, form.firstChild);
        
        // Scroll to error
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove error after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    function showContactSuccess() {
        // Remove existing messages
        const existingMessage = document.querySelector('.contact-success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create and show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'contact-success-message';
        successDiv.style.cssText = `
            background: #4CAF50;
            color: white;
            padding: 2rem;
            border-radius: 10px;
            margin-bottom: 2rem;
            text-align: center;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        `;
        successDiv.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
            <h3 style="margin-bottom: 0.5rem;">Message Sent!</h3>
            <p style="margin: 0;">Thank you for contacting us. We will get back to you as soon as possible.</p>
        `;
        
        const form = document.getElementById('quickContactForm');
        form.insertBefore(successDiv, form.firstChild);
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove success message after 8 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 8000);
    }
    
    // Real-time validation feedback for contact form
    const contactInputs = document.querySelectorAll('#quickContactForm input[required], #quickContactForm textarea[required]');
    contactInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ff4444';
            } else {
                this.style.borderColor = '#4CAF50';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#4CAF50';
            }
        });
    });
    
    // Contact detail items hover effects
    const contactItems = document.querySelectorAll('.contact-detail-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
});

