export interface QuestionOption {
  id: string;
  text: string;
  score: number;
}

export interface ScenarioQuestion {
  id: string;
  type: 'scenario';
  question: string;
  context?: string;
  options: QuestionOption[];
  section: 'communication' | 'collaboration';
}

export interface LikertQuestion {
  id: string;
  statement: string;
}

export interface LikertScale {
  id: string;
  type: 'likert';
  title: string;
  questions: LikertQuestion[];
  section: 'communication' | 'collaboration';
}

export type AssessmentQuestion = ScenarioQuestion | LikertScale;

export const assessmentData: AssessmentQuestion[] = [
  {
    id: 'comm-scenario-1',
    type: 'scenario',
    section: 'communication',
    context: "Your team lead says:",
    question: '"Your last report missed some critical insights we discussed." How do you most naturally respond?',
    options: [
      {
        id: 'a',
        text: '"That\'s unfair. I covered everything we discussed."',
        score: 10
      },
      {
        id: 'b',
        text: '"Can you help me understand which insights you were expecting?"',
        score: 90
      },
      {
        id: 'c',
        text: '"I did my best, but maybe you weren\'t clear."',
        score: 30
      },
      {
        id: 'd',
        text: '"Okay." (You say little and shut down emotionally.)',
        score: 20
      }
    ]
  },
  {
    id: 'comm-likert-1',
    type: 'likert',
    section: 'communication',
    title: 'Receiving Constructive Criticism',
    questions: [
      {
        id: 'cl1-1',
        statement: 'I ask follow-up questions to better understand the feedback'
      },
      {
        id: 'cl1-2',
        statement: 'I feel personally attacked, even if it\'s meant to help'
      },
      {
        id: 'cl1-3',
        statement: 'I can stay calm even if the feedback is emotionally loaded'
      },
      {
        id: 'cl1-4',
        statement: 'I try to act on the feedback quickly and constructively'
      }
    ]
  },
  {
    id: 'comm-scenario-2',
    type: 'scenario',
    section: 'communication',
    question: 'Which response tone best fits someone handling feedback well?',
    options: [
      {
        id: 'a',
        text: 'Frustrated, fast-talking, sarcastic',
        score: 15
      },
      {
        id: 'b',
        text: 'Calm, curious, steady',
        score: 95
      },
      {
        id: 'c',
        text: 'Apologetic, anxious, unsure',
        score: 35
      },
      {
        id: 'd',
        text: 'Dismissive, overly confident',
        score: 25
      }
    ]
  },
  {
    id: 'collab-scenario-1',
    type: 'scenario',
    section: 'collaboration',
    question: 'You disagree with feedback from a peer in a team presentation. What do you do?',
    options: [
      {
        id: 'a',
        text: 'Challenge them during the meeting',
        score: 20
      },
      {
        id: 'b',
        text: 'Accept it silently but feel resentful',
        score: 30
      },
      {
        id: 'c',
        text: 'Ask to talk 1:1 later for clarification',
        score: 90
      },
      {
        id: 'd',
        text: 'Dismiss it because they\'re not your manager',
        score: 15
      }
    ]
  },
  {
    id: 'collab-likert-1',
    type: 'likert',
    section: 'collaboration',
    title: 'Team Feedback Dynamics',
    questions: [
      {
        id: 'coll1-1',
        statement: 'I stay open to feedback, even if I disagree initially'
      },
      {
        id: 'coll1-2',
        statement: 'I follow through on peer or team feedback'
      },
      {
        id: 'coll1-3',
        statement: 'I treat feedback as an opportunity to grow, not as a threat'
      },
      {
        id: 'coll1-4',
        statement: 'I thank people for giving me input'
      }
    ]
  },
  {
    id: 'collab-scenario-2',
    type: 'scenario',
    section: 'collaboration',
    context: "During a team conflict:",
    question: 'Someone criticizes your idea publicly in a heated meeting. Your response is:',
    options: [
      {
        id: 'a',
        text: 'Defend your idea passionately and point out flaws in their criticism',
        score: 25
      },
      {
        id: 'b',
        text: 'Thank them for the input and ask for specific suggestions',
        score: 85
      },
      {
        id: 'c',
        text: 'Stay quiet and address it privately later',
        score: 60
      },
      {
        id: 'd',
        text: 'Acknowledge their point and ask the team for more perspectives',
        score: 95
      }
    ]
  }
];

