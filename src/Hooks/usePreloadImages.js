import { useCallback } from "react";

export const usePreloadImages = () => {
    const preloadImages = useCallback((data) => {
        if(!data.length) return Promise.resolve();
        return Promise.all(
            data?.map((item) => 
                new Promise((resolve) => {
                    const img = new Image();
                    img.src = item.itemImage;
                    img.onload = resolve;
                    img.onerror = resolve;
                })
            )
        )
    }, [])

    return { preloadImages };
}