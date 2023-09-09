import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import GetRepoData from "./GetRepoData";
import { API_BASE_URL } from "../constants";

// Initialize the axios mock
const mock = new MockAdapter(axios);

// Mock the Axios API call and provide a response
const mockResponse = {
  full_name: "user/repo",
  description: "Sample repo description",
  stargazers_count: 42,
};

mock.onGet(`${API_BASE_URL}/repos/user/repo`).reply(200, mockResponse);

describe("GetRepoData", () => {
  it("renders data after API call", async () => {
    render(<GetRepoData repoName="user/repo" />);

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(screen.getByText("user/repo")).toBeInTheDocument();
    });
  });

  it('renders error message on API error', async () => {
    // Mock an error response from the API
    mock.onGet(`${API_BASE_URL}/repos/user/repo`).reply(404, 'Request failed with status code 404');

    render(<GetRepoData repoName="user/repo" />);
    
    // Wait for the API call to resolve
    await waitFor(() => {
      expect(screen.getByText('Request failed with status code 404')).toBeInTheDocument();
    });
  });
});
