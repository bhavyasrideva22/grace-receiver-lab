import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-assessment-bg-subtle py-8 px-4">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <Card className="text-center bg-gradient-to-br from-assessment-primary/10 to-accent/10 border-assessment-border">
          <CardHeader className="pb-4">
            <div className="text-6xl mb-4">🧪</div>
            <CardTitle className="text-3xl font-bold text-foreground mb-2">
              Receiving Feedback Gracefully
            </CardTitle>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Collaboration & Communication Intelligence (CCI) Suite
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-assessment-neutral leading-relaxed max-w-2xl mx-auto">
              Discover your feedback-receiving intelligence and learn how to transform criticism into growth opportunities
            </p>
          </CardContent>
        </Card>

        {/* Introduction */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Assessment Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground leading-relaxed">
              In today's dynamic work and social environments, collaboration and communication are no longer just "soft skills" — 
              they're the foundation of trust, innovation, and success. One of the most pivotal aspects of interpersonal effectiveness 
              is how we receive feedback.
            </p>
            <p className="text-foreground leading-relaxed">
              This assessment will explore your feedback-receiving intelligence—how you react to critique, manage emotions, 
              extract value from input, and integrate it into future behavior. It combines elements of emotional regulation, 
              clarity, empathy, and resilience.
            </p>
          </CardContent>
        </Card>

        {/* What You'll Discover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                📊 What You'll Discover
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-assessment-primary">•</span>
                <span className="text-foreground">Communication Intelligence Score</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-assessment-primary">•</span>
                <span className="text-foreground">Collaboration Intelligence Score</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-assessment-primary">•</span>
                <span className="text-foreground">Personal Feedback Style Label</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-assessment-primary">•</span>
                <span className="text-foreground">Growth Areas & Recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-assessment-primary">•</span>
                <span className="text-foreground">Best-fit Work Environments</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                🎯 Assessment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-accent">•</span>
                <span className="text-foreground">6 comprehensive questions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">•</span>
                <span className="text-foreground">Scenario-based & self-assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">•</span>
                <span className="text-foreground">10-15 minutes to complete</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">•</span>
                <span className="text-foreground">Instant personalized results</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">•</span>
                <span className="text-foreground">No registration required</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="text-center">
          <CardContent className="py-8">
            <p className="text-assessment-neutral mb-6">
              Ready to discover your feedback-receiving style and unlock your collaborative potential?
            </p>
            <Button 
              onClick={onStart}
              size="lg"
              className="px-8 py-3 text-lg"
            >
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};