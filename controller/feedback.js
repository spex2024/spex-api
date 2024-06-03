import Feedback from "../model/feedback.js";

export const createFeedback = async (req, res) => {
    try {
        const { name, email, phone, company, answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8 } = req.body;

        const newFeedback = new Feedback({
            name,
            email,
            phone,
            company,
            answer1,
            answer2,
            answer3,
            answer4,
            answer5,
            answer6,
            answer7,
            answer8
        });

        const savedFeedback = await newFeedback.save();

        res.status(201).json(savedFeedback);
    } catch (error) {
        console.error("Error creating feedback:", error);
        res.status(500).json({ error: "Internal Server Error" });
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
