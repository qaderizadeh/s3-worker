import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { files } from "./schema";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/assets/:id", async (c) => {
  const newFiles = await drizzle(c.env.DB)
    .select()
    .from(files)
    .where(eq(files.id, c.req.param("id")));

  if (newFiles.length)
    return c.newResponse(new Uint8Array(newFiles[0].content), 200, {
      type: newFiles[0].type,
    });
});

app.post("/assets", async (c) => {
  const body = await c.req.parseBody();

  const file = body["file"] as File;

  const res = await drizzle(c.env.DB)
    .insert(files)
    .values({
      name: file.name,
      type: file.type,
      size: file.size,
      content: await file.arrayBuffer(),
    });

  return c.json({ id: res.meta.last_row_id });
});

export default app;
