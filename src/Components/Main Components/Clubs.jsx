import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../Context/UserContext';
import SecondaryClubs from '../Child Components/Secondary Page Components/SecondaryClubs';
import PleaseLogin from '../Child Components/Others/PleaseLogin';

export default function Clubs() {
  const { token } = useUser();

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

  if (!token) {
    return <PleaseLogin what="clubs" />
  }

  return <SecondaryClubs />;
}
