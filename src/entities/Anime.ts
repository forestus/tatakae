import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Description } from "./Description";
import { Torrent } from "./Torrent";

@Entity("animes")
export class Anime extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Torrent, (torrent) => torrent.anime)
  torrents: Torrent[];

  @OneToOne(() => Description)
  @JoinColumn()
  descriptions: Description[];
}
