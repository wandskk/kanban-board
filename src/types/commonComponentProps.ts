import React from 'react';

export interface CommonComponentProps<T = HTMLElement> extends React.HTMLAttributes<T> {
    children?: React.ReactNode;
    className?: string;
}
