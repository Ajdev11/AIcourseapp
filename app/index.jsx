import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constant/Colors";
import { useRouter } from "expo-router";

export default function Index() {

const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        source={require("../assets/images/landing.png")}
        style={{
          width: "100%",
          height: 300,
          marginTop: 70,
        }}
      />

      <View
        style={{
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: "100%",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "outfit-bold",
          }}
        >
          Welcome to AICourseApp
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: Colors.WHITE,
            textAlign: "center",
            marginTop: 25,
            fontFamily: "outfit",
          }}
        >
          Learn a programming language, build a project, and get a job.
          effortlessly with our intuitive platform.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/signIn")}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>
            Get Started
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: Colors.PRIMARY,
              borderWidth: 1,
              borderColor: Colors.WHITE,
            },
          ]}
          onPress={() => router.push("/auth/signUp")}
        >
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
            Already have an account?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.PRIMARY,
    fontFamily: "outfit",
    textAlign: "center",
    fontSize: 18,
  },
});
