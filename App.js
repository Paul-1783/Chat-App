import { StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";

import Chat from "./components/Chat";
import Start from "./components/Start";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

const Stack = createNativeStackNavigator();

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyC8XZInXXQ6mPjt32Bkce4HEAJYEBf3670",
    authDomain: "chat-app-production-410d9.firebaseapp.com",
    projectId: "chat-app-production-410d9",
    storageBucket: "chat-app-production-410d9.appspot.com",
    messagingSenderId: "361029476373",
    appId: "1:361029476373:web:cb051d0549e35e7c85ee1c",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              db={db}
              isConnected={connectionStatus.isConnected}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Start" component={Start} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
