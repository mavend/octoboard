import React from "react";
import { render, screen } from "utils/test/render";
import Tile from "./index";

describe("scrambled Tile component", () => {
  it("renders correctly", () => {
    expect.hasAssertions();
    const { container } = render(
      <Tile
        letter={"X"}
        points={5}
        bonus={{ type: "letter", multiply: 3 }}
        raised
        highlighted
        separate
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with a letter", async () => {
    expect.hasAssertions();
    render(<Tile letter={"letter-X"} />);
    expect(await screen.findByText("letter-X")).toBeInTheDocument();
  });

  it("renders with points", async () => {
    expect.hasAssertions();
    render(<Tile points={15} />);
    expect(await screen.findByText("15")).toBeInTheDocument();
  });

  it("renders with a replacement", async () => {
    expect.hasAssertions();
    render(<Tile replacement={"replacement-Y"} />);
    expect(await screen.findByText("replacement-Y")).toBeInTheDocument();
  });
});
