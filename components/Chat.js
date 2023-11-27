import { StyleSheet, View, Text, Button } from "react-native";

const Chat = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>WC to the Chat!</Text>
      <Button
        title="Go to Screen 2"
        onPress={() => navigation.navigate("Start")}
      />
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

export default Screen1;
