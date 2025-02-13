import React, { useEffect } from 'react';
import { useUser } from '../Context/UserContext';
import PleaseLogin from '../Child Components/Others/PleaseLogin';
import SecondaryCourses from '../Child Components/Secondary Page Components/SecondaryCourses';

export default function Clubs() {
    const { token } = useUser();

    useEffect(() => {
        window.scrollTo({ top: 100, behavior: 'smooth' });
    }, []);

    if (!token) {
        return <PleaseLogin />
    }

    return <SecondaryCourses />;
}
