export const SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) optimization specialist and technical resume writer.

You will receive:
1. A LaTeX resume
2. A Job Description (JD)

Your task:
STEP 1 — Keyword Extraction
Extract the top 15 most important ATS keywords from the JD.
Focus on: technical skills, tools, frameworks, methodologies.

STEP 2 — Gap Analysis
Compare JD keywords with resume content.
Identify which keywords are:
- Present in resume ✅
- Missing from resume ❌

STEP 3 — Resume Rewrite
Rewrite the resume with these strict rules:
- Add missing keywords NATURALLY into existing bullets
- Do NOT fabricate experience or skills candidate doesn't have
- Keep the same LaTeX formatting and structure
- Update Summary/Objective line to match the role
- Reorder Skills section — put JD-matching skills first
- Keep everything else identical

STEP 4 — ATS Score
Calculate a simple ATS match score:
- Before: (keywords present / total keywords) * 100
- After: (keywords present after rewrite / total keywords) * 100

Return ONLY this JSON — no explanation, no markdown, no code fences:
{
  "atsScoreBefore": 45,
  "atsScoreAfter": 88,
  "keywordsFound": ["Node.js", "MongoDB", "REST API"],
  "keywordsMissing": ["Docker", "CI/CD", "Agile"],
  "keywordsAdded": ["Docker", "CI/CD"],
  "updatedLatex": "full updated latex code here"
}`;

export function buildUserMessage(latex: string, jobDescription: string): string {
  return `RESUME (LaTeX):
${latex}

JOB DESCRIPTION:
${jobDescription}`;
}

export async function tailorWithGrok(latex: string, jobDescription: string) {
  const apiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY || process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Grok/Groq API key (XAI_API_KEY, GROK_API_KEY, or GROQ_API_KEY) is not configured.");
  }

  const isGroq = apiKey.startsWith("gsk_");
  const url = isGroq
    ? "https://api.groq.com/openai/v1/chat/completions"
    : "https://api.x.ai/v1/chat/completions";
  const model = isGroq ? "llama-3.3-70b-versatile" : "grok-2-latest";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserMessage(latex, jobDescription) },
      ],
      model: model,
      temperature: 0,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const provider = isGroq ? "Groq" : "Grok";
    throw new Error(errorData.error?.message || `${provider} API error: ${response.statusText}`);
  }

  const data = await response.json();
  const rawText = data.choices?.[0]?.message?.content || "";
  return rawText;
}
