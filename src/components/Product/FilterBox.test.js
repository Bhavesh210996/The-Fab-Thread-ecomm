import { useSelector } from "react-redux"
import { useParams, useSearchParams } from "react-router-dom"
import { renderWithProviders } from "../../test.utils";
import FilterBox from "./FilterBox";
import { screen } from "@testing-library/react";
import { useSearchQuery } from "../../context/SearchProductContextApi";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useSearchParams: jest.fn(),
    useParams: jest.fn(),
}))

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn()
}));

jest.mock("../../context/SearchProductContextApi", () => ({
    ...jest.requireActual("../../context/SearchProductContextApi"),
    useSearchQuery: jest.fn()
}));

const mockProducts = [
        {id: 9, itemName: "Tapered Jogger Pants", categoryName: "men-casual-wear", gender: "men", itemImage: "img1.jpg", price: "1299", discountPrice: "749", brand: "puma", discount: "42%", quantity: 28, itemType: "dress", userRatings: null, color:"red",
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
    }},
        {id: 10, itemName: "Tapered Jogger Pants", categoryName: "men-ethnic-wear", gender: "men", itemImage: "img2.jpg", price: "1299", discountPrice: "749", brand: "nike", discount: "42%", quantity: 28, itemType: "shirt", userRatings: null, color:"red",     
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
    }}
]

describe("Filter Box component", () => {
    test("render filterbox with no filters applied", async () => {
        useSelector.mockReturnValue({
            productsList: mockProducts
        })

        useParams.mockReturnValue({categoryName: ""});

        useSearchParams.mockReturnValue([
            new URLSearchParams(),
            jest.fn()
        ])
        useSearchQuery.mockReturnValue({searchQuery: ""})

       renderWithProviders(<FilterBox />)

        expect(screen.getByText("Filters")).toBeInTheDocument();

        expect(screen.getByTestId("brand")).toHaveTextContent("puma");
        expect(screen.getByTestId("color")).toHaveTextContent("red")
    })
    test("filters products by Category name", () => {
        useSelector.mockReturnValue({
            productsList: mockProducts
        })

        useParams.mockReturnValue({categoryName: "men-casual-wear"});

        useSearchParams.mockReturnValue([
            new URLSearchParams(),
            jest.fn()
        ])
        useSearchQuery.mockReturnValue({searchQuery: ""})

        renderWithProviders(<FilterBox />)

        expect(screen.getByTestId("brand")).toHaveTextContent("puma");
    })

    test("filters products based on search query", () => {
        useSelector.mockReturnValue({
            productsList: mockProducts
        })

        useSearchParams.mockReturnValue([
            new URLSearchParams(),
            jest.fn()
        ])

        useParams.mockReturnValue({categoryName: ""});

        useSearchQuery.mockReturnValue({ searchQuery: ""});

        renderWithProviders(<FilterBox />)

        expect(screen.getByTestId("brand")).toHaveTextContent("puma");
    })

    test("filter products list based on selected brand", () => {
        useSelector.mockReturnValue({
            productsList: mockProducts
        })

        useSearchParams.mockReturnValue([
            new URLSearchParams("brand=Puma&color=Red"),
            jest.fn()
        ])

        useParams.mockReturnValue({categoryName: ""});

        useSearchQuery.mockReturnValue({searchQuery: ""});

       const {debug} = renderWithProviders(<FilterBox />, {route: "men-casual-wear"});
        debug();
        expect(screen.getByTestId("brand")).toHaveTextContent("puma");
    })
})