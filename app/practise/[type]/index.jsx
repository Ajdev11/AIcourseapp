import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PraticeOption } from "../../../constant/Option";
import Colors from "../../../constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { db } from "./../../../config/firebaseConfig";
import { collection, orderBy, query, where } from "firebase/firestore";
import { UserDetailContext } from "./../../../context/UserDetailsContext";
import { getDocs, doc } from "firebase/firestore";
import CourseListGrid from "../../../components/PracticeScreen/CourseListGrid";

export default function PracticeTypeHome() {
  const { type } = useLocalSearchParams();
  const router = useRouter();
  const option = PraticeOption.find((item) => item.name === type);
  console.log(option);
 const { userDetail, setUserDetail} = useContext(UserDetailContext);

  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);



 useEffect(() => {
    userDetail && GetCourseList();
    }, [userDetail]);


  const GetCourseList= async()=>{
    setLoading(true);
    setCourseList([]);
    try{
        const q = query(collection(db, 'Courses'), 
    where('createdBy', '==', userDetail?.email),
   orderBy('createdOn', 'desc')
);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
        setCourseList(prev=>[...prev, doc.data()]);
    });
    setLoading(false);
  }catch(e){
    console.log(e);
    setLoading(false);
    }
}

  return (
    <View>
      <Image source={option?.image} style={{ width: "100%", height: 200 }} />
      <View
        style={{
          padding: 40,
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={{
              backgroundColor: Colors.WHITE,
              borderRadius: 50,
              padding: 5,
            }}
          />
        </Pressable>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 25,
            color: Colors.WHITE,
          }}
        >
          {type}
        </Text>
      </View>
      {loading && <ActivityIndicator 
      size="large" color={Colors.PRIMARY} style={{
        marginTop: 20
      }} />}


      <CourseListGrid courseList={courseList}
      option={option}
      
      
      />
    </View>
  );
}
