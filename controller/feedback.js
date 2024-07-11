import Feedback from "../model/feedback.js";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "spexdev95@gmail.com",
        pass: process.env.APP,
    },
});
export const createFeedback = async (req, res) => {
    try {
        const { name, email, phone, company } = req.body;

        const newFeedback = new Feedback({
            name,
            email,
            phone,
            company
        });

        const savedFeedback = await newFeedback.save();

        res.status(201).json(savedFeedback);

        const mailOptions = {
            from: 'Spex Africa <no-reply@spexafrica.com>',
            to: email,
            subject: 'Thank you for joining our waitlist!',
            text: `
        Hi ${name},

        Thank you for joining our waitlist. We are excited to have you on board and will keep you updated on our progress.

        Best regards,
        The Spex Africa Team
    `,
            html: `
        <p>Hi ${name},</p>
        <p>Thank you for joining our waitlist. We are excited to have you on board and will keep you updated on our progress.</p>
        <p>Best regards,<br>The Spex Africa Team</p>
    `
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            } else {
                res.status(200).json({  message: 'Feedback submitted and email sent!' });
            }
        });

    } catch (error) {
        console.error("Error creating feedback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }





};

export const updateFeedback = async (req, res) => {
    const { email, answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8 } = req.body;

    try {
        const feedback = await Feedback.findOneAndUpdate(
            { email },
            { answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8 },
            { new: true, upsert: true } // Update the existing document or insert if it doesn't exist
        );
        const mailOptions = {
            from: 'Spex Africa <no-reply@spexafrica.com>',
            to: email,
            subject: 'Thank you for your feedback!',
            text: `
        Hi ${name},

        Thank you for your feedback. We are excited to have you on board and will keep you updated on our progress.

        Best regards,
        The Spex Africa Team
    `,
            html: `
        <p>Hi ${name},</p>
        <p>Thank you for joining our waitlist. We are excited to have you on board and will keep you updated on our progress.</p>
        <p>Best regards,<br>The Spex Africa Team</p>
    `
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            } else {
                res.status(200).json({  message: 'Feedback submitted and email sent!' });
            }
        });

        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFeedback = async (req, res) => {
    try {
        const postData = await Feedback.find().sort({ createdAt: -1 });
        res.json(postData);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getFeedbackById = async (req, res) => {
    try {
        const { id } = req.params;

        const feedback = await Feedback.findById(id);

        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        res.json(feedback);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Feedback ID is required' });
        }

        const deletedFeedback = await Feedback.findByIdAndDelete(id);

        if (!deletedFeedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const healthCheck = async (req, res) => {
    try {
        const status = "200 OK server running ";
        res.json(status);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
