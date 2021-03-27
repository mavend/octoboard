import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import Tile from "./index";

describe("scrambled Tile component", () => {
  it("renders correctly", () => {
    expect.hasAssertions();
    const component = renderer.create(
      <Tile
        letter={"X"}
        points={5}
        bonus={{ type: "letter", multiply: 3 }}
        raised
        highlighted
        separate
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with a letter", () => {
    expect.hasAssertions();
    render(<Tile letter={"letter-X"} />);
    expect(screen.queryByText("letter-X")).toBeInTheDocument();
  });

  it("renders with points", () => {
    expect.hasAssertions();
    render(<Tile points={15} />);
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("renders with a replacement", () => {
    expect.hasAssertions();
    render(<Tile replacement={"replacement-Y"} />);
    expect(screen.getByText("replacement-Y")).toBeInTheDocument();
  });
});
