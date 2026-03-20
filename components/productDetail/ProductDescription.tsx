type ProductDescriptionProps = {
  content: string;
};

export default function ProductDescription({
  content,
}: ProductDescriptionProps) {
  return (
    <div className="goodDetail-desc">
      <div className="goodDetail-desc-title">商品描述</div>
      <div
        className="goodDetail-desc-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
