import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../test.utils";
import ProductBox from "./ProductBox";
import { useCategory } from "../Category/useCategory";
import { Route, Routes } from "react-router-dom";
import ProductListingPage from "../../pages/category-pages/ProductListingPage";
import ProductDetailsPage from "../../pages/ProductDetailsPage";
import userEvent from "@testing-library/user-event";
import { supabase } from "../../services/supabase";

jest.mock("../Category/useCategory");
jest.mock("../../services/supabase");

describe("ProductBox component", () => {
    beforeEach(() => {
        global.IntersectionObserver = class {
            constructor(callback) {
              this.callback = callback;
            }
            observe = (element) => {
              this.callback([{ isIntersecting: true, target: element }]);
            };
            unobserve = jest.fn();
            disconnect = jest.fn();
        };

        global.Image = class{
            constructor(){
                setTimeout(() => {
                   if(this.onload) this.onload();
                }, 0)
            }
            set src(_){}
        }
    })
    
    const mockProducts = [
        {id: 9, itemName: "Tapered Jogger Pants", gender: "men", itemImage: "img1.jpg", price: "1299", discountPrice: "749", brand: "puma", discount: "42%", quantity: 28, itemType: "dress", userRatings: null,     itemDetails: {
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
        {id: 10, itemName: "Tapered Jogger Pants", gender: "men", itemImage: "img2.jpg", price: "1299", discountPrice: "749", brand: "puma", discount: "42%", quantity: 28, itemType: "dress", userRatings: null,     itemDetails: {
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
    const mockCategories = [
        { id: 1, image: "img1.jpg", name: "Shoes", page: "men-casual-wear", discount: "10%", gender: "men" },
        { id: 2, image: "img2.jpg", name: "Shirts", page: "men-ethnic-wear", discount: "20%", gender: "men" }
    ]
    
    test("show spinner when images are loading", async () => {
        supabase.from.mockReturnValue({
            select: jest.fn().mockResolvedValue({
                data: mockProducts,
                error: null
            })
        });
        useCategory.mockReturnValue({categories: mockCategories})

        renderWithProviders(<ProductBox />);

        expect(screen.getByTestId("spinner")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
        })
    })

    test("render product card after images preloaded", async () => {
        supabase.from.mockReturnValue({
            select: jest.fn().mockResolvedValue({
                data: mockProducts,
                error: null
            })
        });
        useCategory.mockReturnValue({categories: mockCategories})

        renderWithProviders(<ProductBox />);

        await waitFor(() => {
            expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
        })

        const cards = await screen.findAllByTestId("product-card");
        expect(cards).toHaveLength(2);
        cards.forEach(card => expect(card).toHaveClass("visible"));
    })

    test("navigate to PDP page on click of product card", async () => {
        supabase.from.mockReturnValue({
            select: jest.fn().mockResolvedValue({
                data: mockProducts,
                error: null
            })
        });
        useCategory.mockReturnValue({categories: mockCategories})
        
        renderWithProviders(
            <Routes>
                <Route path=':categoryName' element={<ProductListingPage />} />
                <Route path=':productType/:brand/:productName/:productId' element={<ProductDetailsPage />} />
            </Routes>,
            { route: "/shoes"}
        )

        await waitFor(() => {
            expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
        })

        const user = userEvent.setup();
        const navlink = screen.getAllByTestId("product-url");
        await user.click(navlink[0]);
        expect(await screen.findByTestId("Product-details-page")).toBeInTheDocument();
    })
})