const mongoose = require('mongoose');

// const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name '],
      unique: true,
      trim: true,
      minlength: [10, 'A tour name must have more or equal then 10 character'],
      maxlength: [40, 'A tour name must have less or equal then 40 character'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration '],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size '],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either:easy,medium,difficult',
      },
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1.0, 'Rating must be above 1.0'],
      max: [5.0, 'Rating must be below 5.0'],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price '],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    priceQuantity: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description '],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image '],
    },
    image: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
tourSchema.virtual('durationWeek').get(function () {
  return this.duration / 7;
});
//Document middleware
// tourSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
// });

// tourSchema.pre('save', (doc, next) => {
//   console.log(doc);
// });

//Query middleware
tourSchema.pre(/^find/, function () {
  this.find({ secretTour: { $ne: true } });
});
tourSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
