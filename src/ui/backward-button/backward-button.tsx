import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

const BackwardButton = (): ReactElement => {
    let history = useHistory();
    return (<span onClick={() => history.goBack()}>Go back</span>);
        
};

export default BackwardButton;