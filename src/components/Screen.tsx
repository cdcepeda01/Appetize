import { PropsWithChildren, useEffect, useRef } from "react";
import { Animated, Easing, ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  style?: ViewStyle;
}>;

export function Screen({ children, scroll = true, style }: ScreenProps) {
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(entrance, {
      toValue: 1,
      duration: 520,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [entrance]);

  const entranceStyle = {
    opacity: entrance,
    transform: [
      {
        translateY: entrance.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 0],
        }),
      },
    ],
  };

  if (!scroll) {
    return (
      <SafeAreaView style={styles.safe}>
        <AppBackground />
        <Animated.View style={[styles.fixedContent, entranceStyle, style]}>{children}</Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <AppBackground />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.animatedContent, entranceStyle, style]}>{children}</Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

function AppBackground() {
  const drift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(drift, {
          toValue: 1,
          duration: 9000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(drift, {
          toValue: 0,
          duration: 9000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [drift]);

  const topPlaneMotion = {
    transform: [
      { rotate: "-22deg" },
      {
        translateY: drift.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 12],
        }),
      },
      {
        translateX: drift.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
  };

  const midPlaneMotion = {
    transform: [
      { rotate: "-16deg" },
      {
        translateX: drift.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 14],
        }),
      },
    ],
  };

  return (
    <View pointerEvents="none" style={styles.background}>
      <View style={styles.depthLayer} />
      <Animated.View style={[styles.goldPlaneTop, topPlaneMotion]} />
      <Animated.View style={[styles.goldPlaneMid, midPlaneMotion]} />
      <View style={styles.goldArc} />
      <View style={styles.goldHairlineA} />
      <View style={styles.goldHairlineB} />
      <View style={styles.verticalRule} />
      <View style={styles.noiseLineOne} />
      <View style={styles.noiseLineTwo} />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.black,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  depthLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 340,
    backgroundColor: "rgba(185,160,106,0.075)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.035)",
  },
  goldPlaneTop: {
    position: "absolute",
    top: -70,
    right: -112,
    width: 310,
    height: 210,
    borderRadius: 34,
    backgroundColor: "rgba(209,184,122,0.13)",
    transform: [{ rotate: "-22deg" }],
  },
  goldPlaneMid: {
    position: "absolute",
    top: 155,
    left: -150,
    width: 360,
    height: 92,
    borderRadius: 28,
    backgroundColor: "rgba(185,160,106,0.075)",
    borderWidth: 1,
    borderColor: "rgba(209,184,122,0.11)",
    transform: [{ rotate: "-16deg" }],
  },
  goldArc: {
    position: "absolute",
    top: 62,
    right: -118,
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: "rgba(209,184,122,0.18)",
  },
  goldHairlineA: {
    position: "absolute",
    top: 128,
    right: -18,
    width: 190,
    height: 1,
    backgroundColor: "rgba(209,184,122,0.2)",
    transform: [{ rotate: "-22deg" }],
  },
  goldHairlineB: {
    position: "absolute",
    top: 238,
    left: 58,
    width: 150,
    height: 1,
    backgroundColor: "rgba(209,184,122,0.12)",
    transform: [{ rotate: "-16deg" }],
  },
  verticalRule: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: spacing.xl,
    width: 1,
    backgroundColor: "rgba(185,160,106,0.08)",
  },
  noiseLineOne: {
    position: "absolute",
    top: 92,
    left: spacing.xl,
    right: spacing.xl,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.025)",
  },
  noiseLineTwo: {
    position: "absolute",
    top: 302,
    left: spacing.xl,
    right: spacing.xl,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: 36,
  },
  animatedContent: {
    width: "100%",
  },
  fixedContent: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
});
