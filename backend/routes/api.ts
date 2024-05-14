import { Router } from "../deps.ts";
import { generate, previewData, removeData } from "../controllers/generate.ts";
import { genQRCode } from "../controllers/qrcode.ts";


const router = new Router();

router.post("/api/generate", generate);
router.get("/api/query", previewData);
router.delete("/api/remove", removeData);;
router.get("/api/genqrcode", genQRCode);

export default router;
