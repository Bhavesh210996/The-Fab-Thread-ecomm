import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../services/supabase";
import { renderWithProviders } from "../../test.utils";
import PDPAddToCart from "./PDPAddToCart";
import { fireEvent, screen, waitFor } from "@testing-library/react";

jest.mock("../../services/supabase");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn()
}))

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn()
}))

const mockCartEntries = [
    {
        id: 133,
        productId: 9,
        productSize: "1",
        quantity: 1,
    },
    {
        id: 134,
        productId: 88,
        productSize: "1",
        quantity: 1,
    }
]
const mockProducts = [
    {id: 9, itemName: "Tapered Jogger Pants", gender: "men", itemImage: "img1.jpg", price: "1299", discountPrice: "749", brand: "puma", discount: "42%", quantity: 28, itemType: "dress", 
        itemDetails: {
            description: "Navy blue tapered jogger pants for women, designed with a soft fabric and elastic waistband for a comfortable, relaxed fit. Great for casual outings or lounging.",
            specification: {
                fit: "Tapered Fit",
                collar: "None",
                length: "Regular",
                numItem: 1,
                occasion: "Casual",
                sleeveLength: "None"
            }
        },
        userRatings: [{
            date:"2025-02-09T19:09:10.555Z",
            rating:4,
            review:"looks good",
            userId:"111b39ed-51d0-4e51-ac1c-d6c2e141e611",
            userName:"bhavesh bafana"
        }],
        size: {l:5, m:5, s:5, xl:5}
    }
]
describe("PDPAddToCart componenent", () => {
    beforeEach(() => {
        supabase.from.mockImplementation((tableName) =>{
            switch (tableName){
                case "cartEntries":
                    return{
                        select: jest.fn().mockReturnValue({
                            order: jest.fn().mockResolvedValue({
                              data: mockCartEntries, // include `products` field too
                              error: null
                            })
                        })
                    };
                case "addreses":
                    return{
                        select: jest.fn().mockResolvedValue({
                            data: [],
                            error: null
                        })
                    }
                default:
                    return{
                        select: jest.fn().mockResolvedValue({
                            data: mockCartEntries,
                            error: null
                        })
                    }
            }

        })
    })

    test("show spinner when cartEntries are loading", () => {
        useSelector.mockReturnValue({
            user: {},
            isAuthenticated: false
        })
       renderWithProviders(<PDPAddToCart productData={mockProducts[0]}/>);

        expect(screen.getByTestId("spinner")).toBeInTheDocument();

    })

    test("Size buttons and add to cart button should be there", async () => {
        useSelector.mockReturnValue({
            user: {},
            isAuthenticated: false
        })
        renderWithProviders(<PDPAddToCart productData={mockProducts[0]}/>);
        
        expect(screen.getByTestId("spinner")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getAllByTestId("sizeButton").length).toBeGreaterThan(0);
        })
        expect(screen.queryByText("Add To Cart")).toBeInTheDocument();
    })

    test("If authenticated is false then shown loginform popup on add to cart click", async () => {
        useSelector.mockReturnValue({
            user: {},
            isAuthenticated: false
        })
        renderWithProviders(<PDPAddToCart productData={mockProducts[0]}/>);
        
        expect(screen.getByTestId("spinner")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getAllByTestId("sizeButton").length).toBeGreaterThan(0);
        })
        const addToCartCTA = screen.queryByText("Add To Cart");
        fireEvent.click(addToCartCTA);

        expect(screen.queryByText("Login to your account")).toBeInTheDocument();
    })
    
    test("Show Select Size if its not selected", async () => {
        useSelector.mockReturnValue({
            user: {},
            isAuthenticated: true
        })
        renderWithProviders(<PDPAddToCart productData={mockProducts[0]}/>);
        
        expect(screen.getByTestId("spinner")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getAllByTestId("sizeButton").length).toBeGreaterThan(0);
        })
        const addToCartCTA = screen.queryByText("Add To Cart");
        fireEvent.click(addToCartCTA);

        expect(screen.queryByText("Please select a size")).toBeInTheDocument();
    })

    test("Select the size on click of button", async () => {
                useSelector.mockReturnValue({
            user: {},
            isAuthenticated: true
        })
        renderWithProviders(<PDPAddToCart productData={mockProducts[0]}/>);
        
        expect(screen.getByTestId("spinner")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getAllByTestId("sizeButton").length).toBeGreaterThan(0);
        })

        const sizeBtn = screen.getAllByTestId("sizeButton");

        fireEvent.click(sizeBtn[0]);
        expect(sizeBtn[0]).toHaveClass("selectedSize")
    })
})