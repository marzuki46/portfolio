import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { action, config, form, content } = await req.json();

    switch (action) {
      case "saveSettings":
        return handleSaveSettings(config);
      case "generate":
        return handleGenerate(config, form);
      case "saveGenerated":
        return handleSaveGenerated(content, form);
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("AI API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleSaveSettings(config: any) {
  try {
    const settings = [
      { key: "ai_provider", value: config.provider },
      { key: "ai_model", value: config.model },
      { key: "ai_max_tokens", value: String(config.maxTokens) },
      { key: "ai_temperature", value: String(config.temperature) },
      { key: "ai_enabled", value: String(config.enabled) },
      { key: "ai_auto_post", value: String(config.autoPost) },
    ];

    if (config.apiKey) {
      settings.push({ key: "ai_api_key", value: config.apiKey });
    }

    for (const setting of settings) {
      await prisma.siteSetting.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: { key: setting.key, value: setting.value },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save settings error:", error);
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    );
  }
}

async function handleGenerate(config: any, form: any) {
  try {
    if (!config.apiKey) {
      return NextResponse.json(
        { error: "API key is not configured" },
        { status: 400 }
      );
    }

    const typeLabel = form.sourceType === "blog" ? "blog post" : "project description";
    let systemPrompt = `You are a professional content writer. Write a ${typeLabel} in markdown format.`;
    
    if (form.title) {
      systemPrompt += `\nTitle: ${form.title}`;
    }
    
    if (form.keywords) {
      systemPrompt += `\nKeywords: ${form.keywords}`;
    }

    let generatedContent = "";

    if (config.provider === "openai") {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: config.model || "gpt-4",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: form.prompt },
          ],
          max_tokens: config.maxTokens || 2048,
          temperature: config.temperature || 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`OpenAI API error: ${errorData}`);
      }

      const data = await response.json();
      generatedContent = data.choices?.[0]?.message?.content || "";
    } else if (config.provider === "anthropic") {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": config.apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: config.model || "claude-3",
          max_tokens: config.maxTokens || 2048,
          messages: [
            { role: "user", content: `${systemPrompt}\n\n${form.prompt}` },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Anthropic API error");
      }

      const data = await response.json();
      generatedContent = data.content?.[0]?.text || "";
    } else {
      generatedContent = `# ${form.title || "Generated Content"}\n\n${form.prompt}\n\nThis is a placeholder for AI-generated content. Configure your API key in settings to enable real AI generation.`;
    }

    return NextResponse.json({ content: generatedContent });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

async function handleSaveGenerated(generatedContent: string, form: any) {
  try {
    if (form.sourceType === "blog") {
      const title = form.title || "AI Generated Post";
      let slug = generateSlug(title);
      
      // Ensure unique slug
      const existing = await prisma.blogPost.findUnique({ where: { slug } });
      if (existing) {
        slug = `${slug}-${Date.now()}`;
      }
      
      const blog = await prisma.blogPost.create({
        data: {
          title,
          slug,
          content: generatedContent,
          excerpt: generatedContent.slice(0, 200) + "...",
          tags: JSON.stringify(form.keywords?.split(",").map((k: string) => k.trim()) || []),
          author: "Marzuki",
        },
      });
      return NextResponse.json({ success: true, slug: blog.slug });
    } else {
      const title = form.title || "AI Generated Project";
      let slug = generateSlug(title);
      
      // Ensure unique slug
      const existing = await prisma.project.findUnique({ where: { slug } });
      if (existing) {
        slug = `${slug}-${Date.now()}`;
      }
      
      const project = await prisma.project.create({
        data: {
          title,
          slug,
          description: generatedContent.slice(0, 500),
          longDescription: generatedContent,
          tags: JSON.stringify(form.keywords?.split(",").map((k: string) => k.trim()) || []),
        },
      });
      return NextResponse.json({ success: true, slug: project.slug });
    }
  } catch (error) {
    console.error("Save generated error:", error);
    return NextResponse.json(
      { error: "Failed to save content" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: {
          in: [
            "ai_provider",
            "ai_model",
            "ai_max_tokens",
            "ai_temperature",
            "ai_enabled",
            "ai_auto_post",
            "ai_api_key",
          ],
        },
      },
    });

    const config: Record<string, string> = {};
    settings.forEach((s) => {
      config[s.key.replace("ai_", "")] = s.value;
    });

    return NextResponse.json({ config });
  } catch (error) {
    return NextResponse.json({ config: {} });
  }
}
