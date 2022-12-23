import { fireEvent } from "@testing-library/react";
import Logout from "../../components/loginComponents/Logout";
import { renderWithProviders } from "../../utils/test-utils";
import * as router from "react-router";

describe("Login component test suite", () => {
  const renderComponent = () => renderWithProviders(<Logout />);
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("should render logout button", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("logout-button")).toBeVisible();
  });

  it("should navigate to path / when logout button is clicked", () => {
    const { getByTestId } = renderComponent();
    fireEvent.click(getByTestId("logout-button"));
    expect(navigate).toHaveBeenCalledWith('/');
  });
});
