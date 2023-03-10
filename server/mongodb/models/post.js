import mongoose from 'mongoose';

const Post = new mongoose.Schema({
     name: { type: String, required: true },
     prompt: { type: String, required: true },
     photo: { type: String, required: true },
     likes: { type: Number, required: true, default: 0 },
     downloads: { type: Number, required: true, default: 0 },
}, {
     timestamps: true,
});
   
const PostSchema = mongoose.model('Post', Post);

export default PostSchema;