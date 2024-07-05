import { useRef, useEffect } from "react";

export default function useOutsideClick(callback: () => void) {
    const ref = useRef<HTMLDivElement>(null);
    
    const handleClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
        document.removeEventListener("mousedown", handleClick);
        };
    });

    return ref;
}