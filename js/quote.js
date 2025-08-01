// Quote Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('detailedQuoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validation
            if (!validateForm(data)) {
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('.submit-button');
            const originalHTML = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showSuccessMessage();
                this.reset();
                submitButton.innerHTML = originalHTML;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    function validateForm(data) {
        // Required fields validation
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'projectType', 'projectDescription'];
        
        for (let field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                showError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
                return false;
            }
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showError('Please enter a valid email address.');
            return false;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\(\)\+]+$/;
        if (!phoneRegex.test(data.phone)) {
            showError('Please enter a valid phone number.');
            return false;
        }
        
        return true;
    }
    
    function showError(message) {
        // Remove existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create and show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: #ff4444;
            color: white;
            padding: 1rem;
            border-radius: 5px;
            margin-bottom: 1rem;
            text-align: center;
        `;
        errorDiv.textContent = message;
        
        const form = document.getElementById('detailedQuoteForm');
        form.insertBefore(errorDiv, form.firstChild);
        
        // Scroll to error
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove error after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    function showSuccessMessage() {
        // Remove existing messages
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create and show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
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
            <h3 style="margin-bottom: 0.5rem;">Thank You!</h3>
            <p style="margin: 0;">Your quote request has been submitted successfully. We will contact you within 24 hours to discuss your project.</p>
        `;
        
        const form = document.getElementById('detailedQuoteForm');
        form.insertBefore(successDiv, form.firstChild);
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove success message after 10 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 10000);
    }
    
    // Real-time validation feedback
    const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
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
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            this.value = value;
        });
    }
});

