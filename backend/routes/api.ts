import { Router } from "https://deno.land/x/oak/mod.ts";
import { generate, previewData, removeData } from "../controllers/generate.ts";

const router = new Router();

router.get("/api/generate", generate);
router.get("/api/query", previewData);
router.get("/api/remove", removeData);;


export default router;
