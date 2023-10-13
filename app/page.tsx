import React from "react";
import { AppWrapper } from "./layout/components/AppWrapper";
import { LandingPage } from "./layout/components/LandingPage";
import { SessionProvider } from "next-auth/react";

export default function Landing() {
  return (
      <AppWrapper>
        <LandingPage />
      </AppWrapper>
  );
}
