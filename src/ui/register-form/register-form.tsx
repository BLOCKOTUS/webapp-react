import { Formik, Field, Form, FormikHelpers } from 'formik';

import type { ReactElement } from 'react';

type RegisterFormValues = {
    username: string,
}

const onSubmit = (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>,
): void => {
    console.log({values});
    setSubmitting(false);
}

const RegisterForm = (): ReactElement => {
    return (
        <div>
            <Formik
                initialValues={{
                    username: '',
                }}
                onSubmit={onSubmit}
            >
                <Form>
                    <label htmlFor="username">Username</label>
                    <Field id="username" name="username" placeholder="Dani" />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )       
};

export default RegisterForm;