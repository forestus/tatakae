import { EntityRepository, Repository } from "typeorm";
import { Anime } from "../entities/Anime";

@EntityRepository(Anime)
class AnimesRepository extends Repository<Anime> {}
export { AnimesRepository };
