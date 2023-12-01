import { useState } from "react";
import Stepper from "./components/Stepper";
import StepperControl from "./components/StepperControl";
import Accidents from "./components/steps/Accidents";
import Final from "./components/steps/Final";
import Teimognages from "./components/steps/Teimognages";
import Victims from "./components/steps/Victims";
import { StepperContext } from "./contexts/StepperContext.js";

function App() {
  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    "Accidents",
    "Informations sur les Victims",
    "Recueil des Temoignages",
    "Complete",
  ];

  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return <Accidents />;
      case 2:
        return <Victims />;
      case 3:
        return <Teimognages />;
      case 4:
        return <Final />;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    // check ig steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      {/* Stepper */}
      <div className="container horizontal mt-5">
        <Stepper steps={steps} currentStep={currentStep} />

        {/* Display Components */}
      </div>
      <div className="my-10 p-10">
        <StepperContext.Provider
          value={{ userData, finalData, setFinalData, setUserData }}
        >
          {displaySteps(currentStep)}
        </StepperContext.Provider>
      </div>

      {/* Navigation controls */}
      <StepperControl
        handleClick={handleClick}
        currentStep={currentStep}
        steps={steps}
      />
    </div>
  );
}

export default App;
