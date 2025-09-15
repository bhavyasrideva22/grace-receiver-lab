import { useState } from "react";
import { WelcomeScreen } from "@/components/Assessment/WelcomeScreen";
import { AssessmentFlow } from "@/components/Assessment/AssessmentFlow";

const Index = () => {
  const [hasStarted, setHasStarted] = useState(false);

  if (!hasStarted) {
    return <WelcomeScreen onStart={() => setHasStarted(true)} />;
  }

  return <AssessmentFlow />;
};

export default Index;
