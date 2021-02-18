import { Formik, Field, Form } from 'formik';

import type { ReactElement } from 'react';
import type { FormikHelpers } from 'formik';

type FormLoginValues = {
    username: string,
    wallet: string,
    publicKey: string,
    privateKey: string,
}

const onSubmit = (
    values: FormLoginValues,
    { setSubmitting }: FormikHelpers<FormLoginValues>,
): void => {
    console.log({values});
    setSubmitting(false);
}

const FormLogin = (): ReactElement => {
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

export default FormLogin;