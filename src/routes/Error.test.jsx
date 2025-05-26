import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Error from "./Error";

test("displays the error heading", () => {
  render(
    <MemoryRouter>
      <Error />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", {
      name: /the page you're looking for can't be found/i,
    })
  ).toBeInTheDocument();
});

test("renders a link to the homepage", () => {
  render(
    <MemoryRouter>
      <Error />
    </MemoryRouter>
  );

  expect(screen.getByRole("link", { name: /take me home/i })).toHaveAttribute(
    "href",
    "/"
  );
});
