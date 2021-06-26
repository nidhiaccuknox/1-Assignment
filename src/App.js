import { useState } from 'react';
import InputTag from './components/InputTag';
import Dropdown from "./components/Dropdown";
import MultiSelectDropdown from "./components/MultiSelectDropdown";

export default function App() {

    return (
        <>
            <div style={{ width: 800 }}>
                {/* <Dropdown />
                <InputTag /> */}
                <MultiSelectDropdown/>
            </div>
        </>
    )
}
