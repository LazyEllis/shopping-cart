import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formatProductText, formatCurrency } from "../utils/utils";
import { bulkItem } from "../__fixtures__/data";
import BagItem from "./BagItem";

const formattedTitle = formatProductText(bulkItem.title);
const formattedTotalPrice = formatCurrency(bulkItem.price * bulkItem.quantity);

test("displays product information correctly", () => {
  const handleIncrement = vi.fn();
  const handleDecrement = vi.fn();
  const handleDelete = vi.fn();

  render(
    <BagItem
      item={bulkItem}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onDelete={handleDelete}
    />
  );

  expect(screen.getByRole("presentation")).toHaveAttribute(
    "src",
    bulkItem.image
  );
  expect(
    screen.getByRole("heading", { name: formattedTitle })
  ).toBeInTheDocument();
  expect(screen.getByText(bulkItem.quantity)).toBeInTheDocument();
  expect(screen.getByText(formattedTotalPrice)).toBeInTheDocument();
});

test("calls onIncrement when increase button is clicked", async () => {
  const handleIncrement = vi.fn();
  const handleDecrement = vi.fn();
  const handleDelete = vi.fn();
  const user = userEvent.setup();

  render(
    <BagItem
      item={bulkItem}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onDelete={handleDelete}
    />
  );

  const increaseButton = screen.getByRole("button", {
    name: "Increase quantity",
  });
  await user.click(increaseButton);

  expect(handleIncrement).toHaveBeenCalledOnce();
});

test("calls onDecrement when decrease button is clicked", async () => {
  const handleIncrement = vi.fn();
  const handleDecrement = vi.fn();
  const handleDelete = vi.fn();
  const user = userEvent.setup();

  render(
    <BagItem
      item={bulkItem}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onDelete={handleDelete}
    />
  );

  const decreaseButton = screen.getByRole("button", {
    name: "Decrease quantity",
  });
  await user.click(decreaseButton);

  expect(handleDecrement).toHaveBeenCalledOnce();
});

test("calls onDelete when remove button is clicked", async () => {
  const handleIncrement = vi.fn();
  const handleDecrement = vi.fn();
  const handleDelete = vi.fn();
  const user = userEvent.setup();

  render(
    <BagItem
      item={bulkItem}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onDelete={handleDelete}
    />
  );

  const removeButton = screen.getByRole("button", { name: "Remove" });
  await user.click(removeButton);

  expect(handleDelete).toHaveBeenCalledOnce();
});
