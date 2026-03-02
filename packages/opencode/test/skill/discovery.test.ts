import { describe, test, expect } from "bun:test"
import { Effect } from "effect"
import { Discovery } from "../../src/skill/discovery"

describe("Discovery.pull", () => {
  const pull = (url: string) =>
    Effect.runPromise(Discovery.Service.use((s) => s.pull(url)).pipe(Effect.provide(Discovery.defaultLayer)))

  test("returns empty array (remote fetching disabled)", async () => {
    const dirs = await pull("http://localhost:9999/.well-known/skills/")
    expect(dirs).toEqual([])
  })

  test("url without trailing slash returns empty array", async () => {
    const dirs = await pull("http://localhost:9999/.well-known/skills")
    expect(dirs).toEqual([])
  })

  test("returns empty array for invalid url", async () => {
    const dirs = await pull("http://localhost:9999/invalid-url/")
    expect(dirs).toEqual([])
  })

  test("returns empty array for non-json response", async () => {
    const dirs = await pull("http://localhost:9999/some-other-path/")
    expect(dirs).toEqual([])
  })
})
