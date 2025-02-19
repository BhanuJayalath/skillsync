"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../assets/styles/recruiter.module.css";
export default function MockExamContainer({
  questionCounter,
  mockExamComponent,
}: {
  questionCounter: any;
  mockExamComponent: any;
}) {
  const [question, setQuestion] = useState<string>();
  const [answer1, setAnswer1] = useState<string>();
  const [answer2, setAnswer2] = useState<string>();
  const [answer3, setAnswer3] = useState<string>();
  const [answer4, setAnswer4] = useState<string>();
  const storage = {
    mockExamId: mockExamComponent.mockExamId,
    mockExamContent: {
      questionContent: [
        {
          QuestionId:
            mockExamComponent.mockExamContent.questionContent[0].QuestionId,
          Question: question,
          Answer1: answer1,
          Answer2: answer2,
          Answer3: answer3,
          Answer4: answer4,
        },
      ],
    },
  };
  useEffect(() => {
    setQuestion(mockExamComponent.mockExamContent.questionContent.Question);
    setAnswer1(mockExamComponent.mockExamContent.questionContent.Answer1);
    setAnswer2(mockExamComponent.mockExamContent.questionContent.Answer2);
    setAnswer3(mockExamComponent.mockExamContent.questionContent.Answer3);
    setAnswer4(mockExamComponent.mockExamContent.questionContent.Answer4);
    // console.log(questionItem.QuestionId);
  }, []);
  useEffect(() => {
    // if (mockExamComponent.mockExamContent.QuestionId != undefined) {
    localStorage.setItem(mockExamComponent.mockExamId, JSON.stringify(storage));
    // }
  }, [storage]);

  function saveQuestion(event: any) {
    setQuestion(event.target.value);
    // console.log(event.target.value);
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
    axios.post(`${process.env.NEXT_PUBLIC_SAVE_URL}`, storage, {
      headers: { "Content-Type": "application/json" },
    });
    // localStorage.setItem(questionId, JSON.stringify(questionItem));
  }
  function remove(questionId: number) {
    localStorage.removeItem(questionId.toString());
    // updateLocalStorage();
  }

  return (
    <div id={styles.mockExamSection}>
      <div id={styles.mockExamSectionBlock}>
        <header>Question{questionCounter}</header>
        <h2>Add your question here</h2>
        <input
          id={styles.mockExamSectionQuestion}
          type="text"
          value={question}
          onChange={saveQuestion}
        />
        <h2>Add your answers here</h2>
        <div id={styles.mockExamSectionAnswer}>
          <input type="checkbox" />
          <input type="text" value={answer1} onChange={saveAnswer1} />
        </div>
        <div id={styles.mockExamSectionAnswer}>
          <input type="checkbox" />
          <input type="text" value={answer2} onChange={saveAnswer2} />
        </div>
        <div id={styles.mockExamSectionAnswer}>
          <input type="checkbox" />
          <input type="text" value={answer3} onChange={saveAnswer3} />
        </div>
        <div id={styles.mockExamSectionAnswer}>
          <input type="checkbox" />
          <input type="text" value={answer4} onChange={saveAnswer4} />
        </div>
        <button onClick={save}>Save</button>
        <button
          onClick={() => {
            // remove(questionItem.QuestionId);
          }}
        >
          remove
        </button>
      </div>
    </div>
  );
}
