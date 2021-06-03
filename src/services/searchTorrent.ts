import axios from "axios";
import cheerio from "cheerio";
async function searchTorrent(links: any[]): Promise<unknown> {
  //recebe nome do anime e link da pasta
  const linkName: Array<string> = [];
  let hackTest3: Array<string> = [];
  const linksTorrent: any[] = [];
  const arrayTorrentSecond: any[] = [];
  let arrayTorrentFirst: any[] = [];
  let html: string;
  let torrentLink: any;
  let link: string;
  let baseUrl: string;
  let hackTest: string;
  let hackTest2: string;

  async function axiosTest(url: string) {
    const response = await axios.get(url);
    return response.data;
  }
  await Promise.all(
    links.map(async (linkValue) => {
      linkName.push(linkValue.name);
      try {
        html = await axiosTest(linkValue.link);
      } catch (error) {
        console.error(error);
      }
      const $2 = cheerio.load(html);

      torrentLink = $2("#file-list > li:nth-child(2) > a");
      baseUrl = "https://ddl.erai-raws.info/";
      if (typeof torrentLink[0] !== "undefined") {
        link = baseUrl.concat(...$2(torrentLink[0]).attr("href")) as string;
      }
      torrentLink.each(async (index2: number) => {
        const hashLink: string = $2(torrentLink[index2]).attr("href") as string;
        link = baseUrl.concat(...hashLink) as string;

        hackTest = decodeURI(hashLink);
        hackTest2 = hackTest.replace(/(?:.*?[/]+){3}/, "");
        hackTest3 = hackTest2.split("/");
        linksTorrent.push({ name: hackTest3[0], torrents: [link] });
        return { linksTorrent };
      });
      arrayTorrentFirst = [];

      for (let i = 0; i < linksTorrent.length; i++) {
        const element = linksTorrent[i];
        arrayTorrentFirst.push(element);
      }
      return arrayTorrentFirst;
    })
  );
  for (let i = 0; i < linkName.length; i++) {
    arrayTorrentSecond.push({ nome: linkName[i], torrents: [] });
    arrayTorrentFirst.map((value3) => {
      if (value3.name == linkName[i]) {
        arrayTorrentSecond[i].torrents.push(...value3.torrents);
      }
      return arrayTorrentSecond;
    });
  }

  return arrayTorrentSecond;
}

export { searchTorrent };
