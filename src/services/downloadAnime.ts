import fs from "fs";
import parseTorrent from "parse-torrent";
import WebTorrent from "webtorrent";
const client = new WebTorrent();
export async function downloadAnime(): Promise<string> {
  const files = fs.readdirSync(__dirname + "/data/torrents/");
  console.log(files);
  files.map((file) => {
    const torrentId = parseTorrent(
      fs.readFileSync(__dirname + `/data/torrents/${file}`)
    );
    client.add(torrentId, (torrent) => {
      const files = torrent.files;
      let length = files.length;
      files.map((file) => {
        console.log("started Download: " + file.name);
        const source = file.createReadStream();
        const dir = __dirname + `/data/Anime/${torrent.name}/`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        const destination = fs.createWriteStream(dir + `${file.name}`);
        source
          .on("end", () => {
            console.log("Anime Completed:\t\t", file.name);
            length -= 1;
            if (!length) process.exit();
            return file.name;
          })
          .pipe(destination);
        console.log("Donwload Finished!");
      });
    });
  });
  return "Download Anime Finished";
}
