import { useState } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import InfoBar from '../info-bar';
import { submitCreateIdentity } from '../../modules/identity';

import type { ReactElement } from 'react';

import type { IdentityType } from '../../modules/identity';
import type { InfoType } from '../../modules/info';
import type { UsersType } from '../../modules/user';
import type { State } from '../../store';

type FormCreateIdentityValues = {
    firstname: string,
    lastname: string,
    birthdate: string,
    nation: string,
    nationalId: string,
    documentation: string,
}


const FormCreateIdentity = ({
    users,
    onSuccess,
}: {
    users?: UsersType,
    onSuccess: (identity: IdentityType) => void,
}): ReactElement => {
    const [info, setInfo] = useState<InfoType | null>();
    
    let history = useHistory();

    const onSubmit = (
        values: FormCreateIdentityValues,
        { setSubmitting }: FormikHelpers<FormCreateIdentityValues>,
    ): void => {
        if (users?.loggedInUser) {
                submitCreateIdentity({
                    user: users.loggedInUser,
                    citizen: values,
                    onInfo: setInfo,
                })
                .then(success => {
                    if (success) { 
                        onSuccess(values);
                        setTimeout(() => history.push('/kyc'), 1500);
                    }
                    setSubmitting(false);
                })
                .catch(() => setSubmitting(false));
        }
    };

    return (
        <div>
            <InfoBar info={info} />
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    birthdate: '1992-01-01',
                    nation: '',
                    nationalId: '',
                    documentation: 'https://imgur.com/a/5a15vOr',
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

const mapStateToProps = (state: State) => {
    const { users } = state
    return { users };
}
  
export default connect(
    mapStateToProps,
    null,
)(FormCreateIdentity);