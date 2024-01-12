import React from "react";
import { render, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../Store/store";
import SignInForm from "./SignInForm";
import { BrowserRouter } from "react-router-dom";

describe('SignInForm Component', () => {
  test("renders SignInForm component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SignInForm />
        </Provider>
      </BrowserRouter>
    );

    const signInElement = screen.getByText("Sign In");
    expect(signInElement).toBeInTheDocument();
  });

  test('renders password input field', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SignInForm />
        </Provider>
      </BrowserRouter>
    );
    const passwordInput = screen.getByPlaceholderText('Enter password');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });


});