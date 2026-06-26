import { NextRequest, NextResponse } from "next/server";
import { tailorWithGrok } from "@/lib/grok";
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

    const apiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY || process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Grok/Groq API key (XAI_API_KEY, GROK_API_KEY, or GROQ_API_KEY) is not configured. Please add it to .env" },
        { status: 500 }
      );
    }

    const raw = await tailorWithGrok(latex, jobDescription);

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
      { error: error instanceof Error ? error.message : "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
