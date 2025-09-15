import { useState } from "react";
import { AssessmentHeader } from "./AssessmentHeader";
import { QuestionCard } from "./QuestionCard";
import { LikertScale } from "./LikertScale";
import { ResultsPanel } from "./ResultsPanel";
import { assessmentData, calculateResults, type AssessmentQuestion } from "@/data/assessmentData";

export const AssessmentFlow = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = assessmentData[currentQuestionIndex];
  const totalQuestions = assessmentData.length;

  const handleAnswer = (questionId: string, answer: any) => {
    const newResponses = { ...responses, [questionId]: answer };
    setResponses(newResponses);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setResponses({});
    setIsComplete(false);
  };

  if (isComplete) {
    const results = calculateResults(responses);
    return <ResultsPanel results={results} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-assessment-bg-subtle py-8 px-4">
      <AssessmentHeader
        currentStep={currentQuestionIndex + 1}
        totalSteps={totalQuestions}
        title="Receiving Feedback Gracefully"
        subtitle="Module of the Collaboration & Communication Intelligence (CCI) Suite"
      />

      {currentQuestion.type === 'scenario' ? (
        <QuestionCard
          question={currentQuestion.context ? `${currentQuestion.context} ${currentQuestion.question}` : currentQuestion.question}
          options={currentQuestion.options}
          onAnswer={(answer, score) => handleAnswer(currentQuestion.id, answer)}
          questionNumber={currentQuestionIndex + 1}
        />
      ) : (
        <LikertScale
          questions={currentQuestion.questions}
          onComplete={(likertResponses) => handleAnswer(currentQuestion.id, likertResponses)}
          questionNumber={currentQuestionIndex + 1}
          title={currentQuestion.title}
        />
      )}
    </div>
  );
};