import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface LikertQuestion {
  id: string;
  statement: string;
}

interface LikertScaleProps {
  questions: LikertQuestion[];
  onComplete: (responses: Record<string, number>) => void;
  questionNumber: number;
  title: string;
}

export const LikertScale = ({ questions, onComplete, questionNumber, title }: LikertScaleProps) => {
  const [responses, setResponses] = useState<Record<string, number>>({});

  const scaleOptions = [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Neutral" },
    { value: 4, label: "Agree" },
    { value: 5, label: "Strongly Agree" },
  ];

  const handleResponseChange = (questionId: string, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    onComplete(responses);
  };

  const allQuestionsAnswered = questions.every(q => responses[q.id] !== undefined);

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-assessment-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-foreground">
          Question {questionNumber} - {title}
        </CardTitle>
        <p className="text-assessment-neutral">
          Rate each statement on a scale from 1 (Strongly Disagree) to 5 (Strongly Agree)
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {questions.map((question) => (
          <div key={question.id} className="space-y-4 p-4 rounded-lg border border-assessment-border">
            <p className="font-medium text-foreground">{question.statement}</p>
            
            <RadioGroup
              value={responses[question.id]?.toString() || ""}
              onValueChange={(value) => handleResponseChange(question.id, parseInt(value))}
              className="flex justify-between"
            >
              {scaleOptions.map((option) => (
                <div key={option.value} className="flex flex-col items-center space-y-2">
                  <RadioGroupItem 
                    value={option.value.toString()} 
                    id={`${question.id}-${option.value}`} 
                  />
                  <Label 
                    htmlFor={`${question.id}-${option.value}`}
                    className="text-xs text-center text-assessment-neutral cursor-pointer max-w-20"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSubmit} 
            disabled={!allQuestionsAnswered}
            className="px-8 py-2"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};