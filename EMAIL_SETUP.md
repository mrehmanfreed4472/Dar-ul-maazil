# EmailJS Configuration Guide for Dar Al Muaazil Order System

## Overview
This guide explains how to set up EmailJS to automatically send PDF order summaries via email when customers place orders.

## Prerequisites
1. EmailJS account (free tier available)
2. Gmail or other email service provider
3. Basic understanding of environment variables

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup wizard to connect your email account
5. Note down the **Service ID** (e.g., `service_dar_al_muaazil`)

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use the following template structure:

### Template ID: `template_order_pdf`

### Template Content:
```html
Subject: New Order #{{order_number}} - Dar Al Muaazil

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Order Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0d9488;">🏗️ New Order - Dar Al Muaazil</h1>
            <h2 style="color: #059669;">Order #{{order_number}}</h2>
            <p style="color: #6b7280;">Date: {{order_date}}</p>
        </div>

        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-top: 0;">👤 Customer Information</h3>
            <p><strong>Name:</strong> {{customer_name}}</p>
            <p><strong>Email:</strong> {{customer_email}}</p>
            <p><strong>Phone:</strong> {{customer_phone}}</p>
            <p><strong>Company:</strong> {{company}}</p>
            <p><strong>Project Location:</strong> {{project_location}}</p>
            <p><strong>Priority:</strong> {{urgency}}</p>
            <p><strong>Requested Delivery:</strong> {{delivery_date}}</p>
        </div>

        <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-top: 0;">📦 Order Details</h3>
            <p><strong>Total Items:</strong> {{items_count}}</p>
            <pre style="white-space: pre-wrap; font-family: monospace; background: white; padding: 15px; border-radius: 4px;">{{order_details}}</pre>
        </div>

        <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-top: 0;">💰 Total Amount</h3>
            <p><strong>USD Total:</strong> ${{total_usd}}</p>
            <p><strong>AED Total:</strong> {{total_aed}} AED</p>
        </div>

        {{#if notes}}
        <div style="background: #fefce8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-top: 0;">📝 Special Notes</h3>
            <p>{{notes}}</p>
        </div>
        {{/if}}

        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; border-left: 4px solid #ef4444;">
            <h3 style="color: #374151; margin-top: 0;">📄 PDF Attachment</h3>
            <p>The complete order summary PDF is attached to this email for your records.</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding: 20px; border-top: 2px solid #e5e7eb;">
            <p style="color: #6b7280;">
                Thank you for choosing Dar Al Muaazil!<br>
                We will process your order and contact you shortly.
            </p>
            <p style="color: #9ca3af; font-size: 12px;">
                This is an automated message from the Dar Al Muaazil order system.
            </p>
        </div>
    </div>
</body>
</html>
```

### Template Variables:
The template uses these variables (they are automatically filled by the system):
- `{{order_number}}`
- `{{order_date}}`
- `{{customer_name}}`
- `{{customer_email}}`
- `{{customer_phone}}`
- `{{company}}`
- `{{project_location}}`
- `{{urgency}}`
- `{{delivery_date}}`
- `{{items_count}}`
- `{{order_details}}`
- `{{total_usd}}`
- `{{total_aed}}`
- `{{notes}}`
- `{{pdf_attachment}}`

## Step 4: Get Your Public Key
1. Go to "Account" in your EmailJS dashboard
2. Copy your **Public Key**

## Step 5: Configure Environment Variables
Use the following environment variables in your application:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=template_order_pdf
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 6: Test the Configuration
1. Make sure all environment variables are set
2. Restart your development server
3. Place a test order with email contact method
4. Check that the email is received with the PDF attachment

## Troubleshooting

### Common Issues:
1. **Email not sending**: Check environment variables and EmailJS dashboard logs
2. **PDF not attaching**: Verify the PDF generation is working properly
3. **Template errors**: Check template variables match exactly
4. **Service limits**: Free tier has limits; upgrade if needed

### Error Messages:
- `EmailJS not configured properly`: Check environment variables
- `Failed to send email`: Check EmailJS dashboard for error logs
- `Template not found`: Verify template ID is correct

## Security Notes
- Keep your EmailJS keys secure
- Use environment variables, not hardcoded values
- Monitor usage to prevent abuse
- Set up proper CORS settings in EmailJS dashboard

## Support
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/contact/](https://www.emailjs.com/contact/)

## Features Included
✅ Automatic PDF generation and attachment
✅ Bilingual support (English/Arabic)
✅ Professional email template
✅ Customer and order details
✅ Fallback to WhatsApp if email fails
✅ Environment variable configuration
✅ Error handling and user feedback
