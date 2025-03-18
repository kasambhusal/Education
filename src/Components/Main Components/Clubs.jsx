import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../Context/UserContext';
import SecondaryClubs from '../Child Components/Secondary Page Components/SecondaryClubs';
import PleaseLogin from '../Child Components/Others/PleaseLogin';

export default function Clubs() {
  const { token } = useUser();

  useEffect(() => {
    window.scrollTo({ top: 110, behavior: 'smooth' });
  }, []);

  if (!token) {
    return <PleaseLogin />
  }

  return <SecondaryClubs />;
}
