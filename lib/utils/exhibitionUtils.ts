export function mapCategory(title: string, description: string): string {
    const titleLower = title.toLowerCase();
    const descLower = description.toLowerCase();
  
    if (titleLower.includes("사진") || descLower.includes("photography")) return "photography";
    if (titleLower.includes("조각") || descLower.includes("sculpture")) return "sculpture";
    if (
      titleLower.includes("디지털") ||
      descLower.includes("digital") ||
      descLower.includes("ai") ||
      descLower.includes("미디어")
    )
      return "digital";
    if (
      titleLower.includes("전통") ||
      descLower.includes("traditional") ||
      titleLower.includes("한국화")
    )
      return "traditional";
  
    return "contemporary";
  }
  