import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
} from "react-native";
import { useState } from "react";

export default function LibraryScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [ttsText, setTtsText] = useState("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const voiceClones = [
    {
      id: "1",
      name: "我的专属声音 V2",
      time: "2小时前",
      description: "基于最新录音，效果极佳。",
    },
    {
      id: "2",
      name: "项目演示声音",
      time: "3天前",
      description: "用于产品演示的通用女声。",
    },
    {
      id: "3",
      name: "英文播客声音",
      time: "1周前",
      description: "克隆自一段英文播客素材。",
    },
  ];

  const handlePlay = (voiceId: string) => {
    console.log(`Playing voice: ${voiceId}`);
    // Implement actual audio playback here (e.g., using expo-av)
  };

  const handleDelete = (voiceId: string) => {
    console.log(`Deleting voice: ${voiceId}`);
    // Implement actual delete logic here
  };

  const handleGenerateAndPlayTTS = () => {
    console.log(`Generating and playing TTS for: ${ttsText}`);
    setIsPlayingAudio(true);
    // Implement actual TTS generation and playback logic here
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchInput} placeholder="搜索声音名称..." />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.voiceClonesContainer}>
        {voiceClones.map((voice) => (
          <View key={voice.id} style={styles.voiceCloneItem}>
            <View style={styles.voiceCloneItemHeader}>
              <Text style={styles.voiceCloneName}>{voice.name}</Text>
              <Text style={styles.voiceCloneTime}>{voice.time}</Text>
            </View>
            <Text style={styles.voiceCloneDescription}>{voice.description}</Text>
            <View style={styles.voiceCloneActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.playButton]}
                onPress={() => handlePlay(voice.id)}
              >
                <Text style={styles.actionButtonText}>▶️ 试听</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.ttsButton]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.actionButtonText}>💬 TTS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDelete(voice.id)}
              >
                <Text style={styles.deleteButtonText}>🗑️ 删除</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(!isModalVisible)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>文本转语音</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeModalButton}>✖️</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.ttsInput}
              placeholder="在此输入要转换的文本..."
              multiline
              numberOfLines={3}
              value={ttsText}
              onChangeText={setTtsText}
            />
            {isPlayingAudio && (
              <View style={styles.audioPlaybackContainer}>
                <Text style={styles.audioPlaybackText}>（模拟音频播放）</Text>
                {/* Placeholder for actual audio player component */}
              </View>
            )}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.closeButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>关闭</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.generatePlayButton]}
                onPress={handleGenerateAndPlayTTS}
              >
                <Text style={styles.actionButtonText}>▶️ 生成并播放</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    padding: 8,
  },
  searchButton: {
    padding: 8,
    backgroundColor: "#e5e7eb",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  searchIcon: {
    color: "#6b7280",
  },
  voiceClonesContainer: {
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
  },
  voiceCloneItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  voiceCloneItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 4,
  },
  voiceCloneName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  voiceCloneTime: {
    color: "#6b7280",
    fontSize: 12,
  },
  voiceCloneDescription: {
    color: "#374151",
    fontSize: 14,
    marginBottom: 8,
  },
  voiceCloneActions: {
    flexDirection: "row",
    marginTop: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  playButton: {
    backgroundColor: "#3b82f6",
  },
  ttsButton: {
    backgroundColor: "#0ea5e9",
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  deleteButtonText: {
    color: "#ef4444",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "91.666667%", // w-11/12
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeModalButton: {
    color: "#6b7280",
    fontSize: 20,
  },
  ttsInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    height: 100, // approximate text-area-height
    textAlignVertical: "top",
  },
  audioPlaybackContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  audioPlaybackText: {
    color: "#4b5563",
    marginBottom: 8,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  closeButton: {
    backgroundColor: "#d1d5db",
    marginRight: 8,
  },
  closeButtonText: {
    color: "#1f2937",
  },
  generatePlayButton: {
    backgroundColor: "#3b82f6",
  },
});
