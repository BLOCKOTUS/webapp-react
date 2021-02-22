import type { ReactElement } from 'react';

import { validateDocumentationUrl } from '../../modules/identity';

import type { IdentityTypeWithKYC } from '../../modules/identity';

const Identity = ({
    identity,
}: {
    identity?: IdentityTypeWithKYC,
}): ReactElement => {
    

    return identity 
        ? (
            <table>
                <tr><td>Firstname</td><td>{identity.firstname}</td></tr>
                <tr><td>Lastname</td><td>{identity.lastname}</td></tr>
                <tr><td>Nation</td><td>{identity.nation}</td></tr>
                <tr><td>National Id</td><td>{identity.nationalId}</td></tr>
                <tr><td>KYC</td><td>{identity.kyc.toString()}</td></tr>
                <tr><td>Confirmations</td><td>{identity.confirmations[0]}/{identity.confirmations[1]}</td></tr>
                <tr>
                    <td>Documentation</td>
                    <td>
                        { validateDocumentationUrl(identity.documentation) && 
                            (<a rel="noreferrer" href={identity.documentation} target="_blank">{identity.documentation}</a>)
                        }
                    </td>
                </tr>
            </table>
        )
        : (<></>);
        
};

export default Identity;