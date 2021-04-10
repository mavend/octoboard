import React from "react";
import { render, screen } from "utils/test/render";
import InfoPopup from "./InfoPopup";

describe("scrambled InfoPopup component", () => {
  it("renders correctly", async () => {
    expect.hasAssertions();
    const { container } = render(
      <InfoPopup errors={[]} popupHandleRef={{}} newWords={[]} specialBonus={true} clickable />
    );
    expect(await screen.findByText("game.errors.ok")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders errors correctly", async () => {
    expect.hasAssertions();
    const { container } = render(
      <InfoPopup
        errors={["test_error"]}
        popupHandleRef={{}}
        newWords={[]}
        specialBonus={true}
        clickable
      />
    );
    expect(await screen.findByText("game.errors.header")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
