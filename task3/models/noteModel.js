const yup = require('yup')

exports.note = yup.object().shape({
  name: yup.string().min(1).max(100).required(),
  created: yup.string().min(1),
  category: yup.string().min(1).required(),
  content: yup.string().min(1).required(),
  dates: yup.string(),
  archived: yup.bool()
}).noUnknown().strict()

exports.editNote = yup.object().shape({
  name: yup.string().min(1).max(100),
  created: yup.string().min(1),
  category: yup.string().min(1),
  content: yup.string().min(1),
  dates: yup.string(),
  archived: yup.bool()
}).noUnknown().strict()