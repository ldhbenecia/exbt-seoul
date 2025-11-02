import * as cheerio from "cheerio";
import { Exhibition } from "@/types/exhibition";

export async function scrapeMMCA(): Promise<Exhibition[]> {
  const res = await fetch("https://www.mmca.go.kr/exhibitions/progressList.do");
  const html = await res.text();
  const $ = cheerio.load(html);
  const exhibitions: Exhibition[] = [];

  $(".exh_list li").each((i, el) => {
    const title = $(el).find(".tit").text().trim();
    const image = $(el).find("img").attr("src");
    const link = "https://www.mmca.go.kr" + $(el).find("a").attr("href");

    if (title) {
      exhibitions.push({
        id: `mmca-${i}`,
        title,
        artist: "다양한 작가",
        venue: "국립현대미술관 서울",
        location: "종로구 삼청로 30",
        category: "contemporary",
        startDate: "",
        endDate: "",
        description: `${title} 전시회입니다.`,
        imageUrl: image?.startsWith("http")
          ? image
          : `https://www.mmca.go.kr${image}`,
        price: "10,000원",
        hours: "화-일 10:00-18:00 (월요일 휴관)",
        website: link,
        isFree: false,
      });
    }
  });

  return exhibitions;
}
