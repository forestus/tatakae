import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { TorrentsRepository } from "../repositories/TorrentsRepository";
// import { downloadTorrent } from "../services/downloadTorrent";

class TorrentController {
  async show(request: Request, response: Response) {
    const torrentsRepository = getCustomRepository(TorrentsRepository);
    const all = await torrentsRepository.find();
    return response.json(all);
  }
  async findOne(request: Request, response: Response) {
    const torrentsRepository = getCustomRepository(TorrentsRepository);
    const all = await torrentsRepository.find();
    return response.json(all);
  }
  async create(request: Request, response: Response) {
    const { name, link } = request.body;

    const torrentsRepository = getCustomRepository(TorrentsRepository);
    const torrentAlreadyExists = await torrentsRepository.findOne({
      name
    });
    if (torrentAlreadyExists) {
      throw new AppError("Torrent already exists!");
    }
    const user = torrentsRepository.create({
      name,
      link
    });
    await torrentsRepository.save(user);
    return response.status(201).json(user);
  }

  async delete(request: Request, response: Response) {
    const { name, link } = request.body;
    const torrentsRepository = getCustomRepository(TorrentsRepository);
    const torrentAlreadyExists = await torrentsRepository.findOne({
      name
    });
    if (!torrentAlreadyExists) {
      throw new AppError("Torrent not Found!", 404);
    }

    await torrentsRepository.delete({
      name,
      link
    });
    return response.status(201).json({ "Removed Successful": name });
  }
  // async download(request: Request, response: Response) {
  //   const { name, torrents } = request.body;
  //   const torrentArray: Array<string> = [];
  //   const errorsTorrent: Array<string> = [];
  //   const dir = __dirname + `/data/Torrents/${name}/`;
  //   await torrents.map(async (eachTorrent: string) => {
  //     const { torrent, err } = await downloadTorrent(name, eachTorrent);
  //     if (!err) {
  //       torrentArray.push(torrent);
  //     } else {
  //       errorsTorrent.push(err);
  //     }
  //     return { torrentArray, errorsTorrent };
  //   });
  //   console.log(errorsTorrent);
  //   if (!errorsTorrent) {
  //     response.json({ torrentArray, dir }).status(200);
  //   } else {
  //     response.json({ torrentArray, dir, errorsTorrent }).status(200);
  //   }
  // }
}

export { TorrentController };
