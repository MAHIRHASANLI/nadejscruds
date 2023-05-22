import * as Yup from "yup"
export const LiteraSchema = Yup.object().shape({
title: Yup.string().required(),
genre: Yup.string().required().oneOf(['thriller', 'detective',  'fantasy', 'classic']),
page: Yup.number().positive().integer().required(),
literatureURL: Yup.string().required(),

})