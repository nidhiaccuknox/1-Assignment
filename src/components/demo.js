import { useState, useRef, useEffect } from 'react';
import options from "../data.json";
import './multiSelectDropdown.css';

export default function MultiSelectDropdown() {

    //const [input, setInput] = useState('');
    const [tags, setTags] = useState([]);
    const [isKeyReleased, setIsKeyReleased] = useState(false);

    const [value, setValue] = useState('')
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

    ////////////////////////////////////////////////////////////////

    // const onChange = (e) => {
    //     const { value } = e.target;
    //     setValue(value);
    // };

    const onKeyDown = (e) => {
        
        const { key } = e;
        const trimmedInput = value.label.trim();

        if (key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            setTags(prevState => [...prevState, trimmedInput]);
            setValue('');
        }

        if (key === "Backspace" && !value.label.length && tags.length && isKeyReleased) {
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();
            e.preventDefault();
            setTags(tagsCopy);
            setValue(poppedTag);
        }

        setIsKeyReleased(false);
    };

    const onKeyUp = () => {
        setIsKeyReleased(true);
    }

    const deleteTag = (index) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }

    return (
        <>
            <div className="dropdown">
                <div className="control">
                    <div className="selected-value">

                        <div className="container">

                            {tags.map((tag, index) => (
                                <div className="tag">
                                    {tag}
                                    <button onClick={() => deleteTag(index)}>x</button>
                                </div>
                            ))}

                            <input
                                value={displayValue()}
                                placeholder={value ? value : "Search..."}
                                onKeyDown={onKeyDown}
                                onKeyUp={onKeyUp}
                                //onChange={onChange}
                                onChange={e => {
                                    setQuery(e.target.value)
                                    setValue(null)
                                }}
                                ref={ref}
                                onClick={() => setOpen(!open)}
                            />
                            <div className='arrow'></div>

                        </div>
                        {/* <input
                            type="text"
                            ref={ref}
                            placeholder={value ? value.label : prompt}
                            value={displayValue()}
                            onChange={e => {
                                setQuery(e.target.value)
                                setValue(null)
                            }}
                            onClick={() => setOpen(!open)}
                        /> */}
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

