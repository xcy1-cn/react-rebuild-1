type ProductServiceProps = {
  serviceList: any[];
  onOpen: () => void;
};

export default function ProductService({
  serviceList,
  onOpen,
}: ProductServiceProps) {
  return (
    <div className="goodDetail-service">
      <div className="goodDetail-service-left">
        {serviceList.map((item: any) => (
          <div className="goodDetail-service-left-title" key={item.service_id}>
            <span className="red">✔</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <button className="service-arrow" onClick={onOpen}>
        ›
      </button>
    </div>
  );
}
