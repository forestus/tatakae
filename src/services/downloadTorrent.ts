import fs from "fs";
import https from "https";

export async function downloadTorrent(
  name: string,
  torrentName: string,
  torrent: string
) {
  const dest = __dirname + `/data/Torrents/${name}/${torrentName}`;
  const dir = __dirname + `/data/Torrents/${name}/`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const torrentExists = fs.existsSync(dest);
  if (!torrentExists) {
    const file = fs.createWriteStream(dest, { flags: "wx" });
    const request = https.get(torrent, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file, { end: true });
      } else {
        file.close();
        fs.unlink(dest, (err) => {
          console.error("1#" + err.message);
        });
        console.error(
          `Server responded with ${response.statusCode}: ${response.statusMessage}`
        );
      }
    });

    request.on("error", (err) => {
      file.close();
      fs.unlink(dest, (err) => {
        console.error("2#" + err.message);
      });
      console.error("3#" + err.message);
    });

    file.on("error", (err) => {
      file.close();
      fs.unlink(dest, (err) => {
        console.error("4#" + err.message);
      });
      console.error("5#" + err.message);
    });

    file.on("finish", async () => {
      console.log(`Torrent ${torrentName} Download Torrent Finished!`);
    });
    file.on("end", () => {
      console.log("completed");
    });
  } else {
    console.log("File already exists");
  }
}
