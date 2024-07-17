export default function Product({
  id,
  title,
  price,
  description,
  stock,
  actions
}) {
  
  return (
    <article className="product">
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className='product-price'>¥{price}</p>
          <p>{description}</p>
          <p>残り{stock}点</p>
        </div>
        <p className='product-actions'>
          {actions}
        </p>
      </div>
    </article>
  );
}
