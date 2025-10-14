import * as yup from 'yup';

export const createChangelogSchema = yup.object({
  title: yup.string().trim().min(3).max(255).required(),
  version: yup.string().trim().required(),
  description: yup.string().trim().required(),
  releaseDate: yup.date().required(),
})
