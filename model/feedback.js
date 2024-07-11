import mongoose from "mongoose";

const { Schema, model } = mongoose;

const FeedbackSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        company: {
            type : String, // Store image as Buffer
            required :true
        },
        answer1: {
            type : String, // Store image as Buffer

        },
        answer2: {
            type : String, // Store image as Buffer

        },
        answer3: {
            type : String, // Store image as Buffer

        },
        answer4: {
            type : String, // Store image as Buffer

        },
        answer5: {
            type : String, // Store image as Buffer

        },
        answer6: {
            type : String, // Store image as Buffer

        },
        answer7: {
            type : String, // Store image as Buffer
        },
        answer8: {
            type : String, // Store image as Buffer
        },

    },
    {
        timestamps: true,
    }
);

const Feedback = model('Feedback', FeedbackSchema);

export default Feedback;
