import styled from 'styled-components';

import type { ReactElement } from 'react';
import { Heart } from 'react-spinners-css';

import type { InfoType } from '../../modules/info';

type InfoBarProps = {
    info?: InfoType,
};

const Wrapper = styled.div<{type?: 'error' | 'info'}>`
    width: 100%;
    margin-bottom: 40px;
    font-size: 30px;
    text-align: center;
    background: ${({ type }) => {
        if (type === 'error') return '#f7cfcf';
        if (type === 'info') return '#ebf7eb';
        return 'white';
    }};
`;

const InfoBar = ({
    info,
}: InfoBarProps): ReactElement => {
    

    return info
        ? (
            <Wrapper type={info.type}>
                { info.value }
                { info.loading && (<Heart />) }
            </Wrapper>
        )
        : (<></>);
        
};

export default InfoBar;