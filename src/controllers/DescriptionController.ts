import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { DescriptionsRepository } from "../repositories/DescriptionsRepository";
import { AppError } from "../errors/AppError";

class DescriptionController {
  async show(request: Request, response: Response) {
    const descriptionsRepository = getCustomRepository(DescriptionsRepository);
    const all = await descriptionsRepository.find();
    return response.json(all);
  }
  async create(request: Request, response: Response) {
    const {
      name,
      type,
      score,
      nbEps,
      startYear,
      endYear,
      imageUrl,
      description
    } = request.body;
    const descriptionsRepository = getCustomRepository(DescriptionsRepository);

    const animeAlreadyExists = await descriptionsRepository.findOne({
      name
    });
    if (animeAlreadyExists) {
      throw new AppError("User already exists!");
    }
    const user = descriptionsRepository.create({
      name,
      type,
      score,
      nbEps,
      startYear,
      endYear,
      imageUrl
    });
    await descriptionsRepository.save(user);
    return response.status(201).json(user);
  }
  async delete(request: Request, response: Response) {
    const descriptionsRepository = getCustomRepository(DescriptionsRepository);
    const { name, type, score, nbEps, startYear, endYear, imageUrl } =
      request.body;
    const descriptionAlreadyExists = await descriptionsRepository.findOne({
      name
    });
    if (!descriptionAlreadyExists) {
      throw new AppError("Anime not Found!", 404);
    }

    await descriptionsRepository.delete({
      name,
      type,
      score,
      nbEps,
      startYear,
      endYear,
      imageUrl
    });
    return response.status(201).json({ "Removed Successful": name });
  }
}

export { DescriptionController };
