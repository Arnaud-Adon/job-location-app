import { Platform } from "react-native";

const DEVICE_PREFIX = Platform.OS === "ios" ? "ios" : "android";

export { DEVICE_PREFIX };
