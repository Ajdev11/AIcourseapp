import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UserDetailContext } from "./../../context/UserDetailsContext";
import { useContext } from "react";
// Correct import from 'react-native' instead of 'react-native-web'
import { ActivityIndicator } from 'react-native';



export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  const [loaading, setLoading] = useState(false);






  const onSignInClick = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        console.log(user);
        await getUserDetails();
        setLoading(false);
        router.replace('/(tabs)/home')
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        // ToastAndroid.show('Incorrect email or password', ToastAndroid.BOTTOM);
        // i need you to set a toast message here that works for bith ios and android devices
      });
  };

  const getUserDetails = async () => {
    //get user details from db
    //set user details to context
    const result = await getDoc(doc(db, "users", email));
    console.log(result.data());
    setUserDetail(result.data());
  };

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        paddingTop: 100,
        backgroundColor: Colors.WHITE,
        padding: 25,
      }}
    >
      <Image
        source={require("../../assets/images/icon.png")}
        style={{
          width: 180,
          height: 180,
        }}
      />
      <Text
        style={{
          fontSize: 30,
          fontFamily: "outfit-bold",
        }}
      >
        Welcome Back
      </Text>
      <TextInput
        placeholder="Email"
        onChangeText={(value) => setEmail(value)}
        placeholderTextColor="gray"
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
        placeholderTextColor="gray"
        secureTextEntry={true}
        style={styles.textInput}
      />

      <TouchableOpacity
        onPress={onSignInClick}
        disabled={loaading}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          width: "100%",
          marginTop: 25,
          borderRadius: 10,
        }}
      >
        {
          !loaading ? 
<Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontSize: 20,
            fontFamily: "outfit",
          }}
        >
          Sign In</Text> :
          <ActivityIndicator size={'large'} color={Colors.WHITE} /> 
           }


      </TouchableOpacity>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          marginTop: 25,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
          }}
        >
          Don't have an account?
        </Text>
        <Pressable onPress={() => router.push("/auth/signUp")}>
          <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-bold" }}>
            Create New Here
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    padding: 15,
    width: "100%",
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
  },
});
