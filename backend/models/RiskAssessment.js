import mongoose from 'mongoose';

const riskAssessmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    location: {
      name: { type: String, required: true },
      latitude: { type: Number },
      longitude: { type: Number },
      country: { type: String }
    },
    weatherSnapshot: {
      temperature: Number,
      feelsLike: Number,
      humidity: Number,
      rainProbability: Number,
      precipitation: Number,
      windSpeed: Number,
      uvIndex: Number,
      condition: String,
      aqi: Number,
      aqiCategory: String
    },
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    status: {
      type: String,
      enum: ['LOW', 'MODERATE', 'HIGH', 'SEVERE'],
      required: true
    },
    verdict: {
      type: String,
      enum: ['RECOMMENDED', 'CAUTION', 'NOT_RECOMMENDED'],
      required: true
    },
    risks: {
      heat: { score: Number, level: String },
      rain: { score: Number, level: String },
      airQuality: { score: Number, level: String },
      outdoor: { score: Number, level: String },
      travel: { score: Number, level: String }
    },
    mode: { type: String, default: 'Student' },
    activity: { type: String, default: 'College' },
    aiSummary: { type: String },
    reasons: [{ type: String }],
    recommendations: [{ type: String }]
  },
  {
    timestamps: true
  }
);

// Index for fast historical retrieval
riskAssessmentSchema.index({ createdAt: -1 });
riskAssessmentSchema.index({ 'location.name': 1 });

const RiskAssessment = mongoose.models.RiskAssessment || mongoose.model('RiskAssessment', riskAssessmentSchema);
export default RiskAssessment;
