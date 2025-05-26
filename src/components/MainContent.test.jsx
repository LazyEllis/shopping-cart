import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MainContent from "./MainContent";

const CONTEXT = { content: "Product Data" };

vi.mock("react-router-dom", () => ({
  Outlet: ({ context }) => <div>{context.content}</div>,
}));

vi.mock("./LoadingIcon", () => ({
  default: () => <div data-testid="loading-icon">Loading...</div>,
}));

test("shows loading icon while data is loading", () => {
  render(<MainContent loading={true} error={null} context={CONTEXT} />);

  expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
});

test("displays error message when request fails", () => {
  const error = new Error("Failed to load data");

  render(<MainContent loading={false} error={error} context={CONTEXT} />);

  expect(screen.getByText(error.message)).toBeInTheDocument();
});

test("renders child routes when data loads successfully", () => {
  render(<MainContent loading={false} error={null} context={CONTEXT} />);

  expect(screen.getByText(CONTEXT.content)).toBeInTheDocument();
});
