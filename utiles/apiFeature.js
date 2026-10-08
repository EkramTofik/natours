class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryObj = { ...this.queryStr };

    const excludedFields = ['page', 'limit', 'sort', 'fields'];

    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\[(gte|gt|lte|lt)\]":"([^"]+)"/g,
      '":{"$$$1":"$2"}',
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = Array.isArray(this.queryStr.sort)
        ? this.queryStr.sort.join(' ')
        : this.queryStr.sort.split(',').join(' ');

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-_id');
    }
    return this;
  }

  limitField() {
    if (this.queryStr.fields) {
      const fields = this.query.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.query.page * 1 || 1;
    const limit = this.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    // if (this.query.page) {
    //   const numTours = await this.query.countDocuments();
    //   if (skip >= numTours) throw new Error('This page does not found');
    // }
    return this;
  }
}
module.exports = ApiFeature;
