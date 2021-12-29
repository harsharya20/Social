// const  {check,sanitizebody }  = require('express-validator');
// exports.form=[
//     check('password').trim().notEmpty().withMessage('Password required')
//   .isLength({ min: 5 }).withMessage('password must be minimum 5 length')
//   .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
//   .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
//   .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
//   .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
//   .not().matches(/^$|\s+/).withMessage('White space not allowed'),
//   // confirm password validation
//   check('confirmPassword').custom((value, { req }) => {
//        if (value !== req.body.password) {
//              throw new Error('Password Confirmation does not match password');
//         }
//         return true;
//    })
// ]