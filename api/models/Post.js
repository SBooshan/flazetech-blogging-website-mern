const mongoose = require('mongoose');
const {Schema,model} = mongoose;
const commentSchema = new mongoose.Schema({
  text: String,
  // Other fields if needed
});

const PostSchema = new Schema({
  title:String,
  summary:String,
  content:String,
  cover:String,
  author:{type:Schema.Types.ObjectId, ref:'User'},
  comments: [commentSchema],
}
  
, {
  timestamps: true,
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;