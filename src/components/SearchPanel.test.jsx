import { MemoryRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formatProductText } from "../utils/utils";
import { products } from "../__fixtures__/data";
import SearchPanel from "./SearchPanel";

const product = products[0];
const formattedTitle = formatProductText(product.title);

const navigate = vi.fn();

// Mock navigation hook
vi.mock(import("react-router-dom"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

const setup = () => {
  const handleClose = vi.fn();
  const user = userEvent.setup();

  navigate.mockReset();

  render(
    <MemoryRouter>
      <SearchPanel onClose={handleClose} products={products} />
    </MemoryRouter>
  );

  const input = screen.getByRole("searchbox", { name: /search/i });
  const clearButton = screen.getByRole("button", { name: /clear/i });
  const submitButton = screen.getByRole("button", { name: /submit/i });

  return { user, input, clearButton, submitButton, handleClose };
};

test("starts with empty input value", () => {
  const { input } = setup();

  expect(input).toHaveValue("");
});

test("updates input when user types", async () => {
  const { user, input } = setup();

  await user.type(input, "test");

  expect(input).toHaveValue("test");
});

test("clears input when clear button is clicked", async () => {
  const { user, input, clearButton } = setup();

  await user.type(input, "test");
  await user.click(clearButton);

  expect(input).toHaveValue("");
});

test("disables buttons when input is empty", () => {
  const { clearButton, submitButton } = setup();

  expect(clearButton).toBeDisabled();
  expect(submitButton).toBeDisabled();
});

test("enables buttons when input has value", async () => {
  const { user, input, clearButton, submitButton } = setup();

  await user.type(input, "test");

  expect(clearButton).not.toBeDisabled();
  expect(submitButton).not.toBeDisabled();
});

test("shows no suggestions initially", () => {
  setup();

  expect(
    screen.queryByRole("heading", { name: /suggested links/i })
  ).not.toBeInTheDocument();
  expect(screen.queryByRole("link")).not.toBeInTheDocument();
});

test("displays matching product suggestions", async () => {
  const { user, input } = setup();

  await user.type(input, "blue");

  const links = screen.getAllByRole("link");
  const heading = screen.getByRole("heading", { name: /suggested links/i });

  expect(heading).toBeInTheDocument();
  expect(links).toHaveLength(2);

  links.forEach((link) => {
    expect(link).toHaveTextContent(/blue/i);
  });
});

test("renders correct suggestion link URLs", async () => {
  const { user, input } = setup();

  await user.type(input, formattedTitle);

  const suggestionLink = screen.getByRole("link", { name: formattedTitle });

  expect(suggestionLink).toHaveAttribute("href", `/store/${product.id}`);
});

test("suggestions display formatted product titles", async () => {
  const { user, input } = setup();

  await user.type(input, formattedTitle);

  expect(
    screen.getByRole("link", { name: formattedTitle })
  ).toBeInTheDocument();
});

test("refines suggestions as user continues typing", async () => {
  const { user, input } = setup();

  await user.type(input, "blue");
  expect(screen.getAllByRole("link")).toHaveLength(2);

  await user.type(input, " jean");

  const remainingLinks = screen.getAllByRole("link");
  expect(remainingLinks).toHaveLength(1);
  expect(remainingLinks[0]).toHaveTextContent(/blue jean/i);
});

test("shows no suggestions for non-matching search", async () => {
  const { user, input } = setup();

  await user.type(input, "nonexistent");

  expect(screen.queryByRole("link")).not.toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: /suggested links/i })
  ).not.toBeInTheDocument();
});

test("performs case-insensitive search", async () => {
  const { user, input } = setup();

  await user.type(input, "BLUE");

  expect(screen.getAllByRole("link")).toHaveLength(2);
});

test("closes panel when suggestion is clicked", async () => {
  const { user, input, handleClose } = setup();

  await user.type(input, "blue jeans");
  await user.click(screen.getByRole("link"));

  expect(handleClose).toHaveBeenCalled();
});

test("submits search and resets form", async () => {
  const { user, input, submitButton, handleClose } = setup();

  await user.type(input, "blue");
  await user.click(submitButton);

  expect(navigate).toHaveBeenCalledWith("/store?search=blue");
  expect(input).toHaveValue("");
  expect(handleClose).toHaveBeenCalled();
});
