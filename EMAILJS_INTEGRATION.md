# EmailJS Integration Documentation

## Overview
The contact form has been successfully integrated with EmailJS to send emails directly from the client-side without requiring a backend server.

## Environment Variables
The following environment variables have been configured in `.env`:

```bash
# EmailJS Configuration (client-side accessible)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_65j8jlg
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_z4jlyfe
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=0gh5W4UyG4khrPUqg

# Builder.io Configuration
NEXT_PUBLIC_BUILDER_API_KEY=d3b94f96fbb0479cb18a6eac3b1085c6
```

## How It Works

### 1. EmailJS Setup
- The contact form is located in `components/Contact.tsx`
- EmailJS is imported using `import emailjs from '@emailjs/browser'`
- The form uses your provided EmailJS credentials

### 2. Form Submission Process
When a user submits the contact form:

1. Form validation occurs (required fields: name, email, subject, message)
2. EmailJS is initialized with your public key
3. Template parameters are prepared with form data:
   ```javascript
   const templateParams = {
     from_name: contactForm.name,
     from_email: contactForm.email,
     phone: contactForm.phone,
     subject: contactForm.subject,
     message: contactForm.message,
     to_name: 'DAM Team',
     to_email: 'info@damgcc.com',
     reply_to: contactForm.email,
   };
   ```
4. Email is sent using `emailjs.send()` with your service ID and template ID
5. Success/error feedback is provided to the user

### 3. Features
- ✅ Client-side email sending (no backend required)
- ✅ Form validation with required fields
- ✅ Loading states during submission
- ✅ Success and error notifications
- ✅ Form reset after successful submission
- ✅ Bilingual support (English/Arabic)
- ✅ Responsive design
- ✅ WhatsApp integration as backup contact method

### 4. Template Parameters
Your EmailJS template should include these variables:
- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{phone}}` - Customer's phone (optional)
- `{{subject}}` - Message subject
- `{{message}}` - Main message content
- `{{to_name}}` - Recipient name (DAM Team)
- `{{to_email}}` - Recipient email (info@damgcc.com)

### 5. Error Handling
- Network errors are caught and displayed to users
- Fallback suggestion to contact via WhatsApp if email fails
- Console logging for debugging purposes

### 6. Testing
To test the contact form:
1. Navigate to `/contact` page
2. Fill out all required fields
3. Submit the form
4. Check your EmailJS dashboard for sent emails
5. Verify emails arrive at info@damgcc.com

## Security Notes
- All EmailJS credentials are client-side accessible (NEXT_PUBLIC_ prefix)
- No sensitive server-side secrets are exposed
- EmailJS handles rate limiting and spam protection
- Consider implementing client-side rate limiting for additional protection

## Backup Contact Methods
The contact page also provides multiple backup contact options:
- WhatsApp: +971502342218
- Phone: +971502342218
- Email: info@damgcc.com
- Physical address with Google Maps integration
