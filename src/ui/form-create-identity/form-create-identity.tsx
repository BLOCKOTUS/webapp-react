import { Formik, Field, Form, FormikHelpers } from 'formik';

import type { ReactElement } from 'react';

type FormCreateIdentityValues = {
    firstname: string,
    lastname: string,
    birthdate: string,
    nation: string,
    nationalId: string,
    documentation: string,
}

const onSubmit = (
    values: FormCreateIdentityValues,
    { setSubmitting }: FormikHelpers<FormCreateIdentityValues>,
): void => {
    console.log({values});
    setSubmitting(false);
}

const FormCreateIdentity = (): ReactElement => {
    return (
        <div>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    birthdate: '',
                    nation: '',
                    nationalId: '',
                    documentation: '',
                }}
                onSubmit={onSubmit}
            >
                <Form>
                    <label htmlFor="firstname">Firstname</label>
                    <Field id="firstname" name="firstname" placeholder="Dani" />

                    <label htmlFor="lastname">Lastname</label>
                    <Field id="lastname" name="lastname" placeholder="Febrero" />

                    <label htmlFor="birthdate">Birthdate</label>
                    <Field id="birthdate" name="birthdate" placeholder="1992-01-01" />

                    <label htmlFor="nation">Nation</label>
                    <Field id="nation" name="nation" placeholder="Spain" />

                    <label htmlFor="nationalId">National Id</label>
                    <Field id="nationalId" name="nationalId" placeholder="26855433M" />

                    <label htmlFor="documentation">Documentation</label>
                    <Field id="documentation" name="documentation" placeholder="https://imgur.com/a/5a15vOr" />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )       
};

export default FormCreateIdentity;