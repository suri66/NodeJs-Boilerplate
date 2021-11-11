const q = require("q");
const parseSelectedFields = require("./utils");

/**
 * @name create
 * @description create function
 * @param {object} model - object param
 * @param {object} entity - object param
 */
function create(model, entity) {
  const deffered = q.defer();
  let data = new model(entity);
  model.collection
    .insertOne(data)
    .then(data => {
      deffered.resolve(data && data.ops && data.ops[0]);
    })
    .catch(err => {
      deffered.reject(err);
    });

  return deffered.promise;
}

/**
 * @name update
 * @description update function
 * @param {object} model - object param
 * @param {object} query - object param
 * @param {object} obj - object param
 */
function update(model, query, obj) {
  const deffered = q.defer();

  model
    .findOneAndUpdate(query, obj, { new: true })
    .then(data => {
      deffered.resolve(data);
    })
    .catch(err => {
      deffered.reject(err);
    });

  return deffered.promise;
}

/**
 * @name getById
 * @description getById function
 * @param {object} model - object param
 * @param {ObjectId} id - ObjectId param
 */
function getById(model, id) {
  const deffered = q.defer();
  model
    .findById(id)
    .then(data => {
      deffered.resolve(data);
    })
    .catch(err => {
      deffered.reject(err);
    });

  return deffered.promise;
}

/**
 * @name getAll
 * @description getAll function
 * @param {object} model - object param
 * @param {object} query - object param
 * @param {object} options - object param.. pass sort, select, page, pagesize here
 * @description Pass options details in query params
 * options: http://localhost:3000/users?sort=firstname&select=firstname,lastname&pagesize=2&page=1
 * sort: 1. ascending sort: ?sort=firstname 2. descending sort: ?sort=-firstname (put -(minus) before keyname)
 * select: ?select=key1,key2
 * pagesize&page: ?pagesize=10&page=1
 */
function getAll(model, query, options) {
  const deffered = q.defer();
  const pagesize = +options.pagesize || 10;
  let page = 0;

  if (+options.page) {
    page = pagesize * (+options.page - 1);
  }

  model
    .find(query)
    .select(parseSelectedFields(options.select))
    .limit(pagesize)
    .skip(page)
    .sort(options.sort || {})
    .then(data => {
      deffered.resolve(data);
    })
    .catch(err => {
      deffered.reject(err);
    });

  return deffered.promise;
}

/**
 * @name getCount
 * @description getCount function
 * @param {object} model - object param
 * @param {object} query - object param
 */
function getCount(model, query) {
  const deffered = q.defer();

  model
    .count(query)
    .then(count => {
      deffered.resolve(count);
    })
    .catch(err => {
      deffered.reject(err);
    });

  return deffered.promise;
}

module.exports = {
  create: create,
  update: update,
  getById: getById,
  getAll: getAll,
  getCount: getCount
};
