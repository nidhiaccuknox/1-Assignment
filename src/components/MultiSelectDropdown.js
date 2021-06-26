import { useState, useRef, useEffect } from 'react';
import options from "../data.json";
import './multiSelectDropdown.css';

export default function MultiSelectDropdown() {

    const [tags, setTags] = useState([]);
    const [value, setValue] = useState('')
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const ref = useRef(null);

    useEffect(() => {
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, []);

    function close(e) {
        setOpen(e && e.target === ref.current);
    }

    function filter(options) {
        return options.filter((option) => option.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
    }

    function displayValue() {

        if (query.length > 0) return query;

        if (value) {
            const trimmedInput = value.label;
            if (trimmedInput.length && !tags.includes(trimmedInput)) {
                setTags(prevState => [...prevState, trimmedInput]);
                setValue('');
            }
            return value.label;
        }
        return "";
    }

    function selectOption(option) {
        setQuery("");
        setValue(option)
        setOpen(false);
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
                                type="text"
                                value={displayValue()}
                                placeholder={!tags.length ? 'Search...' : ''}
                                onChange={e => { setQuery(e.target.value); setValue(null) }}
                                ref={ref}
                                onClick={() => setOpen(!open)}
                            />
                            
                        </div>

                    </div>
                    {
                        tags.length ? <div className='cross' onClick={() => setTags([])}>x</div> : null
                    }
                    <span className='vertical'></span>
                    <div className={`arrow ${open ? "open" : null}`}></div>
                </div>
                <div className={`options ${open ? "open" : null}`}>
                    {
                        filter(options).map(option => {
                            if (!tags.includes(option.label)) {
                                return (
                                    <div
                                        key={option.id}
                                        className={`option ${value === option ? "selected" : null}`}
                                        onClick={() => selectOption(option)}>
                                        {option.label}
                                    </div>)
                            }
                        })
                    }
                </div>
            </div>
        </>
    )
}

