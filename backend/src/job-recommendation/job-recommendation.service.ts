import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JobRecommendationService {
  constructor(private configService: ConfigService) {}

  async getRecommendations(skills: string, jobRoles: string): Promise<string> {
    const apiKey = this.configService.get<string>('DEEPSEEK_API_KEY');
    const apiUrl = this.configService.get<string>('DEEPSEEK_API_URL');

    const prompt = `
  I have the following skills: ${skills}.
  Based on these skills, please provide a JSON object containing exactly relevant job titles from the following jobRoles: ${jobRoles}.
  Format it exactly like this:
  {
    "jobs": ["Job Title 1", "Job Title 2", "Job Title 3"]
  }
  Only provide the JSON object in this format with no extra explanation, comments, or additional text. If no jobs are relevant, return an empty array like this:
  {
    "jobs": []
  }
`;

    try {
      const response = await fetch(`${apiUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      });

      const result = await response.json();
      const filteredJobString =
        result.choices[0].message?.content.match(/{[\s\S]*}/);
      const filteredJobs = filteredJobString
        ? JSON.parse(filteredJobString[0])
        : { jobs: [] };
      return filteredJobs.jobs || 'No recommendations found.';
    } catch (error) {
      console.error('Error fetching job recommendations:', error);
      throw new Error('Failed to fetch job recommendations.');
    }
  }
}
