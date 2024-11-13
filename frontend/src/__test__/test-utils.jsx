// test-utils.js
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { PresentationProvider } from '../context/PresentationContext';

const customRender = (ui, options) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <PresentationProvider>
          {ui}
        </PresentationProvider>
      </AuthProvider>
    </BrowserRouter>,
    options
  );
};

export * from '@testing-library/react';
export { customRender as render };
