"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Loading = () => {
  return (
    <div className=" fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <DotLottieReact src="/animation/animation.json" loop autoplay />
    </div>
  );
};
