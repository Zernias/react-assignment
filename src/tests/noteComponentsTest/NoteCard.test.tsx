import { fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import * as router from "react-router";
import NoteCard from "../../components/noteComponents/NoteCard";

describe("Create note component test suite", () => {
  const mockDate = new Date("2022-12-12");
  const mockDescription =
    "test-description-to-see-if-textPreview-method-is-being-called";
  const mockTitle = "test-title";

  const renderComponent = () =>
    renderWithProviders(
      <NoteCard
        description={mockDescription}
        title={mockTitle}
        id={0}
        date={mockDate}
      />
    );

  const previewDescription = mockDescription.slice(0, 40).concat("...");

  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("should render note card", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("note-0")).toBeVisible();
  });

  it("should render title, description", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("card-title-0")).toHaveTextContent("test-title");
    expect(getByTestId("card-preview-0")).toHaveTextContent(previewDescription);
  });

  it("should navigate to path /view/0 when note is clicked on", () => {
    const { getByTestId } = renderComponent();
    fireEvent.click(getByTestId("note-0"));
    expect(navigate).toBeCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/view/0");
  });
});
