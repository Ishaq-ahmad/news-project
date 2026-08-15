import mongoose from 'mongoose';
import slugify from 'slugify';
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Convert all name Text to lowercase
// categorySchema.pre('validate', function(next){
//     this.slug= slugify(this.name, {lower: true});
//     next
// })


const Category = mongoose.model('Categories', categorySchema);

export default Category;