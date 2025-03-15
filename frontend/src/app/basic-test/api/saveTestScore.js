import { connect } from '../../dbConfig/dbConfig';
import TestScore from '../../models/TestScore';

export default async function handler(req, res) {
  // Establish database connection using your custom connect function
  await connect();

  if (req.method === 'POST') {
    try {
      const { userId, score, totalQuestions, skills } = req.body;
      const testScore = new TestScore({ userId, score, totalQuestions, skills });
      await testScore.save();
      res.status(201).json({ success: true, data: testScore });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
