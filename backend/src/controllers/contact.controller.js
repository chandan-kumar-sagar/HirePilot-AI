import nodemailer from 'nodemailer';
import { z } from 'zod';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define strict validation schema
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name is too long").trim(),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long").trim(),
  email: z.string().email("Invalid email address").max(100).trim(),
  phone: z.string().max(20, "Phone number is too long").optional(),
  subject: z.string().min(1, "Subject is required").max(100, "Subject is too long").trim(),
  message: z.string().min(10, "Message is too short").max(2000, "Message is too long").trim()
});

export const sendContactMessage = async (req, res) => {
  try {
    // 1. Validate and sanitize input
    const validatedData = contactSchema.parse(req.body);
    const { firstName, lastName, email, phone, subject, message } = validatedData;

    // 2. Configure Nodemailer transport
    // Ensure EMAIL_USER and EMAIL_APP_PASSWORD are set in .env
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // 3. Prepare safe plain-text email content for YOU (the admin)
    // We strictly use text instead of HTML to prevent any malicious scripts or tracking links from rendering
    const adminMailOptions = {
      from: `"HirePilot-AI Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Sending to yourself
      replyTo: email,
      subject: `New Message from ${firstName} ${lastName}: ${subject}`,
      text: `You have received a new contact message from the HirePilot-AI website.\n\n` +
            `SENDER INFO\n` +
            `-----------\n` +
            `Name:  ${firstName} ${lastName}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone || 'N/A'}\n` +
            `Subject: ${subject}\n\n` +
            `MESSAGE\n` +
            `-------\n` +
            `${message}\n\n` +
            `--\nThis email was sent securely via HirePilot-AI.`
    };

    // 4. Prepare beautiful HTML auto-responder for the SENDER
    const userMailOptions = {
      from: `"HirePilot-AI Support" <${process.env.EMAIL_USER}>`,
      to: email, // Sending to the user who submitted the form
      subject: `We've received your message: ${subject}`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333333; line-height: 1.6;">
        <p>Dear ${firstName} ${lastName},</p>
        
        <p>Thank you for reaching out to us.</p>
        
        <p>We have successfully received your inquiry and our team is reviewing your request. We appreciate your interest in our services and will get back to you within 24-48 business hours.</p>
        
        <p>For your reference, here is a copy of your submitted information:</p>
        
        <p>------------------------------------------------<br>
        Name: ${firstName} ${lastName}<br>
        Email: ${email}<br>
        Phone: ${phone || 'N/A'}<br>
        Subject: ${subject}<br><br>
        Message:<br>
        ${message.replace(/\n/g, '<br>')}<br>
        ------------------------------------------------</p>
        
        <p>If your matter is urgent, please feel free to contact us directly.</p>
        
        <p>Thank you for choosing HirePilot-AI.</p>
        
        <p>Best Regards,</p>
        
        <!-- Company Logo -->
        <div style="margin: 20px 0;">
          <img src="cid:logo" alt="HirePilot-AI Logo" style="width: 120px; height: auto; display: block;" />
        </div>
        
        <p style="margin-bottom: 5px; font-weight: bold;">Chandan Kumar Sagar</p>
        <p style="margin: 0; font-size: 14px;">Founder, HirePilot-AI</p>
        
        <p style="margin: 15px 0 5px 0; font-size: 14px; font-weight: bold;">Connect with me:</p>
        <p style="margin: 0; font-size: 14px;">
          Email: <a href="mailto:chandan99file@gmail.com" style="color: #4F46E5; text-decoration: none;">chandan99file@gmail.com</a>
        </p>
        <p style="margin: 0; font-size: 14px;">
          Phone: +91 74884 06481 | +91 72958 05328
        </p>
        <p style="margin: 0; font-size: 14px;">
          Portfolio: <a href="https://portfolio-euya.vercel.app/" style="color: #4F46E5; text-decoration: none;">View my work</a>
        </p>
        <p style="margin: 0; font-size: 14px;">
          LinkedIn: <a href="https://www.linkedin.com/in/chandan-kumar-19904b267/" style="color: #4F46E5; text-decoration: none;">Chandan Kumar Sagar</a>
        </p>
        <p style="margin: 0; font-size: 14px;">
          GitHub: <a href="https://github.com/chandan-kumar-sagar" style="color: #4F46E5; text-decoration: none;">chandan-kumar-sagar</a>
        </p>
      </div>
      `,
      attachments: [
        {
          filename: 'logo.png',
          path: path.join(__dirname, '../assets/logo.png'),
          cid: 'logo'
        }
      ]
    };

    // 5. Send both emails concurrently
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);
    logger.info(`Contact email sent successfully from ${email}`);

    res.status(200).json({
      status: 'success',
      message: 'Your message has been securely sent to the HirePilot-AI team.'
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((e) => ({ field: e.path[0], message: e.message }));
      return res.status(400).json({ status: 'error', message: 'Validation failed', errors });
    }
    
    logger.error(`Error sending contact email: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'There was a problem sending your message. Please try again later.'
    });
  }
};
