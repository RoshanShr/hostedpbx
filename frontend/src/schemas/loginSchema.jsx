import * as Yup from 'yup';

export const loginSchema = Yup.object({
    username: Yup.string().min(2).max(15).required(),
    password: Yup.string().min(2).max(15).required(),
    // confirm_password:Yup.string().requried().YuponeOf([Yup.ref('password'), null], "Password must match"),
    //email:Yup.string().email().min(2).max(15).requried(),
})