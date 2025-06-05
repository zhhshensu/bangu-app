import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      {/* User Info Section */}
      <View style={styles.userInfoSection}>
        <Image source={{ uri: "https://via.placeholder.com/60" }} style={styles.avatar} />
        <View>
          <Text style={styles.welcomeText}>欢迎回来！</Text>
          <Text style={styles.subText}>开始您的声音创作之旅</Text>
        </View>
      </View>
      {/* Action Cards Section */}
      <View style={styles.actionCardsSection}>
        <TouchableOpacity
          style={[styles.card, styles.recordCard]}
          onPress={() => router.push("/record")}
        >
          <Text style={styles.micIcon}>🎤</Text> {/* Equivalent to bi-mic-fill */}
          <Text style={styles.cardTitle}>录制声音</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, styles.cloneCard]}
          onPress={() => router.push("/clone")}
        >
          <Text style={styles.magicIcon}>✨</Text> {/* Equivalent to bi-magic */}
          <Text style={styles.cardTitle}>快速克隆</Text>
        </TouchableOpacity>
      </View>
      {/* Recently Cloned Section */}
      <Text style={styles.sectionTitle}>
        <Text style={styles.soundwaveIcon}>🔊</Text> 最近克隆
      </Text>{" "}
      {/* Equivalent to bi-soundwave */}
      <View style={styles.recentlyClonedContainer}>
        <TouchableOpacity style={styles.clonedItem}>
          <View style={styles.clonedItemHeader}>
            <Text style={styles.clonedItemTitle}>我的声音克隆 V1</Text>
            <Text style={styles.clonedItemTime}>3天前</Text>
          </View>
          <Text style={styles.clonedItemDescription}>基于10分钟录音，效果良好。</Text>
          <Text style={styles.clonedItemPreview}>
            <Text style={styles.playIcon}>▶️</Text> 点击预览
          </Text>{" "}
          {/* Equivalent to bi-play-circle-fill */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.clonedItemNoBorder}>
          <View style={styles.clonedItemHeader}>
            <Text style={styles.clonedItemTitle}>演示用声音</Text>
            <Text style={styles.clonedItemTime}>1周前</Text>
          </View>
          <Text style={styles.clonedItemDescription}>短句测试，用于快速演示。</Text>
          <Text style={styles.clonedItemPreview}>
            <Text style={styles.playIcon}>▶️</Text> 点击预览
          </Text>
        </TouchableOpacity>
      </View>
      {/* Usage Tips Section */}
      <Text style={styles.sectionTitleMt4}>
        <Text style={styles.lightbulbIcon}>💡</Text> 使用技巧
      </Text>{" "}
      {/* Equivalent to bi-lightbulb-fill */}
      <View style={styles.tipsAlert}>
        <Text style={styles.infoIcon}>ℹ️</Text> {/* Equivalent to bi-info-circle-fill */}
        <Text style={styles.tipsText}>在安静环境下录制，可以获得更好的克隆效果！</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 48,
  },
  userInfoSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subText: {
    color: "#6b7280",
    fontSize: 14,
  },
  actionCardsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  card: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recordCard: {
    marginRight: 8,
  },
  cloneCard: {
    marginLeft: 8,
  },
  micIcon: {
    color: "#3b82f6",
    fontSize: 36,
    marginBottom: 8,
  },
  magicIcon: {
    color: "#22c55e",
    fontSize: 36,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  sectionTitleMt4: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 12,
  },
  soundwaveIcon: {
    color: "#3b82f6",
  },
  recentlyClonedContainer: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    marginBottom: 24,
  },
  clonedItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  clonedItemNoBorder: {
    padding: 16,
  },
  clonedItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 4,
  },
  clonedItemTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  clonedItemTime: {
    color: "#6b7280",
    fontSize: 12,
  },
  clonedItemDescription: {
    color: "#374151",
    fontSize: 14,
    marginBottom: 4,
  },
  clonedItemPreview: {
    color: "#3b82f6",
    fontSize: 12,
  },
  playIcon: {
    color: "#3b82f6",
  },
  lightbulbIcon: {
    color: "#f59e0b",
  },
  tipsAlert: {
    backgroundColor: "#dbeafe",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    color: "#2563eb",
    marginRight: 8,
  },
  tipsText: {
    color: "#1e40af",
    fontSize: 14,
    flex: 1,
  },
});
