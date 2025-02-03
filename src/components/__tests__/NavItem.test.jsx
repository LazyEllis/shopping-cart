import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavItem from "../NavItem";

describe("NavItem Component", () => {
  it("renders NavItem with a string content", () => {
    render(
      <BrowserRouter>
        <NavItem to="/test" content="Test Link" />
      </BrowserRouter>,
    );
    const linkElement = screen.getByRole("link", { name: /test link/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/test");
  });

  it("renders NavItem with an element content", () => {
    render(
      <BrowserRouter>
        <NavItem to="/cart" content={<div>Hello</div>} label="Test Link" />
      </BrowserRouter>,
    );
    const linkElement = screen.getByRole("link", { name: /test link/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/cart");
  });
});
