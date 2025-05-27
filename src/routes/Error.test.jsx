import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Error from "./Error";

const setup = () => {
  render(
    <MemoryRouter>
      <Error />
    </MemoryRouter>
  );
};

test("displays the error heading", () => {
  setup();

  const heading = screen.getByRole("heading", {
    name: /the page you're looking for can't be found/i,
  });

  expect(heading).toBeInTheDocument();
});

test("renders a link to the homepage", () => {
  setup();

  const homeLink = screen.getByRole("link", { name: /take me home/i });

  expect(homeLink).toHaveAttribute("href", "/");
});
