import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../test.utils";
import Category from "./Category";
import { useCategory } from "./useCategory";

jest.mock("./useCategory");
describe("Category component", () => {
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
            constructor() {
                setTimeout(() => {
                    if (this.onload) this.onload();
                }, 0)
            }
            set src(_){}
        }
    })
    test("show spinner when images are loading", async () => {
        const mockCategories = [
            { id: 1, image: "img1.jpg", name: "Shoes", page: "shoes", discount: "10%", gender: "men" },
            { id: 2, image: "img2.jpg", name: "Shirts", page: "shirts", discount: "20%", gender: "men" }
        ]
        useCategory.mockReturnValue({categories: mockCategories, isCategoriesLoading: false});

        renderWithProviders(<Category />);

        expect(screen.getByTestId("spinner")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
        })
    })

    test("render category cards after images preloaded", async () => {
        const mockCategories = [
            { id: 1, image: "img1.jpg", name: "Shoes", page: "shoes", discount: "10%", gender: "men" },
            { id: 2, image: "img2.jpg", name: "Shirts", page: "shirts", discount: "20%", gender: "men" }
        ]
        useCategory.mockReturnValue({categories: mockCategories, isCategoriesLoading: false});

        renderWithProviders(<Category genderType="men"/>);

        await waitFor(() => {
            expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
        })

        const cards = await screen.findAllByTestId("category-card");
        expect(cards).toHaveLength(2);
        cards.forEach(card => {
            expect(card).toHaveClass("visible");
        });
    })
})