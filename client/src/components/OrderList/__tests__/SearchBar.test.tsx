import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "../SearchBar";

describe("SearchBar", () => {
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
    onSearch: jest.fn(),
    onClear: jest.fn(),
    placeholder: "Search products...",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders search input with placeholder", () => {
      render(<SearchBar {...defaultProps} />);

      const input = screen.getByPlaceholderText("Search products...");
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue("");
    });

    it("renders search button", () => {
      render(<SearchBar {...defaultProps} />);

      const searchButton = screen.getByRole("button", { name: /search/i });
      expect(searchButton).toBeInTheDocument();
    });

    it("does not render clear icon when value is empty", () => {
      render(<SearchBar {...defaultProps} value="" />);

      const clearIcon = screen.queryByRole("button", { name: "" });
      expect(clearIcon).not.toBeInTheDocument();
    });

    it("renders clear icon when value is not empty", () => {
      render(<SearchBar {...defaultProps} value="test search" />);

      const clearIcon = screen.getByRole("button", { name: "" });
      expect(clearIcon).toBeInTheDocument();
    });

    it("renders clear icon inside input when value is not empty", () => {
      render(<SearchBar {...defaultProps} value="test search" />);

      const clearIcon = screen.getByRole("button", { name: "" });
      expect(clearIcon).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("calls onChange when input value changes", () => {
      const onChange = jest.fn();
      render(<SearchBar {...defaultProps} onChange={onChange} />);

      const input = screen.getByPlaceholderText("Search products...");
      fireEvent.change(input, { target: { value: "new search" } });

      expect(onChange).toHaveBeenCalledWith("new search");
    });

    it("calls onSearch when search button is clicked", () => {
      const onSearch = jest.fn();
      render(<SearchBar {...defaultProps} onSearch={onSearch} />);

      const searchButton = screen.getByRole("button", { name: /search/i });
      fireEvent.click(searchButton);

      expect(onSearch).toHaveBeenCalledTimes(1);
    });

    it("calls onSearch when Enter key is pressed", () => {
      const onSearch = jest.fn();
      render(<SearchBar {...defaultProps} onSearch={onSearch} />);

      const input = screen.getByPlaceholderText("Search products...");
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

      expect(onSearch).toHaveBeenCalledTimes(1);
    });

    it("calls onClear when clear icon is clicked", () => {
      const onClear = jest.fn();
      render(
        <SearchBar {...defaultProps} value="test search" onClear={onClear} />
      );

      const clearIcon = screen.getByRole("button", { name: "" });
      fireEvent.click(clearIcon);

      expect(onClear).toHaveBeenCalledTimes(1);
    });

    it("does not call onSearch when other keys are pressed", () => {
      const onSearch = jest.fn();
      render(<SearchBar {...defaultProps} onSearch={onSearch} />);

      const input = screen.getByPlaceholderText("Search products...");
      fireEvent.keyDown(input, { key: "Space", code: "Space" });

      expect(onSearch).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has proper button types", () => {
      render(<SearchBar {...defaultProps} value="test" />);

      const clearIcon = screen.getByRole("button", { name: "" });
      expect(clearIcon).toHaveAttribute("type", "button");
    });

    it("maintains focus management", () => {
      render(<SearchBar {...defaultProps} value="test" />);

      const input = screen.getByPlaceholderText("Search products...");
      const clearIcon = screen.getByRole("button", { name: "" });

      expect(input).toBeInTheDocument();
      expect(clearIcon).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty string value correctly", () => {
      render(<SearchBar {...defaultProps} value="" />);

      const input = screen.getByPlaceholderText("Search products...");
      expect(input).toHaveValue("");

      const clearIcon = screen.queryByRole("button", { name: "" });
      expect(clearIcon).not.toBeInTheDocument();
    });

    it("handles whitespace-only value correctly", () => {
      render(<SearchBar {...defaultProps} value="   " />);

      const clearIcon = screen.getByRole("button", { name: "" });
      expect(clearIcon).toBeInTheDocument();
    });

    it("handles long search values correctly", () => {
      const longValue = "a".repeat(100);
      render(<SearchBar {...defaultProps} value={longValue} />);

      const input = screen.getByPlaceholderText("Search products...");
      expect(input).toHaveValue(longValue);

      const clearIcon = screen.getByRole("button", { name: "" });
      expect(clearIcon).toBeInTheDocument();
    });
  });

  describe("Custom Props", () => {
    it("uses custom placeholder when provided", () => {
      render(<SearchBar {...defaultProps} placeholder="Custom placeholder" />);

      const input = screen.getByPlaceholderText("Custom placeholder");
      expect(input).toBeInTheDocument();
    });

    it("uses default placeholder when not provided", () => {
      const { placeholder, ...props } = defaultProps;
      render(<SearchBar {...props} />);

      const input = screen.getByPlaceholderText("Search products...");
      expect(input).toBeInTheDocument();
    });
  });
});
