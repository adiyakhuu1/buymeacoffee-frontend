import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Skeleton = () => {
  return (
    <div className="fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <DotLottieReact
        width={150}
        height={150}
        src="https://lottie.host/ed2e7166-7a25-4ba0-8158-cef668278255/HzxAaROPYm.lottie"
        loop
        autoplay
      />
    </div>
  );
};
