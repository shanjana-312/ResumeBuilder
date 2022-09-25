import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { ArrowDown, ArrowUp } from "react-feather";



import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";

import styles from "./Body.module.css";

function Body() {
  const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];
  const sections = {
    basicInfo: "Basic Info",
    workExp: "Work Experience",
    education: "Education",
    achievement: "Achievements",
  };
  const resumeRef = useRef();

  const [activeColor, setActiveColor] = useState(colors[0]);
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      details: [],
    },
  });
  const handleSaveToPC = (jsonData, file) => {
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${file}.json`;
    link.href = url;
    link.click();
  }
  const handleChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setResumeInformation(reader.result);
    }
    reader.onerror = () => {
      console.log("file error", reader.error);
    }
  }

  return (
    <div className={styles.container}>
      {/* <p className={styles.heading}>Resume Builder</p> */}

      <div className={styles.main}>
        <Editor
          sections={sections}
          information={resumeInformation}
          setInformation={setResumeInformation}
        />

        <div className={styles.toolbar}>

          <ReactToPrint
            trigger={() => {
              return (
                <button>
                  Download as PDF <ArrowDown />
                </button>
              );
            }}
            content={() => resumeRef.current}
          />
          <span />
          <button class={styles.btn2} onClick={() => handleSaveToPC(resumeInformation, "data")}>
            Export <ArrowUp />
          </button>

        </div>
        <Resume
          ref={resumeRef}
          sections={sections}
          information={resumeInformation}
          activeColor={activeColor}
        />
      </div>
    </div>
  );
}

export default Body;