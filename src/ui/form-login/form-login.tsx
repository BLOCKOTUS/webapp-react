import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import { useState } from 'react';

import type { ReactElement } from 'react';
import type { FormikHelpers } from 'formik';

import InfoBar from '../info-bar';
import * as actions from '../../actions/users';
import { login } from '../../modules/login';

import type { User } from '../../modules/user';
import type { InfoType } from '../../modules/info';

type FormLoginValues = {
    username: string,
    wallet: string,
    publicKey: string,
    privateKey: string,
};

const FormLogin = ({
    loginUser,
}: {
    loginUser: (user: User) => void,
}): ReactElement => {
    const [info, setInfo] = useState<InfoType | null>();

    const onSubmit = (
        values: FormLoginValues,
        { setSubmitting }: FormikHelpers<FormLoginValues>,
    ): void => {
        login({ ...values, onInfo: setInfo })
            .then(user => {
                setSubmitting(false);
                if (user) { 
                    try {
                        loginUser(user); 
                    } catch (e) {

                    }
                }
            })
            .catch(e => {
                setSubmitting(false);
            });
    }

    return (
        <div>
            <InfoBar info={info} />
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

const mapDispatchToProps = (dispatch: any) => {
    return {
      loginUser: (user: User) => dispatch(actions.loginUser(user)),
    }
};

export default connect(
    null,
    mapDispatchToProps,
)(FormLogin);
