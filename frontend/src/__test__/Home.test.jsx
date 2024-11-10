import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '../pages/Home'; // Ensure the path to Home is correct

describe('Home component', () => {
  it('should render the image with the correct attributes', () => {
    // Render the Home component
    render(<Home />);

    // Check if the image element with the alt text "Welcome" is rendered
    const image = screen.getByRole('img', { name: /welcome/i });
    expect(image).toBeInTheDocument();

    // Verify that the image has the correct src attribute
    expect(image).toHaveAttribute('src', 'https://i.imgur.com/WMDh6CL.png');
  });

  it('should render the welcome text with correct positioning and styles', () => {
    // Render the Home component
    render(<Home />);

    // Check if the heading "Welcome to our Website!" is present in the document
    const heading = screen.getByText(/Welcome to our Website!/i);
    expect(heading).toBeInTheDocument();

    // Ensure the heading has the correct inline style for color
    expect(heading).toHaveStyle('color: white');

    // Ensure the heading is styled with padding
    expect(heading).toHaveStyle('padding: 10px 20px');
  });
});
