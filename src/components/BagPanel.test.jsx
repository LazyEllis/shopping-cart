import { MemoryRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { bag } from "../__fixtures__/data";
import BagPanel from "./BagPanel";

vi.mock("./LoadingIcon", () => ({
  default: () => <div data-testid="loading-icon">Loading...</div>,
}));

test("shows bag heading for non-empty bag", () => {
  const handleClose = vi.fn();

  render(
    <MemoryRouter>
      <BagPanel bag={bag} onClose={handleClose} loading={false} error={null} />
    </MemoryRouter>
  );

  expect(screen.getByRole("heading", { name: /bag/i })).toBeInTheDocument();
});

test("renders all bag items as list items", () => {
  const handleClose = vi.fn();

  render(
    <MemoryRouter>
      <BagPanel bag={bag} onClose={handleClose} loading={false} error={null} />
    </MemoryRouter>
  );

  expect(screen.getAllByRole("listitem")).toHaveLength(bag.length);
});

test("shows review bag link pointing to correct URL", () => {
  const handleClose = vi.fn();

  render(
    <MemoryRouter>
      <BagPanel bag={bag} onClose={handleClose} loading={false} error={null} />
    </MemoryRouter>
  );

  expect(screen.getByRole("link", { name: /review bag/i })).toHaveAttribute(
    "href",
    "/shop/bag"
  );
});

test("closes panel when review bag link is clicked", async () => {
  const user = userEvent.setup();
  const handleClose = vi.fn();

  render(
    <MemoryRouter>
      <BagPanel bag={bag} onClose={handleClose} loading={false} error={null} />
    </MemoryRouter>
  );

  const bagLink = screen.getByRole("link", { name: /review bag/i });
  await user.click(bagLink);

  expect(handleClose).toHaveBeenCalled();
});

test("shows empty bag message when no items", () => {
  const handleClose = vi.fn();

  render(
    <MemoryRouter>
      <BagPanel bag={[]} onClose={handleClose} loading={false} error={null} />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /your bag is empty/i })
  ).toBeInTheDocument();
});

test("shows shop now link pointing to store", () => {
  const handleClose = vi.fn();

  render(
    <MemoryRouter>
      <BagPanel bag={[]} onClose={handleClose} loading={false} error={null} />
    </MemoryRouter>
  );

  expect(screen.getByRole("link", { name: /shop now/i })).toHaveAttribute(
    "href",
    "/store"
  );
});

test("closes panel when shop now link is clicked", async () => {
  const user = userEvent.setup();
  const handleClose = vi.fn();

  render(
    <MemoryRouter>
      <BagPanel bag={[]} onClose={handleClose} loading={false} error={null} />
    </MemoryRouter>
  );

  const shopLink = screen.getByRole("link", { name: /shop now/i });
  await user.click(shopLink);

  expect(handleClose).toHaveBeenCalled();
});

test("shows loading icon during loading state", () => {
  const handleClose = vi.fn();

  render(
    <MemoryRouter>
      <BagPanel bag={bag} onClose={handleClose} loading={true} error={null} />
    </MemoryRouter>
  );

  expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
});

test("shows error message when bag fails to load", () => {
  const handleClose = vi.fn();
  const error = new Error("Failed to load bag");

  render(
    <MemoryRouter>
      <BagPanel bag={bag} onClose={handleClose} loading={false} error={error} />
    </MemoryRouter>
  );

  expect(screen.getByText(/error loading your bag items/i)).toBeInTheDocument();
});
