import { EntityRepository, Repository } from "typeorm";
import { Description } from "../entities/Description";

@EntityRepository(Description)
class DescriptionsRepository extends Repository<Description> {}
export { DescriptionsRepository };
