import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { subject, message, to } = await request.json();

    // Add validation for required fields
    if (!to || !subject || !message) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: to, subject, and message are required' 
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 