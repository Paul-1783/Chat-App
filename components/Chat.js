import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const Chat = ({ route, navigation }) => {
  const [backgroundColor, setBackgroundColor] = useState("");

  const { name, backColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
    setBackgroundColor(backColor);
  }, []);

  return (
    <View style={styles.container} backgroundColor={backgroundColor}>
      <Text>WC to the Chat!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chat;
