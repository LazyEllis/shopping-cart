import { MemoryRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import { render, screen, act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { products } from "../__fixtures__/data";
import { NAV_LINKS } from "../constants";
import Layout from "./Layout";

vi.mock("./MainContent", () => ({
  default: () => <div data-testid="main-content">Main Content</div>,
}));

globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(products),
  })
);

test("should render complete navigation with logo and all menu links", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
  });

  expect(screen.getByRole("link", { name: /shopzilla/i })).toHaveAttribute(
    "href",
    "/"
  );

  NAV_LINKS.forEach((link) => {
    expect(screen.getByRole("link", { name: link.name })).toHaveAttribute(
      "href",
      link.href
    );
  });
});

test("should not show any open panels on initial render", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
  });

  expect(
    screen.queryByRole("button", { name: /close/i })
  ).not.toBeInTheDocument();
});

test("should toggle the search panel when the search button is clicked", async () => {
  const user = userEvent.setup();

  await act(async () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
  });

  const searchButton = screen.getByRole("button", {
    name: /search shopzilla/i,
  });

  await user.click(searchButton);

  expect(screen.getByRole("searchbox")).toBeInTheDocument();

  await user.click(searchButton);

  expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
});

test("should toggle the shopping bag panel when the bag button is clicked", async () => {
  const user = userEvent.setup();

  await act(async () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
  });

  const bagButton = screen.getByRole("button", {
    name: /shopping bag/i,
  });

  await user.click(bagButton);
  expect(screen.getByRole("heading", { name: /bag/i })).toBeInTheDocument();

  await user.click(bagButton);
  expect(
    screen.queryByRole("heading", { name: /bag/i })
  ).not.toBeInTheDocument();
});

test("should toggle the mobile navigation menu when the menu button is clicked", async () => {
  const user = userEvent.setup();

  await act(async () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
  });

  const menuButton = screen.getByRole("button", { name: /menu/i });

  await user.click(menuButton);
  expect(within(screen.getByTestId("panel")).getAllByRole("link")).toHaveLength(
    NAV_LINKS.length
  );

  await user.click(menuButton);
  expect(screen.queryByTestId("panel")).not.toBeInTheDocument();
});

test("should display blur overlay when search or bag panel is open", async () => {
  const user = userEvent.setup();

  await act(async () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
  });

  const bagButton = screen.getByRole("button", {
    name: /shopping bag/i,
  });

  const searchButton = screen.getByRole("button", {
    name: /search shopzilla/i,
  });

  await user.click(bagButton);
  expect(screen.getByTestId("blur")).toBeInTheDocument();

  await user.click(searchButton);
  expect(screen.getByTestId("blur")).toBeInTheDocument();
});

test("should not display blur overlay when mobile navigation menu is open", async () => {
  const user = userEvent.setup();

  await act(async () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
  });

  const menuButton = screen.getByRole("button", { name: /menu/i });

  await user.click(menuButton);
  expect(screen.queryByTestId("blur")).not.toBeInTheDocument();
});

test("should close open panel when clicking outside the panel area", async () => {
  const user = userEvent.setup();

  await act(async () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
  });

  const searchButton = screen.getByRole("button", {
    name: /search shopzilla/i,
  });

  const main = screen.getByRole("main");

  await user.click(searchButton);
  expect(screen.getByRole("searchbox")).toBeInTheDocument();

  await user.click(main);
  expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
});

test("should close panel when its close button is clicked", async () => {
  const user = userEvent.setup();

  await act(async () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
  });

  const searchButton = screen.getByRole("button", {
    name: /search shopzilla/i,
  });

  await user.click(searchButton);
  expect(screen.getByRole("searchbox")).toBeInTheDocument();

  const closeButton = screen.getByRole("button", { name: /close/i });

  await user.click(closeButton);
  expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
});

test("should display custom content when children are passed to the layout", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Layout>
          <div data-testid="child-content">Child Content</div>
        </Layout>
      </MemoryRouter>
    );
  });

  expect(screen.getByTestId("child-content")).toBeInTheDocument();
  expect(screen.getByTestId("child-content")).toHaveTextContent(
    "Child Content"
  );
});

test("should display default content when no custom children are provided", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
  });

  expect(screen.getByTestId("main-content")).toBeInTheDocument();
  expect(screen.getByTestId("main-content")).toHaveTextContent("Main Content");
});
