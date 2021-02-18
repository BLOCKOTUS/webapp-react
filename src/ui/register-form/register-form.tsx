import { useState } from 'react';

import InfoBar from '../info-bar';
import { submitRegister } from '../../modules/login';

import { Formik, Field, Form, FormikHelpers } from 'formik';

import type { ReactElement } from 'react';
import type { InfoType } from '../../modules/info';
import type { User } from '../../modules/user';

type RegisterFormValues = {
    username: string,
}

const RegisterForm = ({
    onSucces,
}: {
    onSucces: (user:  User) => void
}): ReactElement => {
    const [info, setInfo] = useState<InfoType>();

    const submitForm = (
        values: RegisterFormValues,
        { setSubmitting }: FormikHelpers<RegisterFormValues>,
    ): void => {
        submitRegister({ username: values.username, onInfo: setInfo })
            .then(user => user && setSubmitting(false) && onSucces(user));
    }

    return (
        <div>
            <InfoBar info={info} />
            <Formik
                initialValues={{
                    username: '',
                }}
                onSubmit={submitForm}
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