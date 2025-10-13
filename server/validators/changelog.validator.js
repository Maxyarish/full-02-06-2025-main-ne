const Yup = require('yup');

module.exports.createChangelogSchema = Yup.object({
  title: Yup.string().trim().min(3).max(255).required(),
  version: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  releaseDate: Yup.date().required(),
})
