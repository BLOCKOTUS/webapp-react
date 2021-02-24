import type { ReactElement } from 'react';

const Button = ({
    label,
    onClick,
    disabled,
}: {
    label: string,
    onClick?: () => any,
    disabled?: boolean,
}): ReactElement => {
    return (<button type="button" disabled={disabled} onClick={onClick}>{label}</button>);
        
};

export default Button;
