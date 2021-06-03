import { Request, Response } from "express";
import { searchAnime } from "../services/searchAnime";
import { searchDescription } from "../services/searchDescription";

class SearchController {
  async search(request: Request, response: Response) {
    let maxResults: number;
    let { anime, index } = request.params;
    maxResults = Number(index);
    console.log(`# ParamsName: ${anime}`);

    if (typeof maxResults === ("undefined" || "null")) {
      maxResults = +25;
      console.log(`# maxResults: ${maxResults}`);
    }

    if (typeof anime === ("undefined" || "null")) {
      anime = JSON.stringify(request.body);
      console.log(`# BodyName: ${anime}`);

      if (typeof anime === ("undefined" || "null")) {
        anime = "Naruto";
        console.log(`# Anime: ${anime}`);
      }
    }
    const Description = await searchDescription(anime, maxResults);

    const Animes = await searchAnime(anime, maxResults);
    return response.json({
      Animes,
      Description
    });
  }
}

export { SearchController };
