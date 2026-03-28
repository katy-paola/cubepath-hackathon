import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Hero } from "./hero";

describe("Hero", () => {
  it("renders the default headline and supporting copy", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Crea una rutina de running personalizada/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/segundos/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Ajusta tu entrenamiento según tu nivel/i),
    ).toBeInTheDocument();
  });
});
