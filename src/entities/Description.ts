import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  RelationId
} from "typeorm";
import { Anime } from "./Anime";

@Entity("descriptions")
export class Description {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  score: string;

  @Column()
  nbEps: string;

  @Column()
  startYear: string;

  @Column()
  endYear: string;

  @Column()
  imageUrl: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Anime, (anime) => anime.descriptions)
  anime: Anime;

  @RelationId((description: Description) => description.anime)
  animeId: number;
}
