import { execSync } from "node:child_process";

export default function () {
  try {
    const [hash, short, iso] = execSync("git log -1 --format=%H%n%h%n%cI", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .trim()
      .split("\n");

    const date = new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(iso));

    return { hash, short, date };
  } catch {
    return { hash: "", short: "unknown", date: "" };
  }
}