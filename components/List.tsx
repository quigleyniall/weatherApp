import * as React from "react";
import { List, MD3Colors } from "react-native-paper";
import { Text, View } from "react-native";

interface Item {
    title: string;
    temp: {
        min: number;
        max: number;
    };
    sortCode: number;
}

const CustomList = ({ items }: { items: Item[] }) => (
  <List.Section>
    <List.Subheader>Weather</List.Subheader>
    {items.map((item) => (
      <List.Item
        title={item?.title}
        right={() => (
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Text>{item?.temp?.min}°C</Text>
            <Text>{item?.temp?.max}°C</Text>
          </View>
        )}
      />
    ))}
  </List.Section>
);

export default CustomList;
