import React from "react";
import { render } from "@testing-library/react-native";
import ActionsBar from "@/components/createTab/ActionsBar";

describe("ActionsBar Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<ActionsBar />);
    expect(getByText("Actions")).toBeTruthy();
  });
});
