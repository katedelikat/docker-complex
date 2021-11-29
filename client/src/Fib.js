import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = () => {
    const [seenIndeces, setSeenIndeces] = useState([]);
    const [results, setResults] = useState({});
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        fetchResults();
        fetchIndeces();
    }, []);

    const fetchResults = async () => {
        const results = await axios.get('/api/values/current');
        setResults(results.data);
    }

    const fetchIndeces = async () => {
        const indeces = await axios.get('/api/values/all');
        const rawIndeces = Object.values(indeces.data).map(one => one.number)
        setSeenIndeces(rawIndeces);
    }

    const renderSeenIndeces = () => {
        return seenIndeces.join(',');
    }

    const renderResults = () => {
        return (
            <div>
                {
                    Object.keys(results).map((one, idx) => (
                        <div key={"key " + idx}>
                            <label>For {one}: </label>
                            <span>calculated {results[one]}</span>
                        </div>
                    ))
                }
            </div>
        );
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`submitted ${inputValue}`);
        axios.post('/api/values', { index: inputValue })
            .then(res => {
                console.log(res);
                console.log(res.data);
        })
        setInputValue('');
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Input your value:</label>
                <input type="text" value={inputValue} onChange={(event) => {setInputValue(event.target.value)}}/>
                <button>Submit</button>
            </form>
            <h3>Seen indeces:</h3>
            <div>{renderSeenIndeces()}</div>
            <h3>Results:</h3>
            {
                renderResults()
                // Object.keys(results).map(one => (
                //     <div>
                //         <label>For value {one}:</label>
                //         <div>Calculated {results[one]}</div>
                //     </div>
                // ))
            }
        </div>
    )

}

export default Fib;