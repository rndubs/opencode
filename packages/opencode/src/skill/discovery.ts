import { Effect, Layer, Context } from "effect"
import * as Log from "@opencode-ai/core/util/log"

export interface Interface {
  readonly pull: (url: string) => Effect.Effect<string[]>
}

export class Service extends Context.Service<Service, Interface>()("@opencode/SkillDiscovery") {}

export const layer: Layer.Layer<Service> = Layer.effect(
  Service,
  Effect.gen(function* () {
    const log = Log.create({ service: "skill-discovery" })

    const pull = Effect.fn("Discovery.pull")(function* (_url: string) {
      // Telemetry stripped: no remote skill fetching
      log.info("skill discovery disabled: telemetry stripped")
      return [] as string[]
    })

    return Service.of({ pull })
  }),
)

export const defaultLayer: Layer.Layer<Service> = layer

export * as Discovery from "./discovery"
