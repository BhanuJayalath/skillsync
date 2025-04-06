export async function getSelectedSkills() {
    try {
      const response = await fetch("/api/basic-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Replace these values with the actual data required by your endpoint.
        body: JSON.stringify({
          userId: "YOUR_USER_ID",
          overallScore: 85,
          totalQuestions: 10,
          skillScores: [80, 90],
          selectedSkills: ["JavaScript", "Next.js"],
        }),
      });
      const result = await response.json();
      if (result.success) {
        // Return the selectedSkills array from the API response.
        return result.data.selectedSkills;
      } else {
        console.error("API Error:", result.error);
        return [];
      }
    } catch (error) {
      console.error("Error fetching selected skills:", error);
      return [];
    }
  }
  