import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import classes from './ProgressStep.module.css';

const ProgressStep = props => {
  const getPercent = (steps, stepId) => {
    var stepPosition = steps.findIndex(({ id }) => id === stepId);
    return 100 * ((stepPosition + 1) / (steps.length - 1)) - 1;
  }

  return (
      <>
        <div className={classes.container}>
          <ProgressBar percent={ getPercent(props.steps, props.currentStep.id) } filledBackground="linear-gradient(to right, #9ce9db, #6ACCBA)">
            {props.steps.map((step) => {
              return (
                <Step
                  key={step.id}
                  transition="scale"
                  children={({ accomplished }) => (
                    <div className={classes.stepCircle} style={{ backgroundColor: (accomplished && !!props.currentStep.id) ? "#3d9081" : "#cde3df" }} ></div>
                  )}
                />
              );
            })}
          </ProgressBar>
        </div>
        <br />
      </>
    );
};

export default ProgressStep;