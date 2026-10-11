const ApiFeature = require('../utiles/apiFeature');
const AppError = require('../utiles/appError');
const catchAsync = require('../utiles/catchAsync');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
//ROUTE HANDLERS
exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    const feature = new ApiFeature(Model.find(), req.query)
      .filter()
      .sort()
      .limitField()
      .paginate();
    const docs = await feature.query;

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        docs,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newDoc,
      },
    });
  });
exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id).populate('reviews');
    if (!doc) {
      return next(
        new AppError(
          `No ${Model.modelName.toLowerCase()}  found with that ID`,
          404,
        ),
      );
    }
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!doc) {
      return next(
        new AppError(
          `No ${Model.modelName.toLowerCase()} found with that ID`,
          404,
        ),
      );
    }
    res.status(200).json({
      status: 'success',
      message: `Updated ${Model.modelName.toLowerCase()} is here`,
      data: {
        doc,
      },
    });
  });
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(
        new AppError(
          `No ${Model.modelName.toLowerCase()}  found with that ID`,
          404,
        ),
      );
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
