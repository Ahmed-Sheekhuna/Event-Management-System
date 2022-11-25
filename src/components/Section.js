import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import TagItem from "./TagItem";
import colors from "../config/colors";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Section({ sectionTitle = "Section", flatListData }) {
  // flatListData = [
  //   {
  //     startTime: "10:10am",
  //     endTime: "5:00pm",
  //     imageURL: "https://i.imgur.com/UYiroysl.jpg",
  //     title: "App Development",
  //     headName: "Bilal",
  //     totalParticipants: 150,
  //     fee: 2500,
  //     venue: "FAST LHR",
  //   },
  //   {
  //     startTime: "10:10",
  //     endTime: "5:00",
  //     imageURL: "https://i.imgur.com/UYiroysl.jpg",
  //     title: "App Development",
  //     headName: "Bilal",
  //     totalParticipants: 150,
  //     fee: 2500,
  //     venue: "FAST LHR",
  //   },
  //   {
  //     startTime: "10:10",
  //     endTime: "5:00",
  //     imageURL: "https://i.imgur.com/UYiroysl.jpg",
  //     title: "App Development",
  //     headName: "Bilal",
  //     totalParticipants: 150,
  //     fee: 2500,
  //     venue: "FAST LHR",
  //   },
  // ];

  const navigation = useNavigation();

  const RenderItem = ({ data }) => {
    const onPress = () => {
      navigation.navigate("CompetitionDetails", {
        data: data,
      });
    };

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View
          style={{
            height: 200,
            width: 200,
            backgroundColor: colors.white,
            margin: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderRadius: 20,
          }}
        >
          <Image
            source={{ uri: data.imageURL }}
            style={{
              height: 110,
              width: "100%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
          <View style={{ padding: 10 }}>
            <TagItem
              title={data.startTime + " - " + data.endTime}
              bgColor="grey"
              fontSize={14}
              style={{ height: 20, margin: 0 }}
              icon={<EvilIcons name="clock" size={16} color={colors.white} />}
            />

            <View style={{ marginLeft: 10, marginTop: 7 }}>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {data.title}
              </Text>
              <Text
                style={{ fontSize: 14, color: colors.lightgrey, marginTop: 3 }}
              >
                {"Paticipants: " + data.totalParticipants}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  let index = 0;
  return (
    <View
      style={{
        height: 300,
        padding: 20,
        // backgroundColor: "tomato",
      }}
    >
      <Text style={{ fontSize: 26 }}>{sectionTitle}</Text>
      <FlatList
        data={flatListData}
        renderItem={({ item }) => <RenderItem data={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.imageURL.toString()}
      />
    </View>
  );
}
