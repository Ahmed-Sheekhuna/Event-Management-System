import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Timeline from "react-native-timeline-flatlist";
import CountDown from "react-native-countdown-component";
import colors from "../config/colors";
import { useStates } from "../hooks/useStates";

export default function ScheduleScreen() {
  const { eventTimings, setEventTimings } = useStates();
  const [data, setData] = useState([
    {
      time: "9:00",
      title: "",
      description: "",
    },
  ]);

  useEffect(() => {
    let temp = [];

    eventTimings.map((e) => {
      temp.push({
        time: e.startTime.slice(0, -2),
        title: e.category,
        description: e.description,
      });
    });

    setData(temp);
  }, []);

  return (
    <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <ScrollView
        style={{
          flex: 1,
          paddingLeft: 20,
          paddingRight: 20,
          marginTop: 30,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ alignSelf: "center", fontSize: 24, fontWeight: "bold" }}>
          Event Countdown:
        </Text>

        <CountDown
          style={{ marginTop: 20 }}
          until={60 * 120 * 3}
          onFinish={() => console.log("finished")}
          onPress={() => console.log("hello")}
          size={20}
          digitStyle={{ backgroundColor: colors.primary }}
          digitTxtStyle={{ color: colors.white }}
        />

        <Timeline
          data={data}
          circleSize={20}
          circleColor={colors.darkblue}
          lineColor={colors.gold}
          timeContainerStyle={{ minWidth: 52 }}
          timeStyle={{
            textAlign: "center",
            backgroundColor: colors.primary,
            color: "white",
            padding: 5,
            borderRadius: 13,
          }}
          descriptionStyle={{ color: "gray" }}
          options={{
            style: { marginTop: 50 },
          }}
          isUsingFlatlist={true}
        />
      </ScrollView>
    </View>
  );
}
