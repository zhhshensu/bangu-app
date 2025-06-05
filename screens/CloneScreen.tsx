import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker"; // For select/dropdown
import RNPickerSelect from "react-native-picker-select";
import * as DocumentPicker from "expo-document-picker"; // For file upload

export default function CloneScreen() {
  const [voiceName, setVoiceName] = useState("record");
  const [voiceSampleSource, setVoiceSampleSource] = useState("");
  const [selectedRecording, setSelectedRecording] = useState(null); // To hold selected recording from a list
  const [uploadedFile, setUploadedFile] = useState<DocumentPicker.DocumentPickerResult | null>(
    null
  ); // To hold uploaded file
  const [cloningProgress, setCloningProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState("正在初始化...");
  const [isCloning, setIsCloning] = useState(false);

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: true,
      });

      if (!res.canceled) {
        setUploadedFile(res);
        // You might want to display the file name or some confirmation
      } else {
        setUploadedFile(null);
      }
    } catch (err) {
      console.error("DocumentPicker Error: ", err);
    }
  };

  const startCloningProcess = () => {
    setIsCloning(true);
    setCloningProgress(0);
    setProgressStatus("正在上传素材...");

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setCloningProgress(progress);
      if (progress === 0) setProgressStatus("正在上传素材...");
      else if (progress === 30) setProgressStatus("正在分析声音特征...");
      else if (progress === 70) setProgressStatus("正在生成语音模型...");
      else if (progress >= 100) {
        clearInterval(interval);
        setProgressStatus("克隆完成！");
        // Navigate to library or show success message
      }
    }, 500);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>开始克隆</Text>

      <View style={styles.section}>
        <Text style={styles.label}>克隆声音命名</Text>
        <TextInput
          style={styles.textInput}
          placeholder="例如：我的专属声音"
          value={voiceName}
          onChangeText={setVoiceName}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>选择声音素材</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={voiceSampleSource}
            onValueChange={(itemValue) => setVoiceSampleSource(itemValue)}
          >
            {/* <Picker.Item label="选择来源..." value="" /> */}
            <Picker.Item label="从我的录音选择" value="record" />
            <Picker.Item label="上传本地文件" value="upload" />
          </Picker>
          {/* <RNPickerSelect
            value={voiceSampleSource}
            items={[
              { label: "从我的录音选择", value: "record" },
              { label: "上传本地文件", value: "upload" },
            ]}
            onValueChange={(itemValue) => setVoiceSampleSource(itemValue)}
          ></RNPickerSelect> */}
        </View>

        {voiceSampleSource === "record" && (
          <View style={styles.recordInfoContainer}>
            <Text style={styles.recordInfoText}>选择一个已保存的录音 (示例)。</Text>
            {/* In a real app, this would be a list of recordings to select from */}
          </View>
        )}

        {voiceSampleSource === "upload" && (
          <View style={styles.uploadSection}>
            <TouchableOpacity style={styles.filePickerButton} onPress={handleFilePick}>
              <Text style={styles.filePickerButtonText}>选择文件</Text>
            </TouchableOpacity>
            {uploadedFile &&
              !uploadedFile.canceled &&
              uploadedFile.assets &&
              uploadedFile.assets.length > 0 && (
                <Text style={styles.uploadedFileName}>已选择: {uploadedFile.assets[0].name}</Text>
              )}
            <View style={styles.uploadInfoContainer}>
              <Text style={styles.uploadInfoText}>请选择一个WAV或MP3文件。</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>预计克隆质量</Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: "75%" }]}>
            <Text style={styles.progressBarText}>良好</Text>
          </View>
        </View>
        <Text style={styles.qualityEstimateText}>基于素材质量和长度的预估。</Text>
      </View>

      {isCloning && (
        <View style={styles.cloningInProgressContainer}>
          <Text style={styles.cloningTitle}>
            <Text style={styles.cloningIcon}>⏳</Text> 克隆进行中...
          </Text>
          <View style={styles.cloningProgressBarBackground}>
            <View style={[styles.cloningProgressBarFill, { width: `${cloningProgress}%` }]}>
              <Text style={styles.cloningProgressText}>{cloningProgress}%</Text>
            </View>
          </View>
          <Text style={styles.cloningStatusText}>{progressStatus}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.startButton}
        onPress={startCloningProcess}
        disabled={isCloning}
      >
        <Text style={styles.startButtonText}>
          <Text style={styles.startButtonIcon}>✨</Text> 开始克隆
        </Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 8,
    borderRadius: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
  },
  recordInfoContainer: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    marginTop: 8,
  },
  recordInfoText: {
    fontSize: 14,
    color: "#6b7280",
  },
  uploadSection: {
    marginTop: 8,
  },
  filePickerButton: {
    backgroundColor: "#3b82f6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  filePickerButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  uploadedFileName: {
    marginTop: 8,
    fontSize: 14,
    color: "#374151",
  },
  uploadInfoContainer: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    marginTop: 8,
  },
  uploadInfoText: {
    fontSize: 14,
    color: "#6b7280",
  },
  progressBarBackground: {
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: 9999,
    height: 20,
  },
  progressBarFill: {
    backgroundColor: "#22c55e",
    height: 20,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  qualityEstimateText: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  cloningInProgressContainer: {
    marginTop: 16,
  },
  cloningTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cloningIcon: {
    color: "#f97316",
  },
  cloningProgressBarBackground: {
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: 9999,
    height: 24,
    marginBottom: 8,
  },
  cloningProgressBarFill: {
    backgroundColor: "#3b82f6",
    height: 24,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  cloningProgressText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  cloningStatusText: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 14,
  },
  startButton: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  startButtonIcon: {
    color: "#fff",
    fontSize: 20,
  },
});
