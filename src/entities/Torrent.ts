import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  RelationId
} from "typeorm";
import { Anime } from "./Anime";

@Entity("torrents")
export class Torrent extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Anime, (anime) => anime.torrents)
  anime: Anime;

  @RelationId((torrent: Torrent) => torrent.anime)
  animeId: number;
}
