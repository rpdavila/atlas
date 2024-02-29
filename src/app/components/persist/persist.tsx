"use client";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../../redux/store";
import React from "react";

export default function PersistGateWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
}
