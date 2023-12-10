import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [backColor, setBackColor] = useState("#090C08");

  const auth = getAuth();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./../assets/Background_Image.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.titleStyling}>Chat App</Text>

        <View style={styles.navBackground}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
            style={styles.textInput}
          />
          <Text style={styles.textStyling}>Choose Background Color:</Text>
          <View style={styles.colorContainer}>
            <TouchableOpacity
              style={[styles.coloredButton, styles.blackButton]}
              onPress={() => {
                setBackColor("#090C08");
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.coloredButton, styles.purpleButton]}
              onPress={() => {
                setBackColor("#474056");
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.coloredButton, styles.lightblueButton]}
              onPress={() => {
                setBackColor("#8A95A5");
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.coloredButton, styles.ligthgreenButton]}
              onPress={() => {
                setBackColor("#B9C6AE");
              }}
            ></TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              signInAnonymously(auth)
                .then((result) => {
                  // Signed in..
                  Alert.alert("Signin was successful.");
                  navigation.navigate("Chat", {
                    name: name,
                    backColor: backColor,
                    uid: result.user.uid,
                  });
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  Alert.alert(
                    "Errorcode: ",
                    errorCode + " Errormessage: ",
                    errorMessage
                  );
                });
            }}
            style={styles.chattingButton}
            accessibilityLabel="chat"
            accessibilityHint="By pushing the button you will be led to the chat screen."
            accessibilityRole="button"
          >
            <Text style={styles.chatButtonText}>Start Chatting</Text>
          </TouchableOpacity>
          {Platform.OS === "ios" ? (
            <KeyboardAvoidingView behavior="padding" />
          ) : null}
          {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  titleStyling: {
    flex: 1,
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    margin: "25%",
  },
  navBackground: {
    flex: 2,
    backgroundColor: "#FFFFFF",
    height: "44%",
    width: "88%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20%",
  },
  textInput: {
    width: "88%",
    borderWidth: 1,
    height: 50,
    marginTop: "5%",
    marginBottom: "5%",
    padding: 10,
    justifyContent: "center",
  },
  textStyling: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 50,
  },
  colorContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: "10%",
    columnGap: 20,
  },
  coloredButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  blackButton: { backgroundColor: "#090C08" },
  purpleButton: { backgroundColor: "#474056" },
  lightblueButton: { backgroundColor: "#8A95A5" },
  ligthgreenButton: { backgroundColor: "#B9C6AE" },
  chattingButton: {
    width: "88%",
    height: "20%",
    marginBottom: "10%",
  },
  chatButtonText: {
    flex: 1,
    paddingLeft: "30%",
    paddingTop: "10%",
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    backgroundColor: "#757083",
  },
});

export default Start;
