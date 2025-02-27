
import { describe, it, expect } from "vitest";
import { formatDate } from "../../utils/dateUtils";

describe("formatDate", () => {
  it("devrait formater correctement la date", () => {
    expect(formatDate("2024-01-15")).toBe("15 janvier 2024");
  });
});
