import { useHistory } from 'react-router-dom';

import type { ReactElement } from 'react';

const BackwardButton = (): ReactElement => {
    let history = useHistory();
    return (<span onClick={() => history.goBack()}>Go back</span>);
        
};

export default BackwardButton;