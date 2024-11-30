// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
// import { useRouter } from 'expo-router';

// const tools = [
//   { id: '1', title: 'Panduan Gizi', icon: '🍎' },
//   { id: '2', title: 'Grafik Pemantauan Pertumbuhan', icon: '📈' },
//   { id: '3', title: 'Sumber Informasi Perkembangan Anak', icon: '📚' },
//   { id: '4', title: 'Materi Pelatihan Pencegahan', icon: '🎓' },
// ];

// const StuntingTools: React.FC = () => {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🛠 Alat Pencegahan Stunting</Text>
//       <Text style={styles.description}>
//         Jelajahi alat dan sumber daya untuk menangani masalah stunting secara efektif.
//       </Text>

//       <FlatList
//         data={tools}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.toolCard}>
//             <Text style={styles.toolIcon}>{item.icon}</Text>
//             <Text style={styles.toolTitle}>{item.title}</Text>
//           </View>
//         )}
//         contentContainerStyle={styles.toolList}
//       />

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push('/HomeScreen')}
//       >
//         <Text style={styles.buttonText}>Kembali ke Beranda</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     padding: 16,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: 16,
//   },
//   description: {
//     fontSize: 16,
//     color: '#555',
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   toolList: {
//     alignItems: 'center',
//   },
//   toolCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 16,
//     marginBottom: 12,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//     width: '90%',
//   },
//   toolIcon: {
//     fontSize: 24,
//     marginRight: 16,
//   },
//   toolTitle: {
//     fontSize: 18,
//     color: '#333',
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: '#007BFF',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 16,
//   },
// });

// export default StuntingTools;
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const tools = [
  { id: '1', title: 'Panduan Gizi', icon: '🍎' },
  { id: '2', title: 'Grafik Pemantauan Pertumbuhan', icon: '📈' },
  { id: '3', title: 'Sumber Informasi Perkembangan Anak', icon: '📚' },
  { id: '4', title: 'Materi Pelatihan Pencegahan', icon: '🎓' },
];

const StuntingTools: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛠 Alat Pencegahan Stunting</Text>
      <Text style={styles.description}>
        Jelajahi alat dan sumber daya untuk menangani masalah stunting secara efektif.
      </Text>

      <FlatList
        data={tools}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.toolCard}
            onPress={() => router.push(`/tools/${item.id}`)}  // Route to the tool detail page
          >
            <View style={styles.iconContainer}>
              <Text style={styles.toolIcon}>{item.icon}</Text>
            </View>
            <Text style={styles.toolTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.toolList}
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/HomeScreen')}>
        <Text style={styles.buttonText}>Kembali ke Beranda</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f6',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3a3a3a',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  toolList: {
    paddingBottom: 20,
  },
  toolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    marginBottom: 18,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#aaa',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
  },
  iconContainer: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 50,
    marginRight: 18,
  },
  toolIcon: {
    fontSize: 28,
    color: '#fff',
  },
  toolTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StuntingTools;
