import { fireEvent } from "@testing-library/react";
import Navbar from "../../components/noteComponents/Navbar";
import { renderWithProviders } from "../../utils/test-utils";
import * as router from "react-router";

describe("Navigation bar component test suite", () => {
  const renderComponent = () => renderWithProviders(<Navbar />);
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("should render navigation bar", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("navigation-bar")).toBeVisible();
  });

  it("should render search bar and allows for text input", () => {
    const { queryByPlaceholderText } = renderComponent();
    const searchbarPlaceholder = queryByPlaceholderText(
      "Search note's title..."
    )! as HTMLInputElement;
    expect(searchbarPlaceholder).toBeVisible();
    fireEvent.change(searchbarPlaceholder, {
      target: { value: "search-test" },
    });
    expect(searchbarPlaceholder.value).toBe("search-test");
  });

  it("should navigate to path / when logout button is clicked", () => {
    const { getByTestId } = renderComponent();
    fireEvent.click(getByTestId("logout-button"));
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("should navigate to path /create when create note button is clicked", () => {
    const { getByTestId } = renderComponent();
    fireEvent.click(getByTestId("create-button"));
    expect(navigate).toBeCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/create", {
      preventScrollReset: undefined,
      relative: undefined,
      replace: false,
      state: undefined,
    });
  });
});
