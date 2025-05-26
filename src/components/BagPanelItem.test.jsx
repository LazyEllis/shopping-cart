import { MemoryRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formatProductText } from "../utils/utils";
import { singleItem, bulkItem } from "../__fixtures__/data";
import BagPanelItem from "./BagPanelItem";

const formattedBulkItemTitle = formatProductText(bulkItem.title);
const formattedSingleItemTitle = formatProductText(singleItem.title);

test("displays product image and title", () => {
  const handleClose = vi.fn();

  render(
    <MemoryRouter>
      <BagPanelItem item={bulkItem} onClose={handleClose} />
    </MemoryRouter>
  );

  expect(screen.getByRole("presentation")).toHaveAttribute(
    "src",
    bulkItem.image
  );
  expect(
    screen.getByRole("link", {
      name: `${formattedBulkItemTitle} quantity ${bulkItem.quantity}`,
    })
  ).toBeInTheDocument();
});

test("shows quantity when greater than 1", () => {
  const handleClose = vi.fn();

  render(
    <MemoryRouter>
      <BagPanelItem item={bulkItem} onClose={handleClose} />
    </MemoryRouter>
  );

  expect(
    screen.getByLabelText(`quantity ${bulkItem.quantity}`)
  ).toHaveTextContent(`×${bulkItem.quantity}`);
});

test("hides quantity when equal to 1", () => {
  const handleClose = vi.fn();

  render(
    <MemoryRouter>
      <BagPanelItem item={singleItem} onClose={handleClose} />
    </MemoryRouter>
  );

  expect(
    screen.queryByLabelText(`quantity ${singleItem.quantity}`)
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: formattedSingleItemTitle })
  ).toBeInTheDocument();
});

test("links to correct product page", () => {
  const handleClose = vi.fn();

  render(
    <MemoryRouter>
      <BagPanelItem item={bulkItem} onClose={handleClose} />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("link", { name: new RegExp(formattedBulkItemTitle) })
  ).toHaveAttribute("href", `/store/${bulkItem.id}`);
});

test("calls onClose when product link is clicked", async () => {
  const handleClose = vi.fn();
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <BagPanelItem item={bulkItem} onClose={handleClose} />
    </MemoryRouter>
  );

  const link = screen.getByRole("link", {
    name: new RegExp(formattedBulkItemTitle),
  });
  await user.click(link);

  expect(handleClose).toHaveBeenCalled();
});
