"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";
export default function MockExamContainer({
  MockTestQuestions,
  update,
  questionCounter,
  removeQuestion,
}: {
  MockTestQuestions: any;
  update: any;
  questionCounter: number;
  removeQuestion: any;
}) {
  const [question, setQuestion] = useState<string>();
  const [answer1, setAnswer1] = useState<string>();
  const [answer2, setAnswer2] = useState<string>();
  const [answer3, setAnswer3] = useState<string>();
  const [answer4, setAnswer4] = useState<string>();
  const [removed, setRemoved] = useState(false);
  const storage = {
    QuestionId: MockTestQuestions.QuestionId,
    Question: question,
    Answer1: answer1,
    Answer2: answer2,
    Answer3: answer3,
    Answer4: answer4,
  };
  useEffect(() => {
    setQuestion(MockTestQuestions.Question);
    setAnswer1(MockTestQuestions.Answer1);
    setAnswer2(MockTestQuestions.Answer2);
    setAnswer3(MockTestQuestions.Answer3);
    setAnswer4(MockTestQuestions.Answer4);
  }, [removed]);
  useEffect(() => {
    update(MockTestQuestions.QuestionId, storage);
  }, [question, answer1, answer2, answer3, answer4]);

  // setQuestionItem({
  //   mockExamId: MockTestQuestions.mockExamId,
  //   mockExamContent: {
  //     questionContent: [
  //       {
  //         QuestionId: MockTestQuestions.QuestionId,
  //         Question: question,
  //         Answer1: answer1,
  //         Answer2: answer2,
  //         Answer3: answer3,
  //         Answer4: answer4,
  //       },
  //     ],
  //   },
  // });

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
    // localStorage.removeItem(questionId.toString());
    // console.log(questionId);
    removeQuestion(questionId);
    setRemoved(!removed);
    // updateLocalStorage();
  }

  return (
    <div id={styles.mockExamSection}>
      <div id={styles.mockExamSectionBlock}>
        <header>
          Question {questionCounter}
          <div id={styles.mockExamSectionSaveandClose}>
            {/* <button onClick={save}>
              <Image
                alt="tick-icon"
                width={25}
                height={25}
                src="/recruiter/tick-icon.svg"
              />
            </button> */}
            <button
              onClick={() => {
                remove(MockTestQuestions.QuestionId);
              }}
            >
              <Image
                alt="remove-icon"
                width={25}
                height={25}
                src="/recruiter/remove-icon.svg"
              />
            </button>
          </div>
        </header>
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
      </div>
    </div>
  );
}
