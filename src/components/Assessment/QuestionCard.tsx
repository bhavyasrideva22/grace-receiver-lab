import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Option {
  id: string;
  text: string;
  score: number;
}

interface QuestionCardProps {
  question: string;
  options: Option[];
  onAnswer: (answer: string, score: number) => void;
  questionNumber: number;
}

export const QuestionCard = ({ question, options, onAnswer, questionNumber }: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSubmit = () => {
    const option = options.find(opt => opt.id === selectedOption);
    if (option) {
      onAnswer(selectedOption, option.score);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-assessment-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-foreground">
          Question {questionNumber}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg text-foreground leading-relaxed">{question}</p>
        
        <RadioGroup 
          value={selectedOption} 
          onValueChange={setSelectedOption}
          className="space-y-3"
        >
          {options.map((option) => (
            <div 
              key={option.id} 
              className="flex items-start space-x-3 p-4 rounded-lg border border-assessment-border hover:bg-assessment-bg-subtle transition-colors"
            >
              <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
              <Label 
                htmlFor={option.id} 
                className="text-foreground leading-relaxed cursor-pointer flex-1"
              >
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedOption}
            className="px-8 py-2"
          >
            Next Question
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};