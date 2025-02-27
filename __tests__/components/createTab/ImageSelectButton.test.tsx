import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ImageSelectButton from "../../../components/createTab/ImageSelectButton";
import * as utils from "../../../components/createTab/utils";

jest.mock("../../../components/createTab/utils");

describe("ImageSelectButton", () => {
  it("renders correctly", () => {
    const { getByText } = render(<ImageSelectButton />);
    expect(getByText("Select Image")).toBeTruthy();
  });

  it("calls pickImageAsync on button press", () => {
    const { getByText } = render(<ImageSelectButton />);
    fireEvent.press(getByText("Select Image"));
    expect(utils.pickImageAsync).toHaveBeenCalled();
  });
});
