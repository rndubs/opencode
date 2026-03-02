import { Log } from "@/util/log"

export namespace ShareNext {
  const log = Log.create({ service: "share-next" })

  export async function url() {
    return ""
  }

  export async function init() {
    // Telemetry/share stripped: no-op
    log.info("share disabled: telemetry stripped")
  }

  export async function create(_sessionID: string) {
    // Telemetry/share stripped: no-op
    return { id: "", url: "", secret: "" }
  }

  export async function remove(_sessionID: string) {
    // Telemetry/share stripped: no-op
  }
}
