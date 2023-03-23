import React from 'react';
// import { FragmentResult } from '../Contexts/LevelContext';

interface FragmentCardProps {
    onClick: () => void;
    // color: FragmentResult['result'];
    color: 'none' | 'right' | 'wrong';
    children: React.ReactNode;
}

export const FragmentCard: React.FC<FragmentCardProps> = ({ children, onClick, color }) => {
    const classColor = (): string => {
        if (color === 'none') return '';
        if (color === 'right') return 'bg-green-200';
        return 'bg-red-200';
    };
    return (
        <div className="relative">
            <div className="absolute inset-0 z-10 cursor-pointer" onClick={ onClick }></div>
            <div className={ `mt-8 rounded-lg p-6 shadow-md transition-all duration-300 ${classColor()}` }>{ children }</div>
        </div>
    );
};
