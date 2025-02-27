import React from "react";
import { render } from "@testing-library/react-native";
import SocialMediaSelectButton from "@/components/createTab/SocialMediaSelectButton";

describe("SocialMediaSelectButton Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<SocialMediaSelectButton />);
    expect(getByText("Select Social Media")).toBeTruthy();
  });
});
