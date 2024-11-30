// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { useRouter } from 'expo-router';

// interface User {
//   username: string;
//   email: string;
//   role: string;
// }

// const HomeScreen: React.FC = () => {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [isExpert, setIsExpert] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const fetchedUser = await getUserData();
//       setUser(fetchedUser);

//       if (fetchedUser?.role === 'EXPERT') {
//         setIsExpert(true);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const getUserData = async () => {
//     return new Promise<User>((resolve) => {
//       setTimeout(() => {
//         resolve({
//           username: 'Di Aplikasi Pakar Stunting Anak',
//           email: 'majid@gmail.com',
//           role: 'EXPERT', // Example role
//         });
//       }, 1000);
//     });
//   };

//   const handleLogout = () => {
//     Alert.alert('Logged Out', 'You have been logged out.');
//     router.push('/LoginScreen');
//   };

//   if (!user) {
//     return (
//       <View style={styles.center}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Selamat Datang, {user.username}!</Text>
//       <Text style={styles.subtitle}>Role: {user.role}</Text>

//       {isExpert ? (
//         <View style={styles.expertContainer}>
//           <Text style={styles.expertText}>
//             You are a Stunting Expert. Here are your tools to help fight stunting.
//           </Text>
//           <TouchableOpacity style={styles.button} onPress={() => router.push('/stunting-tools')}>
//             <Text style={styles.buttonText}>Go to Stunting Tools</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View style={styles.userContainer}>
//           <Text style={styles.userText}>
//             You are not a Stunting Expert. You can learn more about stunting prevention here.
//           </Text>
//           <TouchableOpacity style={styles.button} onPress={() => router.push('/learn-about-stunting')}>
//             <Text style={styles.buttonText}>Learn More</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#F5F5F5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 24,
//   },
//   expertContainer: {
//     marginBottom: 20,
//   },
//   expertText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#007BFF',
//     marginBottom: 16,
//   },
//   userContainer: {
//     marginBottom: 20,
//   },
//   userText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FF6347',
//     marginBottom: 16,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 16,
//   },
//   logoutButton: {
//     backgroundColor: '#FF6347',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   logoutText: {
//     color: '#FFF',
//     fontSize: 16,
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//   },
// });

// export default HomeScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from 'react-native-vector-icons';
import Animated, { withTiming, Easing } from 'react-native-reanimated';
import { useSharedValue, withSpring } from 'react-native-reanimated';

interface User {
  username: string;
  email: string;
  role: string;
}

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isExpert, setIsExpert] = useState<boolean>(false);

  // Using useSharedValue for opacity
  const opacity = useSharedValue(0); // Initial opacity set to 0
  
  // Flag to track if the component is mounted
  const isMounted = useSharedValue(true);

  useEffect(() => {
    // Set the mounted flag to true when the component is mounted
    isMounted.value = true;

    const fetchUserData = async () => {
      try {
        const fetchedUser = await getUserData();
        
        // Only update the state if the component is still mounted
        if (isMounted.value) {
          setUser(fetchedUser);
          if (fetchedUser?.role === 'EXPERT') {
            setIsExpert(true);
          }
        }

        // Fade-in effect using withTiming
        opacity.value = withTiming(1, { duration: 800, easing: Easing.ease });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted.value = false;
    };
  }, []);

  const getUserData = async () => {
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        resolve({
          username: 'Di Aplikasi Pakar Stunting Anak',
          email: 'majid@gmail.com',
          role: 'EXPERT',
        });
      }, 1000);
    });
  };

  const handleLogout = () => {
    Alert.alert('Logged Out', 'You have been logged out.');
    router.push('/LoginScreen');
  };

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: opacity.value }]}>
      <Text style={styles.title}>Selamat Datang, {user.username}!</Text>
      <Text style={styles.subtitle}>Role: {user.role}</Text>

      {isExpert ? (
        <View style={styles.expertContainer}>
          <Text style={styles.expertText}>
            You are a Stunting Expert. Here are your tools to help fight stunting.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/stunting-tools')}>
            <Ionicons name="ios-medical" size={28} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Go to Stunting Tools</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.userContainer}>
          <Text style={styles.userText}>
            You are not a Stunting Expert. You can learn more about stunting prevention here.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/learn-about-stunting')}>
            <Ionicons name="ios-information-circle-outline" size={28} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="ios-log-out" size={28} color="white" style={styles.icon} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#004d40',
    marginBottom: 20,
  },
  expertContainer: {
    marginBottom: 30,
  },
  expertText: {
    fontSize: 18,
    color: '#00796b',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  userContainer: {
    marginBottom: 30,
  },
  userText: {
    fontSize: 18,
    color: '#d32f2f',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00796b',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  icon: {
    marginRight: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
  },
  loadingText: {
    fontSize: 18,
    color: '#00796b',
  },
});

export default HomeScreen;



