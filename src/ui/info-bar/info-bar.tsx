import styled from 'styled-components';

import type { ReactElement } from 'react';

import type { InfoType } from '../../modules/info';

type InfoBarProps = {
    info?: InfoType,
};

const Wrapper = styled.div<{type?: 'error' | 'info'}>`
    width: 100%;
    margin-bottom: 40px;
    font-size: 30px;
    background: ${({ type }) => {
        if (type === 'error') return '#f7cfcf';
        if (type === 'info') return '#ebf7eb';
        return 'white';
    }};
`;

const Loader = styled.div`
    margin: 5px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(255, 62, 0, 0.7);
    border-right: 1.1em solid rgba(255, 62, 0, 0.5);
    border-bottom: 1.1em solid rgba(255, 62, 0, 0.3);
    border-left: 1.1em solid rgba(255, 62, 0, 0.8);
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
`;

const InfoBar = ({
    info,
}: InfoBarProps): ReactElement => {

    return info
        ? (
            <Wrapper type={info.type}>
                { info.value }
                { info.loading && (<Loader />) }
            </Wrapper>
        )
        : (<></>);
        
};

export default InfoBar;