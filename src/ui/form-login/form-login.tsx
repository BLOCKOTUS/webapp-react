import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';

import type { ReactElement } from 'react';
import type { FormikHelpers } from 'formik';

import * as actions from '../../actions/users';
import { login } from '../../modules/login';
import type { User } from '../../modules/user';

type FormLoginValues = {
    username: string,
    wallet: string,
    publicKey: string,
    privateKey: string,
}

const FormLogin = ({
    loginUser,
}: {
    loginUser: (user: User) => void,
}): ReactElement => {

    const onSubmit = (
        values: FormLoginValues,
        { setSubmitting }: FormikHelpers<FormLoginValues>,
    ): void => {
        login(values).then(success => {
            setSubmitting(false);
            let user: User = {
                username: values.username,
                wallet: JSON.parse(values.wallet),
                keypair: {
                    privateKey: values.privateKey,
                    publicKey: values.publicKey,
                },
            };
            if (success) { loginUser(user); }
        });
    }

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

const mapDispatchToProps = (dispatch: any) => {
    return {
      loginUser: (user: User) => dispatch(actions.loginUser(user)),
    }
  }

export default connect(
    null,
    mapDispatchToProps,
  )(FormLogin);
