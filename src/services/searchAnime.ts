import axios from "axios";
import cheerio from "cheerio";
import Fuse from "fuse.js";
import { urlTorrent } from "./data/dataURI";
import { searchTorrent } from "./searchTorrent";
async function searchAnime(
  anime: string,
  maxResults: number
): Promise<unknown> {
  // variables
  const Animes = [];
  let html: any;
  const links: any[] = [];
  const linksName: any[] = [];
  let statsTable: any;

  let baseUrl: string;
  const options = {
    includeScore: true
    // minMatchCharLength:anime.length
  };

  async function axiosTest(url: string) {
    const response = await axios.get(url);
    return response.data;
  }
  await Promise.all(
    urlTorrent.map(async (url) => {
      try {
        html = await axiosTest(url);
      } catch (error) {
        console.error(error);
      }
      const $ = cheerio.load(html);

      statsTable = $("#file-list > li:nth-child(2) > a");
      baseUrl = "https://ddl.erai-raws.info/";

      function replacer(p2: string) {
        return p2.replace(/[^0-9]/g, "");
      }

      statsTable.each(async (index: number, value: any) => {
        const name = [];
        let hashLink: string = $(value).attr("href") as string;
        const link: string = baseUrl.concat(...hashLink) as string;
        links.push(link);
        const subValue = hashLink.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
        for (let setYear = 0; setYear <= 3; setYear++) {
          name.push(...subValue[setYear]);
        }
        const yearName = name.toString().replaceAll(",", "");

        hashLink = decodeURIComponent(decodeURI(hashLink).toString());
        hashLink = hashLink.replace(`?dir=Torrent/${yearName}/Winter/`, "");
        hashLink = hashLink.replace(`?dir=Torrent/${yearName}/Spring/`, "");
        hashLink = hashLink.replace(`?dir=Torrent/${yearName}/Summer/`, "");
        hashLink = hashLink.replace(`?dir=Torrent/${yearName}/Fall/`, "");
        hashLink = hashLink.replace(`?dir=Torrent/${yearName}/Old Anime/`, "");
        linksName.push(hashLink);

        return { links, linksName };
      });
    })
  );

  const fuse = new Fuse(linksName, options);
  const find = fuse.search(anime);
  const result: any[] = [];
  find.map((linkinho) => {
    const { refIndex, item } = linkinho;

    result.push({ name: item, link: links[refIndex] });
  });
  for (let i = 0; i < maxResults; i++) {
    Animes.push(result[i]);
  }
  const Torrents = await searchTorrent(Animes);

  return { Animes, Torrents };
}
export { searchAnime };
