import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment-timezone'; // Import moment dan moment-timezone
import LottieView from 'lottie-react-native'; // Import LottieView

// Definisikan tipe data untuk SunriseSunset
interface SunriseSunset {
  sunrise: string;
  sunset: string;
  solar_noon: string;
  day_length: number;
  civil_twilight_begin: string;
  civil_twilight_end: string;
  nautical_twilight_begin: string;
  nautical_twilight_end: string;
  astronomical_twilight_begin: string;
  astronomical_twilight_end: string;
}

const SunriseScreen = () => {
  const [sunriseSunset, setSunriseSunset] = useState<SunriseSunset | null>(null);
  const [loading, setLoading] = useState(false);

  // Fungsi untuk mengakses API Sunrise/Sunset dengan fetch
  const fetchSunriseSunset = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.sunrise-sunset.org/json?lat=-6.175110&lng=106.865036&formatted=0');
      const data = await response.json();
      setSunriseSunset(data.results);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSunriseSunset(); // Fetch data saat aplikasi pertama kali dibuka
  }, []);

  // Fungsi untuk memformat waktu menggunakan moment
  const formatTime = (time: string) => {
    return moment(time).tz('Asia/Jakarta').format('hh:mm A'); // Ubah waktu ke zona waktu lokal (misal Jakarta)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sunrise & Sunset Times</Text>

      {/* Menampilkan animasi Lottie terus-menerus di halaman */}
      <LottieView
        source={require('../(tabs)/asset/sunset.json')} // Gantilah dengan path animasi JSON Anda
        autoPlay
        loop
        style={styles.lottie}
      />

      {/* Menampilkan hasil jika data sudah tersedia */}
      {loading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : sunriseSunset ? (
        <ScrollView style={styles.resultsContainer}>
          <View style={styles.card}>
            <Text style={styles.text}>Sunrise: {formatTime(sunriseSunset.sunrise)}</Text>
            <Text style={styles.text}>Sunset: {formatTime(sunriseSunset.sunset)}</Text>
            <Text style={styles.text}>Solar Noon: {formatTime(sunriseSunset.solar_noon)}</Text>
            <Text style={styles.text}>
              Day Length: {Math.floor(sunriseSunset.day_length / 3600)} hours {Math.floor((sunriseSunset.day_length % 3600) / 60)} minutes
            </Text>
            <Text style={styles.text}>Civil Twilight Begins: {formatTime(sunriseSunset.civil_twilight_begin)}</Text>
            <Text style={styles.text}>Civil Twilight Ends: {formatTime(sunriseSunset.civil_twilight_end)}</Text>
            <Text style={styles.text}>Nautical Twilight Begins: {formatTime(sunriseSunset.nautical_twilight_begin)}</Text>
            <Text style={styles.text}>Nautical Twilight Ends: {formatTime(sunriseSunset.nautical_twilight_end)}</Text>
            <Text style={styles.text}>Astronomical Twilight Begins: {formatTime(sunriseSunset.astronomical_twilight_begin)}</Text>
            <Text style={styles.text}>Astronomical Twilight Ends: {formatTime(sunriseSunset.astronomical_twilight_end)}</Text>
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.text}>No data available</Text>
      )}

      {/* Tombol Refresh untuk mengambil data baru */}
      <TouchableOpacity style={styles.button} onPress={() => { fetchSunriseSunset(); }}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultsContainer: {
    width: '100%',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lottie: {
    width: 150, // Ukuran animasi
    height: 150, // Ukuran animasi
    marginBottom: 20,
  },
});

export default SunriseScreen;
