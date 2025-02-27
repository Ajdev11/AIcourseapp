import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../../config/firebaseConfig";
import Colors from "../../constant/Colors";
import { UserDetailContext } from './../../context/UserDetailsContext';
import { useContext } from "react";

export default function SignUp() {

    const router = useRouter();
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);


    const CreateNewAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(async(resp)=>{
          const user=resp.user;
          console.log(user);
          await SaveUser(user);
          //save user to DB
        })
        .catch((error)=>{
          console.log(error.message);
        })
        
      
    }

    const SaveUser= async(user)=>{
      const data = {
        name: fullName,
        email: email,
        member: false,
        uid: user?.uid
      };
      await setDoc(doc(db, "users", email), data)

      setUserDetail(data);

      //navigate to a new screen
    }


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
          Create New Account
        </Text>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="gray"
          onChangeText={(value) => setFullName(value)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          onChangeText={(value) => setEmail(value)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
          style={styles.textInput}
        />

        <TouchableOpacity
          onPress={CreateNewAccount}
          style={{
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            width: "100%",
            marginTop: 25,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontSize: 20,
              fontFamily: "outfit",
            }}
          >
            Create Account
          </Text>
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
            Already have an account?
          </Text>
          <Pressable onPress={() => router.push("/auth/signIn")}>
            <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-bold" }}>
              Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    );
    }

    const styles = StyleSheet.create({
        textInput: {
          borderWidth: 1,
          padding:15,
          width: "100%",
          fontSize: 18,
          marginTop: 20,
          borderRadius: 8,
        },
      });