import { useParams } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { renderWithProviders } from "../../test.utils";
import ProductDetailsPage from "../ProductDetailsPage";
import { screen, waitFor } from "@testing-library/react";

jest.mock("../../services/supabase");

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn()
}))

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
        }]
    },
        {id: 10, itemName: "Tapered Jogger Pants", gender: "men", itemImage: "img2.jpg", price: "1299", discountPrice: "749", brand: "puma", discount: "42%", quantity: 28, itemType: "dress", itemDetails: {
        description: "Navy blue tapered jogger pants for women, designed with a soft fabric and elastic waistband for a comfortable, relaxed fit. Great for casual outings or lounging.",
        specification: {
            fit: "Tapered Fit",
            collar: "None",
            length: "Regular",
            numItem: 1,
            occasion: "Casual",
            sleeveLength: "None"
        },
        userRatings: {
            date:"2025-02-09T19:09:10.555Z",
            rating:4,
            review:"looks good",
            userId:"111b39ed-51d0-4e51-ac1c-d6c2e141e611",
            userName:"bhavesh bafana"
        }
    }}
]

describe("PDP component", () => {
    beforeEach(() => {
        useParams.mockReturnValue({productId: "9"})
        supabase.from.mockReturnValue({
            select: jest.fn().mockResolvedValue({
                data: mockProducts,
                error: null
            })
        });
    })
    test("show spinner when productList is loading", async () => {
        renderWithProviders(<ProductDetailsPage />)

        expect(screen.getByTestId("spinner")).toBeInTheDocument();
    })

    test("show product details once available", async () => {
        renderWithProviders(<ProductDetailsPage />)
        expect(screen.getByTestId("spinner")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByTestId("Product-details-page")).toBeInTheDocument();
        })
        expect(screen.getByText("Product Description")).toBeInTheDocument();
    })

    test("please show Rating section if available", async () => {
        renderWithProviders(<ProductDetailsPage />)
        expect(screen.getByTestId("spinner")).toBeInTheDocument();
        
        await waitFor(() => {
            expect(screen.getByTestId("Product-details-page")).toBeInTheDocument();
        })

        expect(screen.getByTestId("pdp-rating-section")).toBeInTheDocument();
    })
})