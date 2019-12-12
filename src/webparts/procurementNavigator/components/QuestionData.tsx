// import {questionData } from './QuestionsType';

export const mockArray:any = [
  { 
    title: "This is the first question",
    questionId: 1, 
    questionText: "Question 1: Text",  
    choiceTextA: "Go to question 2", 
    choiceA: 2,
    choiceTextB: "Go to question 3",
    choiceB: 3,
    choiceTextC: "END HERE WITH END TEXT",
    choiceC: 1,
    endTextA: "",
    endTextB: "",
    endTextC: "SHOW ME TEXT"
  },
  { 
    title: "This is the second question",
    questionId: 2, 
    questionText: "Question 2: Text", 
    choiceTextA: "Go to question 3", 
    choiceA: 3, 
    choiceTextB: "Also go to the next question",
    choiceB: 3,
    choiceTextC: "END HERE WITHOUT END TEXT",
    choiceC: 2,
    endTextA: "",
    endTextB: "",
    endTextC: "This is the end of the series: Choice C was made"
  },
  { 
    title: "This is the third question",
    questionId: 3, 
    questionText: "Question 3: Text", 
    choiceTextA: "End text will appear for A", 
    choiceA: 3, 
    choiceTextB: "End text will appear for B",
    choiceB: 3,
    choiceTextC: "This goes to Question 4",
    choiceC: 4,
    endTextA: "This is the end of the series: Choice A was made",
    endTextB: "This is the end of the series: Choice B was made",
    endTextC: ""
  },
  { 
    title: "This is the fourth question",
    questionId: 4, 
    questionText: "Question 4: Text", 
    choiceTextA: "End text will appear for A", 
    choiceA: 4, 
    choiceTextB: "End text will appear for B",
    choiceB: 4,
    choiceTextC: "",
    choiceC: null,
    endTextA: "This is the end of the series: Choice A was made",
    endTextB: "This is the end of the series: Choice B was made",
    endTextC: ""
  }
];