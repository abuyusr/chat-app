import { Alert, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import * as Speech from "expo-speech";
import { getStorage } from "firebase/storage"; 

const Stack = createNativeStackNavigator();

// Firebase configuration object with API keys and project information
const firebaseConfig = {
  apiKey: "AIzaSyAW2YTG28gLkh_2_tpLTdiE3_sJVyPAaU0",
  authDomain: "chatapp-c6753.firebaseapp.com",
  projectId: "chatapp-c6753",
  storageBucket: "chatapp-c6753.appspot.com",
  messagingSenderId: "761041089695",
  appId: "1:761041089695:web:1ec2b7a797cfd54e1e5eaa"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

const App = () => {
  // Get the network connection status using useNetInfo hook
  const connectionStatus = useNetInfo();

  useEffect(() => {
    // Check the connection status and perform actions accordingly
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db); // Disable Firestore network access
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db); // Enable Firestore network access
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat
            isConnected={connectionStatus.isConnected}
            db={db}
            storage={storage}
            {...props}
          />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;