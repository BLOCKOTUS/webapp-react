import { Formik, Field, Form, FormikHelpers } from 'formik';

import type { ReactElement } from 'react';

type LoginFormValues = {
    username: string,
    wallet: string,
    publicKey: string,
    privateKey: string,
}

const onSubmit = (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>,
): void => {
    console.log({values});
    setSubmitting(false);
}

const LoginForm = (): ReactElement => {
    return (
        <div>
            <Formik
                initialValues={{
                    username: '',
                    wallet: '',
                    publicKey: '',
                    privateKey: '',
                }}
                onSubmit={onSubmit}
            >
                <Form>
                    <label htmlFor="username">Username</label>
                    <Field id="username" name="username" placeholder="Username" />

                    <label htmlFor="wallet">Wallet</label>
                    <Field id="wallet" name="wallet" placeholder="Wallet" />

                    <label htmlFor="publicKey">Public Key</label>
                    <Field id="publicKey" name="publicKey" placeholder="Public Key" />

                    <label htmlFor="privateKey">Private Key</label>
                    <Field id="privateKey" name="privateKey" placeholder="Private Key" />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )       
};

export default LoginForm;