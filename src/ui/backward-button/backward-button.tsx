import { useHistory } from 'react-router-dom';

import type { ReactElement } from 'react';

const BackwardButton = (): ReactElement => {
    let history = useHistory();
    return (<button type="button" onClick={() => history.goBack()}>Go back</button>);
        
};

export default BackwardButton;