/**
 * Object used for displaying information in a UI component.
 */
export type InfoType = {
    type: 'error' | 'info';
    value: string;
    loading: boolean;
};

/**
 * Construct InfoType from data.
 */
export const makeInfoProps = (
    {
        type,
        value,
        loading,
    }: {
        type: 'error' | 'info',
        value: string, 
        loading: boolean,
    },
): InfoType => ({ value, type, loading });
