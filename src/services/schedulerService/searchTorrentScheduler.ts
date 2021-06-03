import axios from "axios";
import cheerio from "cheerio";
async function searchTorrentScheduler(links: any) {
  //recebe nome do anime e link da pasta
  const linkName: Array<string> = [];
  const linksTorrent: any[] = [];
  let html: string;
  let torrentLink: any;
  let link: string;
  let baseUrl: string;
  let torrentName: string[];
  const dataAtual = new Date();
  const dayNow = dataAtual.getDate();
  const mounthNow = dataAtual.getMonth() + 1;
  const yearNow = dataAtual.getFullYear();
  const dateNow = `${yearNow}/${mounthNow}/${dayNow}`;

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
  const animeName: string = decodeURI($2(torrentLink[0]).attr("href"))
    .replace(/(?:.*?[/]+){3}/, "")
    .split("/")[0];
  torrentLink.each(async (index: number) => {
    if (typeof torrentLink[index] !== "undefined") {
      const hashLink: string = $2(torrentLink[index]).attr("href") as string;
      link = baseUrl.concat(...hashLink) as string;
      torrentName = decodeURI(hashLink)
        .replace(/(?:.*?[/]+){3}/, "")
        .split("/");

      const torrentDate = $2(torrentLink[index])
        .children()
        .children()
        .eq(4)
        .text()
        .replaceAll(" ", "")
        .replace(/(?:.*?[-]+){1}/, "")
        .replaceAll("\n", "")
        .split("/");
      const day = Number(torrentDate[0]);
      const mouth = Number(torrentDate[1]);
      const year = Number(torrentDate[2]);
      const dateTorrentNow = `${year}/${mouth}/${day}`;

      linksTorrent.push({
        name: torrentName[1],
        dateTorrentNow,
        torrents: link
      });
      return linksTorrent;
    }
  });

  return { Anime: animeName, dateNow, linksTorrent };
}
export { searchTorrentScheduler };
