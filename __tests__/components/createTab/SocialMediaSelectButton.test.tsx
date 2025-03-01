import React from "react";
import { render } from "@testing-library/react-native";
import TopActionsBar from "@/components/createTab/TopActionsBar";

describe("TopActionsBar Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<TopActionsBar />);
    expect(getByText("Select Social Media")).toBeTruthy();
  });
});
