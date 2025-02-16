import React, { useEffect } from 'react';
import SecondaryCourses from '../Child Components/Secondary Page Components/SecondaryCourses';

export default function Clubs() {

    useEffect(() => {
        window.scrollTo({ top: 100, behavior: 'smooth' });
    }, []);

    return <SecondaryCourses />;
}
