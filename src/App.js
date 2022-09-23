import React, { useEffect, useState } from "react";
import StartupProgress from "./Components/StartupProgress";
import { initialData } from "./data";
import "./App.css";

function App() {
  const progressData = localStorage.getItem("startupProgressData")
    ? JSON.parse(localStorage.getItem("startupProgressData"))
    : initialData;

  const [progress, setProgress] = useState(progressData);
  const [randomFact, setRandomFact] = useState();
  const [isStartupDone, setIsStartupDone] = useState();

  useEffect(() => {
    localStorage.setItem("startupProgressData", JSON.stringify(progress));
  }, [progress]);

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  const areAllStagesDone = (progress) => {
    return progress.every((stage) => stage.isDone === true);
  };

  const updateData = (stageId, taskId) => {
    const selectedTask = progress
      .find((stage) => stage.id === stageId)
      .tasks.find((task) => task.id === taskId);
    selectedTask.isDone = !selectedTask.isDone;

    enableStage(progress);
    setProgress([...progress]);
    areAllStagesDone(progress) && setIsStartupDone(true);
  };

  const enableStage = (data) => {
    let enableNextStage = false;

    data.forEach((stage) => {
      if (enableNextStage) {
        stage.isActive = true;
        enableNextStage = false;
      }
      if (stage.tasks.every((task) => task.isDone === true)) {
        stage.isDone = true;
        stage.isActive = false;
        enableNextStage = true;
      }
    });
    return data;
  };

  useEffect(() => {
    if (isStartupDone) {
      fetchRandomFact();
    } else {
      setRandomFact(null);
    }

    async function fetchRandomFact() {
      try {
        const fetchedFact = await fetch(
          "https://uselessfacts.jsph.pl/random.json?language=en"
        ).then((response) => response.json());
        setRandomFact(fetchedFact.text);
      } catch (e) {
        console.error(e);
      }
    }
  }, [isStartupDone]);

  return (
    <>
      <div className="App">
        <header>My Startup Progress</header>
        <StartupProgress data={progress} updateData={updateData} />
      </div>
      {randomFact ? <div className="random-fact">{randomFact}</div> : null}
      {isStartupDone ? (
        <button onClick={clearLocalStorage}>Clear session data</button>
      ) : null}
    </>
  );
}

export default App;
