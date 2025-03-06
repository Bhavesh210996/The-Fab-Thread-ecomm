import { memo } from "react"
import { PLATFORM_FEE, SHIPPING_FEE } from "../../Utils/Constants"
import { formatCurrency } from "../../Utils/helpers"

const OrderPriceBox = memo(function OrderPriceBox({priceWithoutDiscount, totalDiscount}) {
    return (
        <div className="border-bottom">
            <div className="pricebox-heading">Price Details</div>
            <div className="cart-price-row">
                <span className="price-text">Total MRP</span>
                <span className="price-amount">{formatCurrency(priceWithoutDiscount)}</span>
            </div>
            <div className="cart-price-row">
                <span className="price-text">Discount on MRP</span>
                <span className="price-amount"> - {formatCurrency(totalDiscount)}</span>
            </div>
            <div className="cart-price-row">
                <span className="price-text">Platform Fee</span>
                <span className="price-amount">{formatCurrency(PLATFORM_FEE)}</span>
            </div>
            <div className="cart-price-row">
                <span className="price-text">Shipping Fee</span>
                <span className="price-amount">{formatCurrency(SHIPPING_FEE)}</span>
            </div>
        </div>
    )
})

export default OrderPriceBox
