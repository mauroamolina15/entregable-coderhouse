import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnails: [{ type: String }],
  status: { type: Boolean, required: true, default: true },
  category: { type: String, required: true },
  image: { type: String, required: false, default: "/products/no-image.jpg" },
  owner: { type: String, required: false, default: "admin" },
  code: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: function () {
      const randomNumber = Math.floor(100 + Math.random() * 900);
      const titleWithoutSpaces = this.title.replace(/\s/g, "");
      return `${titleWithoutSpaces}${randomNumber}`;
    },
  },
});

productSchema.plugin(mongoosePaginate);

export const Product = mongoose.model("products", productSchema);
