import React from 'react';

interface Props {
    code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({code}) => (
    <div>
        <h1>Verification Code : #{code}</h1>
        <p>Please Input this code white this link <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Verify</a></p>
    </div>
);