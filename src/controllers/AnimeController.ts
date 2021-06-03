import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AnimesRepository } from "../repositories/AnimesRepository";
import { AppError } from "../errors/AppError";
import { downloadAnime } from "../services/downloadAnime";

class AnimeController {
  async show(request: Request, response: Response) {
    const animesRepository = getCustomRepository(AnimesRepository);
    const all = await animesRepository.find();
    return response.json(all);
  }

  async create(request: Request, response: Response) {
    const { name, link } = request.body;

    const animesRepository = getCustomRepository(AnimesRepository);
    const animeAlreadyExists = await animesRepository.findOne({
      name
    });
    if (animeAlreadyExists) {
      throw new AppError("Anime already exists!");
    }
    const user = animesRepository.create({
      name,
      link
    });
    await animesRepository.save(user);
    return response.status(201).json(user);
  }

  async delete(request: Request, response: Response) {
    const animesRepository = getCustomRepository(AnimesRepository);
    const { name, link } = request.body;
    const animeAlreadyExists = await animesRepository.findOne({
      name
    });
    if (!animeAlreadyExists) {
      throw new AppError("Anime not Found!", 404);
    }

    await animesRepository.delete({
      name,
      link
    });
    return response.status(201).json({ "Removed Successful": name });
  }
  async download(request: Request, response: Response) {
    const anime = await downloadAnime();
    console.log(anime);
    response.json(anime).status(200);
  }
}

export { AnimeController };
