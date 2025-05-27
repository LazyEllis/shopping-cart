import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MainContent from "./MainContent";

// Mock Outlet to render context content for testing
vi.mock("react-router-dom", () => ({
  Outlet: ({ context }) => <div>{context.content}</div>,
}));

const DEFAULT_CONTEXT = { content: "Product Data" };

const setup = ({
  loading = false,
  error = null,
  context = DEFAULT_CONTEXT,
} = {}) => {
  render(<MainContent loading={loading} error={error} context={context} />);
};

test("shows loading icon while data is loading", () => {
  setup({ loading: true });

  expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
});

test("displays error message when request fails", () => {
  const error = { message: "Something went wrong" };

  setup({ error });

  expect(screen.getByText(error.message)).toBeInTheDocument();
});

test("renders child routes when data loads successfully", () => {
  setup();

  expect(screen.getByText(DEFAULT_CONTEXT.content)).toBeInTheDocument();
});
