// components/ErrorComponent.tsx
import React from 'react';

interface ErrorComponentProps {
    message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
    return (
        <div className="text-red-600 text-center mt-20">
            <h2>Error</h2>
            <p>{message}</p>
        </div>
    );
};

export default ErrorComponent;