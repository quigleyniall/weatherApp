import { Link } from "expo-router";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
interface Props {
  title?: string;
  children: React.ReactNode;
  link?: string | null; 
  linkText?: string;
}

const HorizontalList: React.FC<Props> = ({ title, children, link, linkText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {title && <Text style={styles.title}>{title}</Text>}
        {!!link && (
          <Link href={link}>
            <View style={styles.link}>
              <Text style={styles.linkText}>{linkText}</Text>
              <FontAwesome5 name="arrow-right" size={16} color="#999" />
            </View>
          </Link>
        )}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};

export default HorizontalList;
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    fontFamily: "Inter-Regular",
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  linkText: {
    fontSize: 16,
    marginRight: 5,
    color: "#999",
    fontFamily: "Inter-Regular",
  },
  
});
