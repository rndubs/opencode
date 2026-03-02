import path from "path"
import { Log } from "../util/log"
import { Global } from "../global"

export namespace Discovery {
  const log = Log.create({ service: "skill-discovery" })

  export function dir() {
    return path.join(Global.Path.cache, "skills")
  }

  export async function pull(_url: string): Promise<string[]> {
    // Telemetry stripped: no remote skill fetching
    log.info("skill discovery disabled: telemetry stripped")
    return []
  }
}
