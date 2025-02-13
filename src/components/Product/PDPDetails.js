function PDPDetails({productData}) {
    const {description, specification} = productData?.itemDetails;
    return (
        <div>
            <div className="desc-box">
                <div className="text-head">Product Description</div>
                <div className="text-value">{description}</div>
            </div>
            <div className="specification-box">
                <div className="text-head">Specification</div>
                <div className="size-fit-box">
                    
                    {Object.entries(specification).map(([key, value]) => (
                        <div className="index-row" key={key}>
                            <div className="index-head">{key}</div>
                            <div className="index-value">{value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PDPDetails
