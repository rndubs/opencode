import { eq, and } from "drizzle-orm"
import { Database } from "@/storage/db"
import { ControlAccountTable } from "./control.sql"
import z from "zod"

export * from "./control.sql"

export namespace Control {
  export const Account = z.object({
    email: z.string(),
    url: z.string(),
  })
  export type Account = z.infer<typeof Account>

  function fromRow(row: (typeof ControlAccountTable)["$inferSelect"]): Account {
    return {
      email: row.email,
      url: row.url,
    }
  }

  export function account(): Account | undefined {
    const row = Database.use((db) =>
      db.select().from(ControlAccountTable).where(eq(ControlAccountTable.active, true)).get(),
    )
    return row ? fromRow(row) : undefined
  }

  export async function token(): Promise<string | undefined> {
    // Telemetry stripped: no control plane phone-home for token refresh
    return undefined
  }
}
