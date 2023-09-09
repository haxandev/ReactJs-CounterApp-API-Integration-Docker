import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Counter from './Counter';
import { repos, API_BASE_URL } from '../constants';

const mock = new MockAdapter(axios);

// Mock the Axios API call and provide a response
const mockResponse = {
  full_name: 'user/repo'
};

mock.onGet(`${API_BASE_URL}/repos/${repos[0]}`).reply(200, mockResponse);

describe('Counter Component', () => {
  it('renders initial state', async () => {
    render(<Counter />);
    await waitFor(() => {
        expect(screen.getByText('Counter: 0')).toBeInTheDocument();
    });
  });

  it('increments the counter and fetches repo data', async () => {
    render(<Counter />);

    // Click the Increment button
    fireEvent.click(screen.getByText('Increment'));

    await waitFor(() => {
      expect(screen.getByText('Counter: 1')).toBeInTheDocument();
      
    });
  });

  it('decrements the counter and fetches repo data', async () => {
    render(<Counter />);

    fireEvent.click(screen.getByText('Decrement'));

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(screen.getByText('Counter: 0')).toBeInTheDocument();
    });
  });
});
