import { Progress } from "@/components/ui/progress";

interface AssessmentHeaderProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
}

export const AssessmentHeader = ({ currentStep, totalSteps, title, subtitle }: AssessmentHeaderProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">🧪 {title}</h1>
        {subtitle && (
          <p className="text-assessment-neutral text-lg">{subtitle}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-assessment-neutral">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};