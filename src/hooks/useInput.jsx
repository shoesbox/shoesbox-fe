import { useState } from "react";

export default function useInput(defaultValue = null) {
    const [state, setState] = useState(defaultValue);

    const onChange = (event) => {setState(event.target.value)}

    return {state, onChange};
}
