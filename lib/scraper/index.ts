import { scrapeSeoulCulturePortal } from "./seoulCulture";
import { scrapeMMCA } from "./mmca";
import { Exhibition } from "@/types/exhibition";

export async function scrapeAllExhibitions(): Promise<Exhibition[]> {
  const [seoul, mmca] = await Promise.allSettled([
    scrapeSeoulCulturePortal(),
    scrapeMMCA(),
  ]);

  const result: Exhibition[] = [];
  if (seoul.status === "fulfilled") result.push(...seoul.value);
  if (mmca.status === "fulfilled") result.push(...mmca.value);

  const unique = Array.from(new Map(result.map(e => [e.title, e])).values());
  return unique;
}
