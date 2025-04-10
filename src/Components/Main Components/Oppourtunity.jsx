import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../Context/UserContext';
import SecondaryOpportunities from '../Child Components/Secondary Page Components/SecondaryOpportunities';
import { useNavigate } from 'react-router-dom';
import PleaseLogin from '../Child Components/Others/PleaseLogin';

export default function Oppourtunity() {
    const { token } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 110, behavior: 'smooth' });
    }, []);

    if (!token) {
        return (
            <PleaseLogin />
        );
    }

    return <SecondaryOpportunities />;
}
