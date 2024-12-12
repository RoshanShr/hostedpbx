import * as Yup from 'yup';

export const clientSchema = (clients)=> Yup.object({
    name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(15, "Name must be at most 15 characters")
    .required("Name is required")
    .test("unique-name", "Client name already exists", function (value) {
        return !clients?.some((client) => client.name === value);
      }),
    alias: Yup.string()
    .min(2, "Alias must be at least 2 characters")
    .max(15, "Alias must be at most 15 characters")
    .required("Alias is required")
    .test("unique-alias", "Client alias already exists", function (value) {
        return !clients?.some((client) => client.alias === value);
      }),
    // confirm_password:Yup.string().requried().YuponeOf([Yup.ref('password'), null], "Password must match"),
    //email:Yup.string().email().min(2).max(15).requried(),
})