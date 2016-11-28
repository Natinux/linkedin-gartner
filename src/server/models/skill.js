import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const SkillSchema = new mongoose.Schema({
    name: { type: String, index: true, unique: true, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
SkillSchema.plugin(mongoosePaginate);

export default mongoose.model('Skill', SkillSchema);