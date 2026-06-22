"use client";

import { ViewTransition } from "react";

export default function DirectionalTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransition default="none" enter="fade-in" exit="fade-out">
      {children}
    </ViewTransition>
  );
}
