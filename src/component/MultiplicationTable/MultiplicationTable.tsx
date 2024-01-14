import React, { useState } from 'react';
import './MultiplicationTable.css'; // Import the CSS file

const MultiplicationTable: React.FC = () => {
    const [number, setNumber] = useState<number | ''>('');
    const [table, setTable] = useState<number[][]>([]);
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [notification, setNotification] = useState<string | null>(null);

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputNumber = event.target.value;
        setNumber(inputNumber as number | '');

        // Enable/disable the button based on input validity
        setButtonDisabled(!inputNumber || isNaN(Number(inputNumber)) || Number(inputNumber) < 1);

        // Show notification for invalid input
        if (inputNumber == '' || !inputNumber || isNaN(Number(inputNumber)) || Number(inputNumber) < 1) {
            setNotification('Please enter a valid number.');
        } else {
            setNotification(null);
        }
    };

    const handleGenerateTable = () => {
        if (number && !isNaN(Number(number))) {
            const newTable = Array.from({ length: 10 }, (_, index) => Array.from({ length: 1 }, () => (index + 1) * Number(number)));
            setTable(newTable);
        }
        setNumber('')
        setButtonDisabled(true);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isButtonDisabled) {
            handleGenerateTable();
        }
    };

    return (
        <div className="multiplication-table-container">
            <form onSubmit={handleFormSubmit}>
                <label>
                    Enter a number:
                    <input type="number" value={number} onChange={handleNumberChange} />
                </label>
                <button onClick={handleGenerateTable} disabled={isButtonDisabled}>
                    Generate Table
                </button>
            </form>


            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}


            {table.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Table</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>{rowIndex + 1}</td>
                                <td>{row[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MultiplicationTable;
