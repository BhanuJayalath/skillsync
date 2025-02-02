import { useState } from "react";
import styles from "../assets/styles/recruiter.module.css";
export default function MockExamContainer({ questionId }: { questionId: any }) {
  const [question, setQuestion] = useState();
  const [answer1, setAnswer1] = useState();
  const [answer2, setAnswer2] = useState();
  const [answer3, setAnswer3] = useState();
  const [answer4, setAnswer4] = useState();

  const storage = {
    Question: question,
    "Answwer 1": answer1,
    "Answer 2": answer2,
    "Answer 3": answer3,
    "Answer 4": answer4,
  };

  function saveQuestion(event: any) {
    setQuestion(event.target.value);
  }

  function saveAnswer1(event: any) {
    setAnswer1(event.target.value);
  }

  function saveAnswer2(event: any) {
    setAnswer2(event.target.value);
  }

  function saveAnswer3(event: any) {
    setAnswer3(event.target.value);
  }

  function saveAnswer4(event: any) {
    setAnswer4(event.target.value);
  }

  function save() {
    localStorage.setItem(questionId, JSON.stringify(storage));
  }
  function remove(questionId: number) {
    localStorage.removeItem(questionId.toString());
  }

  return (
    <div id={styles.mockExamSection}>
      <div id={styles.mockExamSectionBlock}>
        <header>Question{questionId}</header>
        <h2>Add your question here</h2>
        <input
          id={styles.mockExamSectionQuestion}
          type="text"
          onChange={saveQuestion}
        />
        <h2>Add your answers here</h2>
        <div id={styles.mockExamSectionAnswer}>
          <input type="checkbox" />
          <input type="text" onChange={saveAnswer1} />
        </div>
        <div id={styles.mockExamSectionAnswer}>
          <input type="checkbox" />
          <input type="text" onChange={saveAnswer2} />
        </div>
        <div id={styles.mockExamSectionAnswer}>
          <input type="checkbox" />
          <input type="text" onChange={saveAnswer3} />
        </div>
        <div id={styles.mockExamSectionAnswer}>
          <input type="checkbox" />
          <input type="text" onChange={saveAnswer4} />
        </div>
        <button onClick={save}>Save</button>
        <button
          onClick={() => {
            remove(questionId);
          }}
        >
          remove
        </button>
      </div>
    </div>
  );
}
