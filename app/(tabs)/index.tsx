// import React, { useEffect, useState } from 'react';
// import { Redirect } from 'expo-router';
// import SplashScreen from './SplashScreen'; // Pastikan path ini sesuai dengan lokasi file SplashScreen.tsx

// export default function Index() {
//   const [showSplash, setShowSplash] = useState(true);

//   useEffect(() => {
//     // Mengatur Splash Screen untuk ditampilkan selama 3 detik
//     const timer = setTimeout(() => {
//       setShowSplash(false);
//     }, 3000);

//     return () => clearTimeout(timer); // Bersihkan timer jika komponen dilepas
//   }, []);

//   if (showSplash) {
//     return <SplashScreen />; // Tampilkan Splash Screen
//   }

//   // return <Redirect href="/(tabs)/LoginScreen" />; // Redirect ke LoginScreen setelah Splash Screen

//   return <Redirect href="/(tabs)/SunriseScreen" />;
// }

import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router'; // Import useRouter
import WelcomeSlider from './WelcomeSlider'; // Import WelcomeSlider
import SplashScreen from './SplashScreen';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter(); // Inisialisasi router

  useEffect(() => {
    // Mengatur Splash Screen untuk ditampilkan selama 3 detik
    const timer = setTimeout(() => {
      setShowSplash(false);
      // Navigasi ke halaman WelcomeSlider setelah splash screen
      router.push('/WelcomeSlider');
    }, 3000);

    return () => clearTimeout(timer); // Bersihkan timer jika komponen dilepas
  }, []);

  // if (showSplash) {
  //   return <SplashScreen />; // Tampilkan Splash Screen
  // }

  return null; // Tidak perlu render apa-apa setelah splash screen
}

