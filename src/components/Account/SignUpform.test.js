import { fireEvent, screen, waitFor } from "@testing-library/react"
import SignUpForm from "./SignUpForm";
import { useSignup } from "../Authentication/useSignup";
import { renderWithProviders } from "../../test.utils";

jest.mock("../Authentication/useSignup");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}))


describe("SignUp form", () => {
    test("render all input fields", () => {
        useSignup.mockReturnValue({ signupFn: jest.fn(), isSigningUp: false});

        renderWithProviders(<SignUpForm isPopupSession={false} onClose={() => {}}/>)

        expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email Id")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Mobile Number")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Repeat Password")).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /sign up/i })).toBeInTheDocument();
    })

    test("shows Required when input is empty", () => {
        useSignup.mockReturnValue({ signupFn: jest.fn(), isSigningUp: false});

        renderWithProviders(<SignUpForm isPopupSession={false} onClose={() => {}}/>);
        const fullName = screen.getByPlaceholderText("Full Name");
        fireEvent.blur(fullName);
        const error = screen.getAllByText('Required')[0];
        expect(error).toBeVisible();
    })

    test("show error when repeat password doesnt match", async () => {
        useSignup.mockReturnValue({ signupFn: jest.fn(), isSigningUp: false});

        renderWithProviders(<SignUpForm isPopupSession={false} onClose={() => {}}/>);

        fireEvent.change(screen.getByPlaceholderText("Full Name"), {target: { value: "Bhavesh"}});
        fireEvent.change(screen.getByPlaceholderText("Email Id"), {target: { value: "bhavesh@21"}});
        fireEvent.change(screen.getByPlaceholderText("Mobile Number"), {target: { value: "12354698"}});
        fireEvent.change(screen.getByPlaceholderText("Password"), {target: { value: "Bhavesh@21"}});
        fireEvent.change(screen.getByPlaceholderText("Repeat Password"), {target: {value: "bhavesh221"}});

        fireEvent.click(screen.queryByRole("button"));

        const error = await screen.findByText("Password is not matching");
        expect(error).toBeVisible();
    })

    test("submit form with valid data", async () => {
        const mock = jest.fn();
        useSignup.mockReturnValue({ signupFn: mock, isSigningUp: false});

        renderWithProviders(<SignUpForm isPopupSession={false} onClose={jest.fn()}/>);

        fireEvent.change(screen.getByPlaceholderText("Full Name"), {target: { value: "Bhavesh"}});
        fireEvent.change(screen.getByPlaceholderText("Email Id"), {target: { value: "bhavesh@gmail.com"}});
        fireEvent.change(screen.getByPlaceholderText("Mobile Number"), {target: { value: "1235469890"}});
        fireEvent.change(screen.getByPlaceholderText("Password"), {target: { value: "Bhavesh@21"}});
        fireEvent.change(screen.getByPlaceholderText("Repeat Password"), {target: {value: "Bhavesh@21"}});

        fireEvent.click(screen.queryByRole("button"));

        await waitFor(() => {
            expect(mock).toHaveBeenCalledWith(
                {
                    email: "bhavesh@gmail.com",
                    password: "Bhavesh@21",
                    optionData: {
                        fullName: "Bhavesh",
                        phone: "1235469890"
                    }
                },
                expect.any(Object)
            )
        })

    })

    test("show spinner when isSigningUp is true", () => {
        useSignup.mockReturnValue({ signupFn: jest.fn(), isSigningUp: true});

        renderWithProviders(<SignUpForm isPopupSession={false} onClose={() => {}}/>);
        expect(screen.getByTestId("spinner")).toBeInTheDocument();
    })
})