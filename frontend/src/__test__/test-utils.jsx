// test-utils.js
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { PresentationProvider } from '../context/PresentationContext';

// 自定义 render 函数
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
