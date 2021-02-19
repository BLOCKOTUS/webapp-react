import type { ReactChild, ReactElement } from 'react';

const View = ({
    children,
    title,
}: {
    children: Array<ReactChild> | ReactChild,
    title?: string,
}): ReactElement => {
    return (
        <div>
            { title ? (<h2>{ title }</h2>) : null }
            { children }
        </div>
    );
        
};

export default View;
