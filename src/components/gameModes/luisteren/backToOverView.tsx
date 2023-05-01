import Link from 'next/link';
import React from 'react';

interface BackToOverViewProps {
    levelName: string;
}

const BackToOverView: React.FC<BackToOverViewProps> = ({ levelName }) => {
    return (
        <Link
            href={ `/modeSelect/${levelName}` }
            className="rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
        >
            <h3 className="text-center text-xl font-bold">Terug naar overzicht</h3>
        </Link>
    );
};

export default BackToOverView;
