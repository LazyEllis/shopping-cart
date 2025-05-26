import { MemoryRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { bag, bagPrice } from "../__fixtures__/data";
import Bag from "./Bag";

const useOutletContext = vi.fn();

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: () => useOutletContext(),
  };
});

test("shows delivery information", () => {
  useOutletContext.mockReset();
  useOutletContext.mockReturnValue({ bag });

  render(
    <MemoryRouter>
      <Bag />
    </MemoryRouter>
  );

  expect(
    screen.getByText(/free delivery and free returns/i)
  ).toBeInTheDocument();
});

test("shows review heading when bag contains items", () => {
  useOutletContext.mockReset();
  useOutletContext.mockReturnValue({ bag });

  render(
    <MemoryRouter>
      <Bag />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /review your bag/i })
  ).toBeInTheDocument();
});

test("displays total price when bag contains items", () => {
  useOutletContext.mockReset();
  useOutletContext.mockReturnValue({ bag });

  render(
    <MemoryRouter>
      <Bag />
    </MemoryRouter>
  );

  expect(screen.getByText(/your total/i)).toBeInTheDocument();
  expect(screen.getByText(bagPrice)).toBeInTheDocument();
});

test("renders correct number of items when bag contains items", () => {
  useOutletContext.mockReset();
  useOutletContext.mockReturnValue({ bag });

  render(
    <MemoryRouter>
      <Bag />
    </MemoryRouter>
  );

  expect(screen.getAllByRole("listitem")).toHaveLength(bag.length);
});

test("shows empty message when bag contains no items", () => {
  useOutletContext.mockReset();
  useOutletContext.mockReturnValue({ bag: [] });

  render(
    <MemoryRouter>
      <Bag />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /your bag is empty/i })
  ).toBeInTheDocument();
});

test("renders no items when bag is empty", () => {
  useOutletContext.mockReset();
  useOutletContext.mockReturnValue({ bag: [] });

  render(
    <MemoryRouter>
      <Bag />
    </MemoryRouter>
  );

  expect(screen.queryAllByRole("listitem")).toHaveLength(0);
});

test("shows continue shopping link when bag is empty", () => {
  useOutletContext.mockReset();
  useOutletContext.mockReturnValue({ bag: [] });

  render(
    <MemoryRouter>
      <Bag />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("link", { name: /continue shopping/i })
  ).toHaveAttribute("href", "/store");
});
