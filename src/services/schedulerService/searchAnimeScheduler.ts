import axios from "axios";
import cheerio from "cheerio";
async function searchAnimeScheduler(links: any) {
  const linkName: Array<string> = [];
  const linksTorrent: any[] = [];
  let html: string;
  let torrentLink: any;
  let link: string;
  let baseUrl: string;

  async function axiosTest(url: string) {
    const response = await axios.get(url);
    return response.data;
  }
  linkName.push(links);
  try {
    html = await axiosTest(links);
  } catch (error) {
    console.error(error);
  }
  const $2 = cheerio.load(html);

  torrentLink = $2("#file-list > li:nth-child(2) > a");
  baseUrl = "https://ddl.erai-raws.info/";
  torrentLink.each(async (index: number) => {
    if (typeof torrentLink[index] !== "undefined") {
      const hashLink: string = $2(torrentLink[index]).attr("href") as string;
      const animeName = $2(torrentLink[index])
        .children()
        .children()
        .eq(1)
        .text()
        .replaceAll(" ", "")
        .replaceAll("\n", "");
      link = baseUrl.concat(...hashLink) as string;
      linksTorrent.push({ animeName, link });
      return linksTorrent;
    }
  });
  return { linksTorrent };
}
export { searchAnimeScheduler };
