import { useState } from 'react';

import InfoBar from '../info-bar';

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
    const [infoType, setInfoType] = useState<'error' | 'info' | ''>('');
    const [infoValue, setInfoValue] = useState('');
    const [infoLoading, setInfoLoading] = useState(false);

    return (
        <div>
            <InfoBar 
                type={infoType}
                value={infoValue}
                loading={infoLoading}
            />
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