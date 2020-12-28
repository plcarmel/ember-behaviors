export function extractPosInfo(e) {
  return e.type.startsWith("touch") ? e.touches[0] : e;
}

