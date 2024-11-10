import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CodeDialog from '../components/CodeDialog'; // Ensure the path is correct

describe('CodeDialog component', () => {
  it('renders dialog with correct initial content', () => {
    // Render the component with the dialog open
    render(<CodeDialog open={true} onClose={() => {}} onSave={() => {}} />);

    // Check if the dialog title is present
    const title = screen.getByText(/Add Code Block/i);
    expect(title).toBeInTheDocument();

    // Check if the width and height input fields are rendered
    const widthInput = screen.getByLabelText(/Width \(%\)/i);
    const heightInput = screen.getByLabelText(/Height \(%\)/i);
    expect(widthInput).toBeInTheDocument();
    expect(heightInput).toBeInTheDocument();

    // Check if the code block text field is rendered
    const codeInputs = screen.getAllByLabelText(/Code Block/i);
    // expect(codeInputs.length).toBe(1); // Ensure there's only one matching input
    expect(codeInputs[0]).toBeInTheDocument();
  });

  it('displays an error when trying to save without code', () => {
    const handleSave = vi.fn(); // Use vi.fn() for mocking
    render(<CodeDialog open={true} onClose={() => {}} onSave={handleSave} />);

    // Find the save button and click it
    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);

    // Check for error message in helper text
    const errorText = screen.getByText(/Please enter the code such as c, python or javascript/i);
    expect(errorText).toBeInTheDocument();
  });

  it('calls the onSave callback with the correct data when valid input is provided', () => {
    const handleSave = vi.fn(); // Use vi.fn() for mocking
    render(<CodeDialog open={true} onClose={() => {}} onSave={handleSave} />);

    // Change the code input to a valid code snippet
    const codeInputs = screen.getAllByLabelText(/Code Block/i);
    // expect(codeInputs.length).toBe(1); // Ensure there's only one matching input
    const codeInput = codeInputs[1];
    
    fireEvent.change(codeInput, { target: { value: '#include <stdio.h>' } });

    // Click the save button
    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);

    // Check if the onSave callback was called
    expect(handleSave).toHaveBeenCalled();
  });
});
