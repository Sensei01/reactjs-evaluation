import React, { Component } from "react";
import { QuizData } from "./QuizData";
import { truncate } from "fs";

class Quiz extends Component {
  // Work on the 'score' and 'disabled' parameters in order to get score of feedback
  state = {
    userAnswer: null,
    currentQuestion: 0,
    options: [],
    quizEnd: false,
    disabled: true
  };

  loadQuiz = () => {
    const { currentQuestion } = this.state;
    this.setState(() => {
      return {
        questions: QuizData[currentQuestion].question,
        options: QuizData[currentQuestion].options,
        answers: QuizData[currentQuestion].answer
      };
    });
  };

  componentDidMount() {
    this.loadQuiz();
  }

  nextQuestionHandler = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
    console.log(this.state.currentQuestion);
  };
  // updates the component

  componentDidUpdate(prevProps, prevState) {
    const { currentQuestion } = this.state;
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: QuizData[currentQuestion].question,
          options: QuizData[currentQuestion].options,
          answers: QuizData[currentQuestion].answer
        };
      });
    }
  }

  //check answer
  checkAnswer = answer => {
    this.setState({
      userAnswer: answer,
      disabled: false
    });
  };

  //button to end the feedback
  finishHandler = () => {
    if (this.state.currentQuestion === QuizData.length - 1) {
      this.setState({
        quizEnd: true
      });
    }
  };
  render() {
    const {
      questions,
      options,
      currentQuestion,
      userAnswer,
      quizEnd
    } = this.state;

    //code to send result to server

    if (quizEnd) {
      return (
        <div>
          <h2>Thank You!!! Your Feedback Has Been Submitted</h2>
          <p>selected options are:</p>
          <ol>
            {QuizData.map((item, index) => (
              <li className="ui floating message options" key={index}>
                {item.answer}
              </li>
            ))}
          </ol>
        </div>
      );
    }
    return (
      <div className="App">
        <h2>{questions}</h2>
        <span>{`Questions ${currentQuestion} out of ${QuizData.length -
          1}`}</span>
        {options.map(option => (
          <p
            key={option.id}
            className={`ui floating message options ${
              userAnswer === option ? "selected" : null
            }`}
            onClick={() => this.checkAnswer(option)}
          >
            {option}
          </p>
        ))}

        {currentQuestion < QuizData.length - 1 && (
          <button
            //semantic ui buttons
            className="ui inverted button"
            disabled={this.state.disabled}
            onClick={this.nextQuestionHandler}
          >
            NEXT
          </button>
        )}

        {currentQuestion === QuizData.length - 1 && (
          <button
            className="ui inverted button"
            disabled={this.state.disabled}
            onClick={this.finishHandler}
          >
            FINISH
          </button>
        )}
      </div>
    );
  }
}

export default Quiz;
