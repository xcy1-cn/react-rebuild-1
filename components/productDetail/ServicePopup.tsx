type ServicePopupProps = {
  open: boolean;
  serviceList: any[];
  onClose: () => void;
};

export default function ServicePopup({
  open,
  serviceList,
  onClose,
}: ServicePopupProps) {
  if (!open) return null;

  return (
    <div className="popup-mask" onClick={onClose}>
      <div
        className="popup-sheet popup-sheet--service"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-drag-bar" />

        <div className="pops-service-title">
          <span>服务说明</span>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="pops-service-content">
          {serviceList.map((item: any) => (
            <div className="pops-service-content-item" key={item.service_id}>
              <div className="pops-service-content-item-left">
                <span className="red">✔</span>
              </div>

              <div className="pops-service-content-item-right">
                <span className="service-name">{item.name}</span>
                <span className="summary">{item.summary}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
