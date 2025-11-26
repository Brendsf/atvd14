import React, { useEffect, useState } from 'react';
import {View,Text,FlatList,Image,TouchableOpacity,ActivityIndicator,StyleSheet,SafeAreaView} from 'react-native';

export default function Menu({ navigation }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.spaceflightnewsapi.net/v4/articles")
      .then(res => res.json())
      .then(json => {
        setNews(json.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Noticia", {
          url: item.url,
        })
      }
    >
      <Image source={{ uri: item.image_url }} style={styles.image} />

      <View style={styles.textBox}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>{item.summary}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F3F5" },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
    elevation: 3
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12
  },

  textBox: { flex: 1 },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#111"
  },

  subtitle: {
    fontSize: 13,
    color: "#666"
  }
});
