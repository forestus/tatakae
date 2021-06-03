import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { AnimesRepository } from "../repositories/AnimesRepository";
import { TorrentsRepository } from "../repositories/TorrentsRepository";
import { urlTorrent } from "../services/data/dataURI";
import { downloadTorrent } from "../services/downloadTorrent";
import { searchAnimeScheduler } from "../services/schedulerService/searchAnimeScheduler";
import { searchTorrentScheduler } from "../services/schedulerService/searchTorrentScheduler";
import { searchDescription } from "../services/searchDescription";
class SchedulerController {
  async scheduler(request: Request, response: Response) {
    const animesFolder = await searchAnimeScheduler(
      "https://ddl.erai-raws.info/?dir=Torrent/2021/Spring"
    );
    const animesLink = animesFolder.linksTorrent.map((folder) => {
      folder.link;
    });
    const {
      Anime: animeName,
      dateNow,
      linksTorrent
    } = await searchTorrentScheduler(
      "https://ddl.erai-raws.info/?dir=Torrent/2021/Spring/86"
    );

    return response
      .json({
        animesLink,
        animesFolder,
        Anime: animeName,
        dateNow,
        linksTorrent
      })
      .status(200);
  }

  async search(request: Request, response: Response) {
    const anime = "86";
    const maxResults = 5;
    const search = await searchDescription(anime, maxResults);
    return response.json(search).status(200);
  }

  async downloadAll(request: Request, response: Response) {
    urlTorrent.map(async (url) => {
      const animesFolder = await searchAnimeScheduler(url);
      let link;
      interface ITorrent {
        name: string;
        torrents: string;
      }
      let Torrent: ITorrent;
      link = animesFolder.linksTorrent[0].link;
      const { linksTorrent } = await searchTorrentScheduler(link);
      const animesRepository = getCustomRepository(AnimesRepository);
      const name = animesFolder.linksTorrent[0].animeName;
      const animeAlreadyExists = await animesRepository.findOne({
        where: { name: name }
      });
      if (!animeAlreadyExists) {
        const anime = animesRepository.create({
          name,
          link
        });
        try {
          await animesRepository.save(anime);
        } catch (error) {
          throw new AppError(error);
        }
      }

      linksTorrent.map(async (linkT) => {
        Torrent = linkT;
        let name = await animesFolder.linksTorrent[0].animeName;
        const torrentsRepository = getCustomRepository(TorrentsRepository);
        const torrentAlreadyExists = await torrentsRepository.findOne({
          where: {
            name: Torrent.name
          }
        });
        if (!torrentAlreadyExists) {
          try {
            downloadTorrent(name, linkT.name, linkT.torrents);
          } catch (error) {
            throw new AppError(error);
          }
          link = linkT.torrents;
          name = linkT.name;
          const torrent = torrentsRepository.create({ name, link });
          link = animesFolder.linksTorrent[0].link;
          try {
            await torrentsRepository.save(torrent);
          } catch (error) {
            throw new AppError(error);
          }
        }
      });
    });
    return response.json({ urlTorrent }).status(200);
  }
}

export { SchedulerController };
