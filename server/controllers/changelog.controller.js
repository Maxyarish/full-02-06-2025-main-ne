const Changelog = require("../models/Changelog");

module.exports.createChangelog = async (req, res, next) => {
  try {
    const changelog = await Changelog.create(req.body);
    res.status(201).send({ data: changelog });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllChangelogs = async (req, res, next) => {
  try {
    const changelogs = await Changelog.find().sort({ releaseDate: -1 });
    res.status(200).send({ data: changelogs });
  } catch (error) {
    next(error);
  }
};
