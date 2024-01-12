import React from "react";
import { render, screen , fireEvent } from "@testing-library/react";
import SignUpForm from "./SignUpForm";
describe('SignUp Component', () => {

  test("render New Component test",()=>{
    render(<SignUpForm/>);

    const newElement = screen.getByText("Sign Up");
    expect(newElement).toBeInTheDocument();
  })
  test('renders password input field', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByPlaceholderText('Enter password');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  test('updates password value on input change', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByPlaceholderText('Enter password');

    fireEvent.change(passwordInput, { target: { value: 'newPassword123' } });

    expect(passwordInput.value).toBe('newPassword123');
  });

  test('requires password with "required" attribute', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByPlaceholderText('Enter password');
    expect(passwordInput).toHaveAttribute('required');
  });
})