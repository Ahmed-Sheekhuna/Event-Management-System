import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import colors from "../config/colors";
import { auth } from "../config/firebase";
import TagItem from "../components/TagItem";
import Section from "../components/Section";
import firebase from "firebase";
import { useStates } from "../hooks/useStates";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

function HomeScreen({}) {
  const [webDev, setWebDev] = useState([]);
  const [appDev, setAppDev] = useState([]);
  const [programming, setProgramming] = useState([]);
  const [gaming, setGaming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const { eventTimings, setEventTimings } = useStates();

  const data = [
    {
      illustration:
        "https://leverageedu.com/blog/wp-content/uploads/2021/12/University-of-Warwick-Acceptance-Rate.png",
    },
    {
      illustration:
        "https://scholarship-positions.com/wp-content/uploads/2020/05/A-Star-University-of-Warwick-AWP-EngD-Partnership-International-Scholarship.jpg",
    },
    {
      illustration:
        "https://scholarship-positions.com/wp-content/uploads/2019/03/Syria-Bursaries-at-the-University-of-Warwick-in-the-UK-2019.jpg",
    },
    {
      illustration:
        "https://study-uk.britishcouncil.org/sites/default/files/0941_28290.jpg",
    },
  ];

  useEffect(() => {
    let temp1 = [];

    firebase
      .firestore()
      .collection("competitions")
      .onSnapshot((snapshot) => {
        if (snapshot.empty) return;
        temp1 = [];

        snapshot.forEach((item) => {
          temp1.push({ ...item.data(), id: item.id });
        });

        setList(temp1);
        setEventTimings(temp1);
        setLoading(false);
      });
  }, []);

  const _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.illustration }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginTop: 15 }}>
        <View>
          <TagItem
            title="Announcements & Promotions"
            icon={<FontAwesome5 name="bullhorn" size={20} color="white" />}
            bgColor="tomato"
            style={{ width: 330 }}
          />

          <Carousel
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 30}
            data={data}
            renderItem={_renderItem}
            hasParallaxImages={true}
            autoplay={true}
            loop={true}
          />
        </View>
        <View>
          <TagItem
            title="Competitons"
            bgColor="gold"
            icon={<Foundation name="trophy" size={24} color="white" />}
          />

          {loading ? (
            <View
              style={{
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : (
            <>
              <Section
                sectionTitle="App Development"
                flatListData={list.filter(
                  (item) => item.category === "App Dev"
                )}
              />
              <Section
                sectionTitle="Web Development"
                flatListData={list.filter(
                  (item) => item.category === "Web Dev"
                )}
              />
              <Section
                sectionTitle="Programming"
                flatListData={list.filter(
                  (item) => item.category === "Programming"
                )}
              />
              <Section
                sectionTitle="Gaming"
                flatListData={list.filter((item) => item.category === "Gaming")}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  item: {
    width: screenWidth - 20,
    height: screenHeight / 3,
    margin: 10,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});

export default HomeScreen;
