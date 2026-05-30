import { allAboutBeats } from "content-collections";

const includeDrafts = process.env.NODE_ENV === "development";

function isVisible(item: { draft: boolean }) {
  return includeDrafts || !item.draft;
}

export function getVisibleAboutBeats() {
  return allAboutBeats.filter(isVisible).sort((a, b) => a.order - b.order);
}

export function getFirstAboutBeatSummary() {
  const beats = getVisibleAboutBeats();
  return beats[0]?.summary;
}
