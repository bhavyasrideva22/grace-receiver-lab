import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ResultsData {
  communicationScore: number;
  collaborationScore: number;
  overallScore: number;
  styleLabel: string;
  summary: string;
  topGrowthArea: string;
  bestFitEnvironment: string;
  topTip: string;
}

interface ResultsPanelProps {
  results: ResultsData;
  onRestart: () => void;
}

export const ResultsPanel = ({ results, onRestart }: ResultsPanelProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-accent";
    if (score >= 60) return "bg-assessment-primary";
    return "bg-assessment-neutral";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Developing";
    return "Needs Improvement";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="text-center bg-gradient-to-r from-assessment-primary/10 to-accent/10 border-assessment-border">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">🎯 Your Feedback Assessment Results</CardTitle>
          <Badge variant="secondary" className="mx-auto text-lg px-4 py-2">
            {results.styleLabel}
          </Badge>
        </CardHeader>
      </Card>

      {/* Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-assessment-neutral">Communication Intelligence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-assessment-primary mb-2">
              {results.communicationScore}
            </div>
            <Progress value={results.communicationScore} className="mb-2" />
            <Badge variant="outline">{getScoreLabel(results.communicationScore)}</Badge>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-assessment-neutral">Collaboration Intelligence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent mb-2">
              {results.collaborationScore}
            </div>
            <Progress value={results.collaborationScore} className="mb-2" />
            <Badge variant="outline">{getScoreLabel(results.collaborationScore)}</Badge>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-assessment-neutral">Overall CCI Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">
              {results.overallScore}
            </div>
            <Progress value={results.overallScore} className="mb-2" />
            <Badge variant="outline">{getScoreLabel(results.overallScore)}</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-foreground">📊 Your Feedback Profile Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{results.summary}</p>
        </CardContent>
      </Card>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              🎯 Top Growth Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">{results.topGrowthArea}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              🏢 Best-fit Environment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">{results.bestFitEnvironment}</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Tip */}
      <Card className="bg-accent/5 border-accent/20">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            💡 Top Tip for Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground font-medium italic">"{results.topTip}"</p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4 pt-4">
        <Button onClick={onRestart} variant="outline">
          Take Assessment Again
        </Button>
        <Button>
          Download Detailed Report
        </Button>
      </div>
    </div>
  );
};