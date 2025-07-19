# Sabha - AI-Powered Democratic Discussion Platform

**Team Sabha** is creating an AI debating/discussion platform that transforms how policy-making works in the digital age.

**Live Demo:** [https://sabha-delta.vercel.app/](https://sabha-delta.vercel.app/)

---

## About Team Sabha

We are Team Sabha, building an AI-powered discussion platform that reimagines democratic participation. Our mission is to move beyond the traditional representative model that has dominated policy-making for centuries.

## The Problem We're Solving

### Traditional Parliamentary System is Inefficient

Policy making has been done using the representative model for a really long time. It doesn't have to be the same in the era of tech and AI.

**Current Model:**
- In parliament, 500 people gather
- One person speaks while everybody else listens
- This model wastes countless human hours with inefficient communication
- Only elected representatives can participate in policy discussions
- Geographic barriers prevent broader participation

### Why This Matters

This traditional approach creates several critical issues:
- **Massive inefficiency**: One-to-many communication wastes human resources
- **Limited representation**: Only a small group can contribute to important decisions
- **Information overload**: Decision-makers struggle to process all input
- **Repetitive discussions**: Same points are made repeatedly without progress
- **Geographic exclusion**: Physical presence requirements limit participation

## Our Solution: Sabha Platform

We have created a forum where **not only representatives, but the whole country can participate**. This is possible because AI can:

- **Identify content type**: Determine if a comment is fact or opinion
- **Detect repetition**: Flag when arguments are being repeated
- **Organize discussions**: Sort comments into relevant threads
- **Act as intelligent moderator**: Maintain quality and relevance

### How AI Transforms Democratic Discourse

Our AI moderator provides:

1. **Content Classification**
   - Automatically identifies facts vs opinions
   - Labels comments for easy understanding
   - Helps readers distinguish between data and personal views

2. **Intelligent Organization**
   - Groups related comments into threads
   - Prevents important points from getting lost
   - Creates structured discussions instead of chaos

3. **Quality Control**
   - Filters out repetitive content
   - Promotes constructive contributions
   - Maintains discussion relevance

4. **Real-time Analytics**
   - Shows discussion sentiment and trends
   - Identifies key themes and concerns
   - Provides data-driven insights for decision-makers

## Key Features

### For Citizens
- **Direct Participation**: Contribute to policy discussions regardless of location
- **AI-Enhanced Comments**: Get suggestions to improve your contributions
- **Fact-Opinion Clarity**: Understand the nature of different viewpoints
- **Organized Discussions**: Follow relevant threads easily

### For Policymakers
- **Structured Input**: Receive organized, filtered public opinion
- **Quality Insights**: Access meaningful feedback without noise
- **Data-Driven Decisions**: Use analytics to understand public sentiment
- **Efficient Process**: Save time with AI-summarized discussions

### For Everyone
- **Transparent Process**: All AI decisions are explainable
- **Inclusive Platform**: Geographic barriers removed
- **Quality Discourse**: Focus on constructive contributions
- **Democratic Innovation**: Experience the future of civic participation

## Technology Stack

### Frontend
- Next.js 15 with App Router
- React 19 with TypeScript
- Responsive design for all devices

### AI Integration
- Google Gemini 2.5 Flash for intelligent content analysis
- Natural Language Processing for fact/opinion detection
- Real-time sentiment analysis and content classification

### Backend
- PostgreSQL database with Drizzle ORM
- Better Auth with Google OAuth integration
- RESTful API for all platform features

### Deployment
- Vercel platform with global CDN
- Continuous deployment from GitHub
- Scalable infrastructure

## How It Works

1. **Topic Creation**: Users create discussion topics on policy issues
2. **AI Enhancement**: Platform suggests improvements and categorizes content
3. **Community Participation**: Citizens contribute comments and responses
4. **AI Moderation**: System classifies content, organizes threads, prevents repetition
5. **Analytics Generation**: Real-time insights on discussion quality and sentiment
6. **Structured Output**: Policymakers receive organized, actionable feedback

## Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Google OAuth credentials
- Google Gemini API key

### Quick Start
```bash
# Clone the repository
git clone https://github.com/your-username/sabha.git
cd sabha

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Configuration
```env
# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

# Authentication
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

# Database
DATABASE_URL=your_postgresql_url

# AI Service
GEMINI_API_KEY=your_gemini_key
```

### Run the Application
```bash
# Initialize database
npm run db:reset

# Start development server
npm run dev

# Visit http://localhost:3000
```

## API Examples

### Analyze Comment Content
```javascript
POST /api/ai/comments
{
  "action": "analyze",
  "comment": "According to recent studies, renewable energy costs have decreased by 40%",
  "topicId": "energy-policy"
}

Response:
{
  "classification": "fact",
  "relevanceScore": 95,
  "suggestions": ["Consider adding source citation"],
  "reasoning": "Statement contains verifiable data about renewable energy"
}
```

### Get Discussion Insights
```javascript
POST /api/ai/comments
{
  "action": "analyze-discussion",
  "topicId": "healthcare-reform"
}

Response:
{
  "sentiment": "mixed",
  "factOpinionRatio": { "facts": 60, "opinions": 40 },
  "keyThemes": ["cost reduction", "accessibility", "quality care"],
  "engagementLevel": "high"
}
```

## Project Structure

```
sabha/
├── src/
│   ├── app/                    # Next.js pages and API routes
│   │   ├── api/ai/            # AI-powered endpoints
│   │   ├── topic/[id]/        # Individual topic pages
│   │   ├── create-topic/      # Topic creation interface
│   │   └── dashboard/         # User dashboard
│   ├── components/            # React components
│   │   ├── ai/               # AI-powered components
│   │   ├── forum/            # Discussion components
│   │   └── ui/               # User interface components
│   ├── lib/                  # Utility functions and configurations
│   ├── db/                   # Database schema and operations
│   └── styles/               # Design system and CSS
├── docs/                     # Documentation
└── public/                   # Static assets
```

## Contributing

We welcome contributions to make democratic participation more effective:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/improvement`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Future Vision

Sabha represents the beginning of a new era in democratic participation where:
- Every citizen can contribute meaningfully to policy discussions
- AI helps maintain quality and organization
- Geographic boundaries don't limit civic engagement
- Data-driven insights inform better decisions
- Technology serves democracy, not the other way around

## Contact

- **Live Platform**: [https://sabha-delta.vercel.app/](https://sabha-delta.vercel.app/)
- **Team**: Team Sabha
- **Documentation**: [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)
- **Issues**: [GitHub Issues](https://github.com/your-username/sabha/issues)

---

*Building the future of democratic participation through AI-powered discourse.*
