import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const CartLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    ></Stack>
  );
};

export default CartLayout;
