import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Loading = () => {
  return (
    <div className=" transform fixed top-1/2 left-1/2 right-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2">
      <DotLottieReact
        src="https://lottie.host/c127817e-87cf-424d-99fe-1c78c5e89e76/44KXPb4Ond.lottie"
        loop
        autoplay
      />
    </div>
  );
};
