import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("joins truthy class names with a single space", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("filters out falsy entries", () => {
    expect(cn("a", false, "b", null, undefined, "c")).toBe("a b c");
  });
});
