import './ribbon.css';

export default function Ribbon({ nickname }) {
  return (
    <div className="ribbon bottom-10">
      <div className="ribbon-content">
        <p className="font-bold">{nickname}</p>
      </div>
    </div>
  );
}
