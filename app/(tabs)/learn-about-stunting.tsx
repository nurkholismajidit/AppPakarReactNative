import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';

const LearnAboutStunting: React.FC = () => {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/2965/2965493.png',
        }}
        style={styles.image}
      />
      <Text style={styles.title}>Memahami Stunting</Text>
      <Text style={styles.description}>
        Stunting adalah masalah serius akibat kekurangan gizi kronis yang dapat
        memengaruhi pertumbuhan fisik dan perkembangan kognitif anak.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Apa Penyebab Stunting?</Text>
        <Text style={styles.sectionContent}>
          - Nutrisi ibu yang buruk selama kehamilan.{'\n'}
          - Kurangnya asupan gizi penting.{'\n'}
          - Tidak adanya akses ke air bersih dan layanan kesehatan.{'\n'}
          - Kurangnya perhatian pada perawatan awal anak.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bagaimana Mencegah Stunting?</Text>
        <Text style={styles.sectionContent}>
          - Meningkatkan pemberian ASI eksklusif.{'\n'}
          - Menyediakan akses ke makanan bergizi seimbang.{'\n'}
          - Edukasi tentang kebersihan dan pentingnya nutrisi.{'\n'}
          - Perbaikan fasilitas sanitasi dan kesehatan.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/')}
      >
        <Text style={styles.buttonText}>Kembali ke Beranda</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default LearnAboutStunting;
