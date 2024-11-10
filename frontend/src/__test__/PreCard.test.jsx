import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as ReactRouterDom from 'react-router-dom'; // Import as a namespace
import PreCard from '../components/PreCard'; // Ensure the path is correct

// Mock the useNavigate function from react-router-dom
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: vi.fn(),
  };
});

describe('PreCard component', () => {
  const mockPre = {
    id: 2,
    name: 'sdg',
    description: 'qr',
    thumbnail: null,
    slides: [
      [
        {
          id: 1731174664958,
          type: 'code',
          size: {
            width: 30,
            height: 30,
          },
          code: '#include <stdio.h>\nint main(){\nprintf("hello world");\nreturn 0;\n}',
          fontSize: 1,
          language: 'c',
          position: {
            x: 0,
            y: 0,
          },
          layer: 1,
        },
      ],
      [
        {
          id: 1731170548383,
          type: 'text',
          size: {
            width: 10,
            height: 10,
          },
          text: '5',
          fontSize: 1,
          color: '#000000',
          fontFamily: 'Times New Roman',
          position: {
            x: 0,
            y: 0,
          },
          layer: 1,
        },
      ],
    ],
    background: {
      type: 'image',
      value: 'https://codeskulptor-demos.commondatastorage.googleapis.com/descent/background.png',
    },
  };

  it('renders the PreCard component with the correct content', () => {
    render(
      <ReactRouterDom.MemoryRouter>
        <PreCard pre={mockPre} />
      </ReactRouterDom.MemoryRouter>
    );

    // Check if the name is rendered
    const nameElement = screen.getByText(/sdg/i);
    expect(nameElement).toBeInTheDocument();

    // Check if the description is rendered
    const descriptionElement = screen.getByText(/qr/i);
    expect(descriptionElement).toBeInTheDocument();

    // Check if the number of slides is rendered correctly
    const slidesElement = screen.getByText(/2 slides/i); // Since there are 2 slides
    expect(slidesElement).toBeInTheDocument();
  });

  it('navigates when the card is clicked', () => {
    const mockNavigate = vi.fn();
    vi.spyOn(ReactRouterDom, 'useNavigate').mockImplementation(() => mockNavigate);

    render(
      <ReactRouterDom.MemoryRouter>
        <PreCard pre={mockPre} />
      </ReactRouterDom.MemoryRouter>
    );

    // Simulate clicking the card
    const cardActionArea = screen.getByRole('button');
    fireEvent.click(cardActionArea);

    // Check if sessionStorage is set and navigate is called
    expect(sessionStorage.getItem('pre')).toEqual(JSON.stringify(mockPre));
    expect(mockNavigate).toHaveBeenCalledWith(`/presentation/${mockPre.id}`);
  });
});
