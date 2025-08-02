import { useLogin } from "./useLogin";
import { renderWithProviders } from "../../test.utils";
import LoginForm from "./LoginForm";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "../Account/SignUpForm";
import toast from "react-hot-toast";

jest.mock("./useLogin");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn()
}))

jest.mock("react-hot-toast", () => ({
    __esModule: true,
  default: {
    error: jest.fn(),
    success: jest.fn(),
  },
}))

describe("LoginForm component", () => {
    test("render all input fields and buttons", () => {
        useLogin.mockReturnValue({loginFn: () => {}, isLoggingIn: false});
        renderWithProviders(<LoginForm isPopupSession={false} onCloseModal={() => {}} />)

        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: "Login"})).toBeInTheDocument();
        expect(screen.getByText("New to FabThread? Create an account")).toBeInTheDocument();
    })

    test("if isPopupSession true shown button instead of navlink", () => {
        useLogin.mockReturnValue({loginFn: () => {}, isLoggingIn: false});
        renderWithProviders(<LoginForm isPopupSession="true" onCloseModal={() => {}} />)

        expect(screen.getByTestId("toSignupForm")).toBeInTheDocument();
    })
    
    test("navigates to /signup when click of navlink", async () => {
        useLogin.mockReturnValue({loginFn: () => {}, isLoggingIn: false});
        renderWithProviders(
            <Routes>
              <Route path="/login" element={<LoginForm isPopupSession={false} />} />
              <Route path="/signup" element={<SignUpForm />} />
            </Routes>,
            { route: "/login" }
        );

        const navlink = screen.getByText("New to FabThread? Create an account");
        expect(navlink).toBeInTheDocument();
        navlink.click();
        expect(await screen.findByText("Sign up to FabThread")).toBeInTheDocument();
    })

    test("submit form with valid data", async () => {
        const mock = jest.fn();
        useLogin.mockReturnValue({loginFn: mock, isLoggingIn: false});
        renderWithProviders(<LoginForm isPopupSession={false} onCloseModal={() => {}} />)

        fireEvent.change(screen.getByPlaceholderText("Email"), { target: {value: "bhavesh1@gmail.com"}})
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: {value: "bhavesh@21"}});

        fireEvent.click(screen.queryByRole("button", {name: "Login"}));

        await waitFor(() => {
            expect(mock).toHaveBeenCalledWith(
                {
                    email: "bhavesh1@gmail.com",
                    password: "bhavesh@21"
                },
                expect.any(Object)
            )
        })
    })

    test("show toast error message when login fails", async () => {
        const mock = jest.fn((_payload, {onError}) => {
            onError();
        })
        useLogin.mockReturnValue({loginFn: mock, isLoggingIn: false});
        renderWithProviders(<LoginForm isPopupSession={false} onCloseModal={() => {}} />)
        fireEvent.change(screen.getByPlaceholderText("Email"), {target: {value: "bhavesh1@gmail.com"}});
        fireEvent.change(screen.getByPlaceholderText("Password"), {target: {value: "bhavesh@21"}});

        fireEvent.click(screen.queryByRole("button", {name: "Login"}));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Login Failed due to invalid login credentials");
        })
    })

    test("show spinner on click of login", async () => {
        useLogin.mockReturnValue({loginFn: () => {}, isLoggingIn: true});
        renderWithProviders(<LoginForm isPopupSession={false} onCloseModal={() => {}} />)
        fireEvent.change(screen.getByPlaceholderText("Email"), {target: {value: "bhavesh1@gmail.com"}});
        fireEvent.change(screen.getByPlaceholderText("Password"), {target: {value: "bhavesh@21"}});

        fireEvent.click(screen.queryByRole("button", {name: "Login"}));
        expect(await screen.findByTestId("spinnerMini")).toBeVisible();

    })
})