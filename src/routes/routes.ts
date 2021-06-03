import { Router } from "express";
import { AnimeController } from "../controllers/AnimeController";
import { DescriptionController } from "../controllers/DescriptionController";
import { SchedulerController } from "../controllers/SchedulerController";
import { SearchController } from "../controllers/SearchController";
import { TorrentController } from "../controllers/TorrentController";
const router = Router();

const searchController = new SearchController();
const schedulerController = new SchedulerController();
const animeController = new AnimeController();
const torrentController = new TorrentController();
const descriptionController = new DescriptionController();

//Search
router.get("/search/:anime?/:index?/", searchController.search);

//Scheduler
router.get("/scheduler/", schedulerController.scheduler);
router.get("/scheduler/search", schedulerController.search);
router.get("/scheduler/downloadAll", schedulerController.downloadAll);

//Anime
router.get("/anime/show", animeController.show);
router.post("/anime/create", animeController.create);
router.post("/anime/delete", animeController.delete);
router.get("/anime/download", animeController.download);

//Torrent
router.get("/torrent/delete", torrentController.show);
router.post("/torrent/create", torrentController.create);
router.post("/torrent/delete", torrentController.delete);
// router.post("/torrent/download", torrentController.download);

//Description
router.get("/description/show", descriptionController.show);
router.post("/description/create", descriptionController.create);
router.post("/description/delete", descriptionController.delete);

export { router };