export const calculateResults = (responses: Record<string, any>) => {
  let communicationTotal = 0;
  let communicationCount = 0;
  let collaborationTotal = 0;
  let collaborationCount = 0;

  Object.entries(responses).forEach(([questionId, response]) => {
    const question = assessmentData.find(q => q.id === questionId);
    if (!question) return;

    if (question.type === 'scenario') {
      const option = question.options.find(opt => opt.id === response);
      if (option) {
        if (question.section === 'communication') {
          communicationTotal += option.score;
          communicationCount += 100;
        } else {
          collaborationTotal += option.score;
          collaborationCount += 100;
        }
      }
    } else if (question.type === 'likert') {
      const likertResponses = response as Record<string, number>;
      Object.entries(likertResponses).forEach(([_, score]) => {
        const normalizedScore = (score - 1) * 25; // Convert 1-5 to 0-100
        if (question.section === 'communication') {
          communicationTotal += normalizedScore;
          communicationCount += 100;
        } else {
          collaborationTotal += normalizedScore;
          collaborationCount += 100;
        }
      });
    }
  });

  const communicationScore = communicationCount > 0 ? Math.round(communicationTotal / communicationCount * 100) : 0;
  const collaborationScore = collaborationCount > 0 ? Math.round(collaborationTotal / collaborationCount * 100) : 0;
  const overallScore = Math.round((communicationScore + collaborationScore) / 2);

  // Determine style label based on scores
  let styleLabel = "Developing Receiver";
  if (overallScore >= 80) {
    styleLabel = "Empathic Receiver";
  } else if (overallScore >= 65) {
    styleLabel = "Curious Clarifier";
  } else if (overallScore >= 50) {
    styleLabel = "Thoughtful Processor";
  } else if (overallScore >= 35) {
    styleLabel = "Guarded Listener";
  }

  // Generate personalized insights
  const summary = generateSummary(communicationScore, collaborationScore, styleLabel);
  const topGrowthArea = generateGrowthArea(communicationScore, collaborationScore);
  const bestFitEnvironment = generateEnvironment(overallScore);
  const topTip = generateTip(styleLabel);

  return {
    communicationScore,
    collaborationScore,
    overallScore,
    styleLabel,
    summary,
    topGrowthArea,
    bestFitEnvironment,
    topTip
  };
};

const generateSummary = (commScore: number, collabScore: number, styleLabel: string) => {
  if (commScore >= 75 && collabScore >= 75) {
    return "You demonstrate exceptional openness to feedback with strong emotional regulation and collaborative instincts. You actively seek clarification and maintain positive relationships even during challenging conversations.";
  } else if (commScore >= 60 || collabScore >= 60) {
    return "You show good receptiveness to feedback with room for growth in either communication clarity or collaborative dynamics. You generally handle feedback well but may benefit from strengthening your weaker area.";
  } else {
    return "You may find feedback challenging to process without emotional reactions. Focus on developing active listening skills and separating personal identity from constructive criticism to improve your feedback reception.";
  }
};

const generateGrowthArea = (commScore: number, collabScore: number) => {
  if (commScore < collabScore) {
    return "Developing clearer communication during feedback conversations - asking better questions and managing emotional responses";
  } else if (collabScore < commScore) {
    return "Strengthening collaborative feedback skills - building trust and following through on team input";
  } else {
    return "Building overall confidence in feedback situations and developing systematic approaches to processing input";
  }
};

const generateEnvironment = (overallScore: number) => {
  if (overallScore >= 75) {
    return "High-feedback environments like agile teams, startups, or leadership roles where continuous improvement is valued";
  } else if (overallScore >= 50) {
    return "Structured environments with clear feedback processes and supportive team cultures";
  } else {
    return "Supportive, low-pressure environments with patient mentors and gradual feedback introduction";
  }
};

const generateTip = (styleLabel: string) => {
  const tips = {
    "Empathic Receiver": "Continue modeling excellent feedback reception for others while ensuring you don't over-accommodate at the expense of your own boundaries.",
    "Curious Clarifier": "Practice reflecting back key points before responding—this defuses emotion and shows you value the input.",
    "Thoughtful Processor": "Give yourself permission to take time to process feedback before responding, but set a timeline to follow up.",
    "Guarded Listener": "Start with small, low-stakes feedback situations to build confidence and positive associations with input.",
    "Developing Receiver": "Focus on one simple phrase: 'Thank you for the feedback' before analyzing or responding to the content."
  };
  
  return tips[styleLabel as keyof typeof tips] || tips["Developing Receiver"];
};