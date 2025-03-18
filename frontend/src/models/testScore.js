import mongoose from "mongoose";

const TestScoreSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    overallScore: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    // Save an array of objects, each containing a skill name and its scores.
    skillScores: [
      {
        skill: { type: String, required: true },
        correct: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    selectedSkills: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  {
    // Remove __v from the database
    versionKey: false,
  }
);

// Hide _id and createdAt when converting documents to JSON
TestScoreSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.createdAt;
    return ret;
  },
});

export default mongoose.models.TestScore || mongoose.model("TestScore", TestScoreSchema);
