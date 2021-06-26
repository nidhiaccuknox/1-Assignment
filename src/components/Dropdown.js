import { useState, useRef, useEffect } from 'react';
// import './dropdown.css';
import options from "../data.json";

export default function Dropdown() {

    const [value, setValue] = useState(null)
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const ref = useRef(null);

    useEffect(() => {
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, []);

    function close(e) {
        //console.dir([e.target, ref.current])
        setOpen(e && e.target === ref.current);
    }

    function filter(options) {
        return options.filter((option) => option.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
    }

    function displayValue() {
        if (query.length > 0) return query;
        if (value) return value.label;
        return "";
    }

    function selectOption(option) {
        setQuery("");
        setValue(option)
        setOpen(false);
    }
    
    return (
        <>
            <div className="dropdown">
                <div className="control">
                    <div className="selected-value">
                        <input
                            type="text"
                            ref={ref}
                            placeholder={value ? value.label : prompt}
                            value={displayValue()}
                            onChange={e => {
                                setQuery(e.target.value)
                                setValue(null)
                            }}
                            onClick={() => setOpen(!open)}
                        />
                    </div>
                    <div className={`arrow ${open ? "open" : null}`}></div>
                </div>
                <div className={`options ${open ? "open" : null}`}>
                    {
                        filter(options).map(option =>

                            <div
                                key={option.id}
                                className={`option ${value === option ? "selected" : null}`}
                                onClick={() => selectOption(option)}>
                                {option.label}
                            </div>)
                    }
                </div>
            </div>
        </>
    )
}


