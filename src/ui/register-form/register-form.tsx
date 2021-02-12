import { useState } from 'react';

import InfoBar from '../info-bar';

import { Formik, Field, Form, FormikHelpers } from 'formik';

import type { ReactElement } from 'react';
import type { InfoType } from '../info-bar';

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
    const [info, setInfo] = useState<InfoType>();

    return (
        <div>
            <InfoBar info={info} />
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