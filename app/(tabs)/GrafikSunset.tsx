import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment-timezone';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router'; // Menggunakan expo-router untuk navigasi

const screenWidth = Dimensions.get('window').width;

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

interface Location {
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  address: {
    [key: string]: string;
  };
}

const GrafikSunset = () => {
    const router = useRouter(); // Menggunakan router dari expo-router
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [darkTheme, setDarkTheme] = useState(false);

  const fetchLocations = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'MyApp/1.0 (myemail@example.com)',
          },
        }
      );      
      const data: Location[] = await response.json();
      setLocations(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
      Alert.alert('Error', 'Gagal mengambil lokasi.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSunriseSunsetData = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const results: { month: string; sunrise: number; sunset: number }[] = [];
      for (let month = 1; month <= 12; month++) {
        const date = `${2023}-${String(month).padStart(2, '0')}-15`;
        const response = await fetch(
          `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=${date}&formatted=0`
        );
        const data = await response.json();
        if (data && data.results) {
          results.push({
            month: moment(date).format('MMM'),
            sunrise:
              moment(data.results.sunrise).hour() +
              moment(data.results.sunrise).minute() / 60,
            sunset:
              moment(data.results.sunset).hour() +
              moment(data.results.sunset).minute() / 60,
          });
        }
      }

      const sunriseTimes = results.map((item) => item.sunrise);
      const sunsetTimes = results.map((item) => item.sunset);

      setChartData({
        labels: results.map((item) => item.month),
        datasets: [
          {
            data: sunriseTimes,
            color: () => `rgba(255, 99, 132, 1)`,
            strokeWidth: 2,
          },
          {
            data: sunsetTimes,
            color: () => `rgba(54, 162, 235, 1)`,
            strokeWidth: 2,
          },
        ],
        legend: ['Sunrise', 'Sunset'],
      });
    } catch (error) {
      console.error('Error fetching sunrise-sunset data', error);
      Alert.alert('Error', 'Gagal mengambil data sunrise-sunset.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: darkTheme ? '#1a1a1a' : '#ffffff' }]}>
        {/* Tombol Kembali */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/(tabs)/SunriseScreen')}
      >
        <Text style={styles.backButtonText}>Kembali</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Grafik Waktu Matahari Terbit dan Terbenam Sepanjang Tahun</Text>

      <TextInput
        style={[styles.input, { borderColor: darkTheme ? '#555' : '#ccc' }]}
        placeholder="Masukkan lokasi..."
        placeholderTextColor={darkTheme ? '#aaa' : '#555'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: darkTheme ? '#007BFF' : '#0056b3' }]}
        onPress={() => fetchLocations(searchQuery)}
      >
        <Text style={styles.buttonText}>Cari Lokasi</Text>
      </TouchableOpacity>

      <ScrollView style={styles.resultsContainer}>
        {locations.map((location, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: darkTheme ? '#333' : '#fff' }]}
            onPress={() => fetchSunriseSunsetData(parseFloat(location.lat), parseFloat(location.lon))}
          >
            <Text style={[styles.text, { color: darkTheme ? '#fff' : '#000' }]}>
              {location.display_name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {chartData && (
        <LineChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: darkTheme ? '#333' : '#ffffff',
            backgroundGradientTo: darkTheme ? '#444' : '#f3f3f3',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default GrafikSunset;

// Lengkap Visualisasi Grafiknya 
// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
// } from 'react-native';
// import moment from 'moment-timezone';
// import { LineChart } from 'react-native-chart-kit';
// import { Dimensions } from 'react-native';

// const screenWidth = Dimensions.get('window').width;

// const SunriseScreen = () => {
//   const [chartData, setChartData] = useState<any>(null);
//   const [selectedPoint, setSelectedPoint] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [locations, setLocations] = useState<any[]>([]);

//   const fetchLocations = async (query: string) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1`,
//         {
//           headers: { 'User-Agent': 'MyApp/1.0 (myemail@example.com)' },
//         }
//       );
//       const data = await response.json();
//       setLocations(data);
//     } catch (error) {
//       console.error('Error fetching locations:', error);
//       Alert.alert('Error', 'Gagal mengambil lokasi.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSunriseSunsetData = async (lat: number, lon: number) => {
//     setLoading(true);
//     try {
//       const results: any[] = [];

//       for (let month = 1; month <= 12; month++) {
//         const date = `${2023}-${String(month).padStart(2, '0')}-15`;
//         const response = await fetch(
//           `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=${date}&formatted=0`
//         );
//         const data = await response.json();
//         if (data && data.results) {
//           const parseTime = (time: string) => {
//             const m = moment(time);
//             return m.hour() + m.minute() / 60;
//           };

//           results.push({
//             month: moment(date).format('MMM'),
//             sunrise: parseTime(data.results.sunrise),
//             sunset: parseTime(data.results.sunset),
//             solar_noon: parseTime(data.results.solar_noon),
//             day_length: data.results.day_length / 3600,
//             civil_twilight_begin: parseTime(data.results.civil_twilight_begin),
//             civil_twilight_end: parseTime(data.results.civil_twilight_end),
//           });
//         }
//       }

//       const generateDataset = (key: string, color: string) => ({
//         data: results.map((item) => item[key]),
//         color: () => color,
//         strokeWidth: 2,
//       });

//       setChartData({
//         labels: results.map((item) => item.month),
//         datasets: [
//           generateDataset('sunrise', 'rgba(255, 99, 132, 1)'),
//           generateDataset('sunset', 'rgba(54, 162, 235, 1)'),
//           generateDataset('solar_noon', 'rgba(75, 192, 192, 1)'),
//           generateDataset('day_length', 'rgba(255, 206, 86, 1)'),
//           generateDataset('civil_twilight_begin', 'rgba(153, 102, 255, 1)'),
//           generateDataset('civil_twilight_end', 'rgba(255, 159, 64, 1)'),
//         ],
//         legend: [
//           'Sunrise',
//           'Sunset',
//           'Solar Noon',
//           'Day Length (hrs)',
//           'Civil Twilight Begin',
//           'Civil Twilight End',
//         ],
//         rawData: results,
//       });
//     } catch (error) {
//       console.error('Error fetching sunrise-sunset data', error);
//       Alert.alert('Error', 'Gagal mengambil data sunrise-sunset.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sunrise & Sunset Times</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Masukkan lokasi..."
//         placeholderTextColor="#555"
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />

//       <TouchableOpacity style={styles.button} onPress={() => fetchLocations(searchQuery)}>
//         <Text style={styles.buttonText}>Cari Lokasi</Text>
//       </TouchableOpacity>

//       <ScrollView style={styles.resultsContainer}>
//         {locations.map((location, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.card}
//             onPress={() =>
//               fetchSunriseSunsetData(parseFloat(location.lat), parseFloat(location.lon))
//             }
//           >
//             <Text style={styles.text}>{location.display_name}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {chartData && (
//         <>
//           <LineChart
//             data={chartData}
//             width={screenWidth - 40}
//             height={320}
//             chartConfig={{
//               backgroundColor: '#ffffff',
//               backgroundGradientFrom: '#ffffff',
//               backgroundGradientTo: '#f3f3f3',
//               color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//               labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             }}
//             bezier
//             style={{ marginVertical: 8, borderRadius: 16 }}
//             onDataPointClick={(data) => {
//               const index = data.index;
//               const pointData = chartData.rawData[index];
//               setSelectedPoint(pointData);
//             }}
//           />

//           {selectedPoint && (
//             <View style={styles.detailContainer}>
//               <View style={styles.detailBox}>
//                 <Text style={styles.detailText}>Month</Text>
//                 <Text style={styles.detailValue}>{selectedPoint.month}</Text>
//               </View>
//               <View style={styles.detailBox}>
//                 <Text style={styles.detailText}>Sunrise</Text>
//                 <Text style={styles.detailValue}>{selectedPoint.sunrise.toFixed(2)} hrs</Text>
//               </View>
//               <View style={styles.detailBox}>
//                 <Text style={styles.detailText}>Sunset</Text>
//                 <Text style={styles.detailValue}>{selectedPoint.sunset.toFixed(2)} hrs</Text>
//               </View>
//               <View style={styles.detailBox}>
//                 <Text style={styles.detailText}>Solar Noon</Text>
//                 <Text style={styles.detailValue}>{selectedPoint.solar_noon.toFixed(2)} hrs</Text>
//               </View>
//               <View style={styles.detailBox}>
//                 <Text style={styles.detailText}>Day Length</Text>
//                 <Text style={styles.detailValue}>{selectedPoint.day_length.toFixed(2)} hrs</Text>
//               </View>
//               <View style={styles.detailBox}>
//                 <Text style={styles.detailText}>Civil Twilight Begin</Text>
//                 <Text style={styles.detailValue}>
//                   {selectedPoint.civil_twilight_begin.toFixed(2)} hrs
//                 </Text>
//               </View>
//               <View style={styles.detailBox}>
//                 <Text style={styles.detailText}>Civil Twilight End</Text>
//                 <Text style={styles.detailValue}>
//                   {selectedPoint.civil_twilight_end.toFixed(2)} hrs
//                 </Text>
//               </View>
//             </View>
//           )}
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     marginBottom: 16,
//     width: '80%',
//   },
//   button: {
//     backgroundColor: '#0056b3',
//     paddingVertical: 10,
//     borderRadius: 8,
//     marginBottom: 16,
//     width: '80%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   resultsContainer: {
//     width: '100%',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//     elevation: 2,
//   },
//   text: {
//     fontSize: 16,
//   },
//   detailContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginTop: 16,
//   },
//   detailBox: {
//     width: '48%',
//     backgroundColor: '#f8f9fa',
//     padding: 8,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   detailText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   detailValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });

// export default SunriseScreen;