import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SelectBox } from "./select-box";

describe("SelectBox", () => {
  it("opens the listbox and selects an option", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <SelectBox
        value="A"
        options={["A", "B", "C"]}
        onValueChange={onValueChange}
        triggerAriaLabel="Elegir opción"
      />,
    );

    const trigger = screen.getByRole("button", { name: "Elegir opción" });
    await user.click(trigger);

    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: "B" }));

    expect(onValueChange).toHaveBeenCalledWith("B");
  });
});
