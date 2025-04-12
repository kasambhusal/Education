import React, { useEffect } from 'react';
import SecondaryCourses from '../Child Components/Secondary Page Components/SecondaryCourses';

export default function Courses() {

    useEffect(() => {
        if (window.innerWidth > 700) {
            // If the screen width is less than 700px, scroll 120px from the top
            window.scrollTo({ top: 150, behavior: 'smooth' });
        } else {
            // If the screen width is greater than 150px, you can specify some other behavior
            // For example, scroll to a different position or trigger a different action
            window.scrollTo({ top: 120, behavior: 'smooth' });
        }

    }, []);

    return <SecondaryCourses />;
}
