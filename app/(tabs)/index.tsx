import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import SplashScreen from './SplashScreen'; // Pastikan path ini sesuai dengan lokasi file SplashScreen.tsx

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Mengatur Splash Screen untuk ditampilkan selama 3 detik
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer); // Bersihkan timer jika komponen dilepas
  }, []);

  if (showSplash) {
    return <SplashScreen />; // Tampilkan Splash Screen
  }

  return <Redirect href="/(tabs)/LoginScreen" />; // Redirect ke LoginScreen setelah Splash Screen
}
