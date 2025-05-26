import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobileMenu from "./MobileMenu";

test("calls onClose when close button is clicked", async () => {
  const handleClose = vi.fn();
  const user = userEvent.setup();

  render(<MobileMenu onClose={handleClose} />);

  const closeButton = screen.getByRole("button", { name: "Close" });
  await user.click(closeButton);

  expect(handleClose).toHaveBeenCalledOnce();
});
