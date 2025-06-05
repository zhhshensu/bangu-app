import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
// For icons, we might use @expo/vector-icons, but for now, use emojis or simple text

export default function RecordScreen() {
  const [recording, setRecording] = useState<boolean>(false);
  const [seconds, setSeconds] = useState(0);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);

  useEffect(() => {
    if (recording) {
      setTimerInterval(
        setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000)
      );
    } else {
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    }
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [recording]);

  const formatTime = () => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleRecordButtonPress = () => {
    setRecording(!recording);
    if (!recording) {
      setSeconds(0); // Reset timer when starting new recording
    }
  };

  const handleStopRecording = () => {
    setRecording(false);
    // Implement actual stop recording logic here later (e.g., using expo-av)
  };

  const handleSaveRecording = () => {
    // Implement actual save recording logic here later
    alert("录音已保存！");
  };

  return (
    <View style={styles.container}>
      {/* Info Alert */}
      <View style={styles.infoAlert}>
        <Text style={styles.infoIcon}>ℹ️</Text>
        <Text style={styles.infoText}>请在安静环境下录制至少30秒以获得最佳效果。</Text>
      </View>

      {/* Waveform and Timer */}
      <View style={styles.waveformTimerContainer}>
        <Text style={styles.waveformPlaceholder}>📈</Text> {/* Placeholder for waveform */}
        <Text style={styles.timerDisplay} id="timerDisplay">
          {formatTime()}
        </Text>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[
            styles.recordButton,
            recording ? styles.recordButtonRecording : styles.recordButtonIdle,
          ]}
          onPress={handleRecordButtonPress}
        >
          <Text style={styles.recordButtonIcon}>{recording ? "⏸️" : "🎤"}</Text>
        </TouchableOpacity>

        {!recording && seconds > 0 && (
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.stopButton]}
              onPress={handleStopRecording}
            >
              <Text style={styles.stopButtonText}>⏹️ 停止</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.saveButton]}
              onPress={handleSaveRecording}
            >
              <Text style={styles.saveButtonText}>💾 保存录音</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "space-between",
  },
  infoAlert: {
    backgroundColor: "#dbeafe",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    color: "#2563eb",
    marginRight: 8,
  },
  infoText: {
    color: "#1e40af",
    fontSize: 14,
    flex: 1,
  },
  waveformTimerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  waveformPlaceholder: {
    color: "#9ca3af",
    fontSize: 60,
    marginBottom: 12,
  },
  timerDisplay: {
    fontSize: 36,
    fontFamily: "monospace",
  },
  controlsContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  recordButtonRecording: {
    backgroundColor: "#f59e0b", // yellow-500
  },
  recordButtonIdle: {
    backgroundColor: "#ef4444", // red-500
  },
  recordButtonIcon: {
    color: "#fff",
    fontSize: 36,
  },
  actionButtonsContainer: {
    flexDirection: "row",
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  stopButton: {
    backgroundColor: "#e5e7eb",
    marginRight: 8,
  },
  stopButtonText: {
    color: "#1f2937",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#3b82f6",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
