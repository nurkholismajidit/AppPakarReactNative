import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

const SplashScreen: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/SunriseScreen');
    }, 3000); // Splash screen akan ditampilkan selama 3 detik

    return () => clearTimeout(timer); // Membersihkan timer saat komponen tidak digunakan
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/splash-image.png' }} // Ganti dengan URL gambar Anda
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Stunting Anak</Text>
      <Text style={styles.subtitle}>
        "Bersama, kita cegah stunting demi masa depan yang lebih cerah."
      </Text>
      <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    lineHeight: 24,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
