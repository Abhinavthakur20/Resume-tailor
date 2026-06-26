import { NextRequest, NextResponse } from "next/server";
import { createClaudeClient, SYSTEM_PROMPT, buildUserMessage } from "@/lib/claude";
import { TailorResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { latex, jobDescription } = await req.json();

    if (!latex || !jobDescription) {
      return NextResponse.json(
        { error: "Both resume (LaTeX) and job description are required." },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not configured. Please add it to .env.local" },
        { status: 500 }
      );
    }

    const client = createClaudeClient();

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      messages: [
        {
          role: "user",
          content: buildUserMessage(latex, jobDescription),
        },
      ],
      system: SYSTEM_PROMPT,
    });

    const raw =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Try to extract JSON from the response (handles potential markdown fences)
    let jsonStr = raw.trim();
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }

    const result: TailorResponse = JSON.parse(jsonStr);

    // Validate required fields
    if (
      typeof result.atsScoreBefore !== "number" ||
      typeof result.atsScoreAfter !== "number" ||
      !Array.isArray(result.keywordsFound) ||
      !Array.isArray(result.keywordsMissing) ||
      !Array.isArray(result.keywordsAdded) ||
      typeof result.updatedLatex !== "string"
    ) {
      return NextResponse.json(
        { error: "AI returned an invalid response structure. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Tailor API error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
