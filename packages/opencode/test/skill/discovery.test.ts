import { describe, test, expect, beforeAll, afterAll } from "bun:test"
import { Discovery } from "../../src/skill/discovery"
import { rm } from "fs/promises"

beforeAll(async () => {
  await rm(Discovery.dir(), { recursive: true, force: true })
})

afterAll(async () => {
  await rm(Discovery.dir(), { recursive: true, force: true })
})

describe("Discovery.pull", () => {
  test("returns empty array (remote fetching disabled)", async () => {
    const dirs = await Discovery.pull("http://localhost:9999/.well-known/skills/")
    expect(dirs).toEqual([])
  })

  test("url without trailing slash returns empty array", async () => {
    const dirs = await Discovery.pull("http://localhost:9999/.well-known/skills")
    expect(dirs).toEqual([])
  })

  test("returns empty array for invalid url", async () => {
    const dirs = await Discovery.pull("http://localhost:9999/invalid-url/")
    expect(dirs).toEqual([])
  })

  test("returns empty array for non-json response", async () => {
    const dirs = await Discovery.pull("http://localhost:9999/some-other-path/")
    expect(dirs).toEqual([])
  })
})
