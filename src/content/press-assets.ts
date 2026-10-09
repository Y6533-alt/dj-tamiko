import type { PressAsset } from "./types";

/**
 * Downloadable EPK assets (none offered at the moment — the EPK shows
 * photos without a download option). To offer a download again, add the
 * file under /public and an entry here, then render <PressAssetCard> on /epk.
 */
export const pressAssets: PressAsset[] = [];
