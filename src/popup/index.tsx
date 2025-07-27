import { createRoot } from "react-dom/client";
import { Popup } from "./Popup";
import "../i18n";
import "@assets/styles/tailwind.css";
import "./index.css";

const root = createRoot(document.querySelector("#root")!);
root.render(<Popup />);
