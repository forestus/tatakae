import { EntityRepository, Repository } from "typeorm";
import { Torrent } from "../entities/Torrent";

@EntityRepository(Torrent)
class TorrentsRepository extends Repository<Torrent> {}
export { TorrentsRepository };
