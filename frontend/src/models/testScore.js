import mongoose from 'mongoose';

const TestScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  skills: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.TestScore || mongoose.model('TestScore', TestScoreSchema);
