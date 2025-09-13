import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    console.log('=== Contact API Request Started ===');
    const { name, email, phone, message, recaptchaValue } = await request.json();
    
    console.log('Request data received:', {
      name: name ? 'provided' : 'missing',
      email: email ? 'provided' : 'missing',
      phone: phone ? 'provided' : 'not provided',
      message: message ? `${message.length} characters` : 'missing',
      recaptchaValue: recaptchaValue ? 'provided' : 'missing'
    });

    // Add validation for required fields
    if (!name || !email || !message) {
      console.log('Validation failed: Missing required fields');
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: name, email, and message are required' 
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // Verify reCAPTCHA
    if (!recaptchaValue) {
      console.log('reCAPTCHA validation failed: No token provided');
      return new Response(
        JSON.stringify({ 
          error: 'reCAPTCHA verification required' 
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    console.log('Starting reCAPTCHA v3 verification...');
    console.log('Environment variables check:', {
      RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY ? 'set' : 'missing',
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? 'set' : 'missing'
    });

    // Verify reCAPTCHA v3
    const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaValue}`
    });

    const recaptchaData = await recaptchaResponse.json();
    console.log('reCAPTCHA response:', {
      status: recaptchaResponse.status,
      success: recaptchaData.success,
      score: recaptchaData.score,
      action: recaptchaData.action,
      hostname: recaptchaData.hostname,
      'error-codes': recaptchaData['error-codes']
    });
    
    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.log('reCAPTCHA verification failed:', recaptchaData);
      return new Response(
        JSON.stringify({ 
          error: 'reCAPTCHA v3 verification failed',
          score: recaptchaData.score,
          'error-codes': recaptchaData['error-codes']
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    console.log('reCAPTCHA verification successful');

    // Create transporter
    console.log('=== Email Configuration ===');
    console.log('Email environment variables check:', {
      EMAIL_USER: process.env.EMAIL_USER ? 'set' : 'missing',
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'set' : 'missing'
    });
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // This should be an App Password, not your regular Gmail password
      },
      // Additional security options
      secure: true, // Use TLS
      port: 465,
    });
    
    console.log('Transporter created successfully');

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'sales@codeplexllc.com',
      replyTo: email, // This allows sales team to reply directly to the user
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This message was sent from the CodePlex website contact form.</em></p>
        <p><em>Reply to this email to respond directly to ${name} at ${email}</em></p>
      `,
    };
    
    console.log('Mail options configured:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    try {
      console.log('=== Attempting to send email ===');
      const emailResult = await transporter.sendMail(mailOptions);
      
      console.log('Email sent successfully!', {
        messageId: emailResult.messageId,
        response: emailResult.response,
        accepted: emailResult.accepted,
        rejected: emailResult.rejected
      });
      
      return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (emailError) {
      console.error('=== Email Sending Failed ===');
      console.error('Error details:', {
        message: emailError.message,
        code: emailError.code,
        command: emailError.command,
        response: emailError.response,
        responseCode: emailError.responseCode,
        stack: emailError.stack
      });
      
      // Return a more detailed error message
      return new Response(JSON.stringify({ 
        error: 'Failed to send email', 
        details: emailError.message,
        code: emailError.code || 'UNKNOWN'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Error in contact API:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process request',
      details: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}