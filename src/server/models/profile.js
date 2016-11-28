import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const ProfileSchema = new mongoose.Schema({
    url: { type: String, index: true, unique: true },
    fullname: { type: String, index: true },
    currentTitle: { type: String, index: true },
    currentPosition: { type: String, index: true },
    summary: String,
    score: Number,
    skills: { type: [String], index: true },
    experience: [{
        title: String,
        company: String,
        dates: String,
        locality: String,
        description: String,
        current:Boolean
    }],
    education: [{
        title: String,
        degree: String,
        field: String,
        dates: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
ProfileSchema.plugin(mongoosePaginate);

export default mongoose.model('Profile', ProfileSchema);