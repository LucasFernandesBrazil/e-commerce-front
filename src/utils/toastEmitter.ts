import { EToastType } from "@/interfaces/toast.interface";
import { toast } from "react-toastify";

export default function toastEmmiter(message?: string, toastType?: EToastType) {    
    toast(message, { position: "top-center", hideProgressBar: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: true, pauseOnHover: true, theme: "colored", draggable: true, autoClose: 2000, type: toastType })
}
