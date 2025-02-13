import { Link } from "react-router-dom"

function CategoryCard({category}) {
    return (
        <div className="column-compo">
            <Link className="categroy-url" to={`/${category.page}`}>
                <img src={category.image} alt={category.name} />
                <span className="category-base">{category.name}</span>
                <span className="discount-text">{category.discount}</span>
            </Link>
        </div>
    )
}

export default CategoryCard
