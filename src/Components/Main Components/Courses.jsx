import React, { useEffect } from 'react';
import SecondaryCourses from '../Child Components/Secondary Page Components/SecondaryCourses';

export default function Courses() {

    useEffect(() => {
        window.scrollTo({ top: 110, behavior: 'smooth' });
    }, []);

    return <SecondaryCourses />;
}
