import React, { useState } from 'react';
import * as classes from './colourPicker.css';

const DEFAULT_COLOUR_NAME: { [key: string]: string } = {
    YELLOW: 'YELLOW', // shade of yellow
    GREEN: 'GREEN',
    RED: 'RED',
    SILVER: 'SILVER',
    PURPLE: 'PURPLE',
    BLUE: 'BLUE'
}

const getDefaultColour = (colourName: string) => {
    switch (colourName) {
        case DEFAULT_COLOUR_NAME.YELLOW:
            return 'YELLOW';
        case DEFAULT_COLOUR_NAME.GREEN:
            return 'GREEN';
        case DEFAULT_COLOUR_NAME.RED:
            return 'RED';
        case DEFAULT_COLOUR_NAME.SILVER:
            return 'SILVER';
        case DEFAULT_COLOUR_NAME.PURPLE:
            return 'PURPLE';
        case DEFAULT_COLOUR_NAME.BLUE:
            return 'BLUE';
        default:
            return '';
    }
}

interface IDefaultColourProps {
    colourName: string;
    handleClick: (event: any) => void;
}

const DefaultColour = (props: IDefaultColourProps) => {
    // js spread operator assigns value from props to variable if there is a matching name between variable and props property
    const { colourName, handleClick } = props;
    return (
        <input type="button" name={colourName} className={classes.colourCircle} style={{ backgroundColor: getDefaultColour(colourName) }} onClick={handleClick} />
    )
}

const ColourPicker = () => {

    // React hook
    const [color, setColor] = useState('#ff0000');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // text box value
        const value = event.target.value;
        setColor(value);
    }

    // TODO: remove any keyword, replace with correct type
    const handleClick = (event: any) => {
        const name = event.target.name;

        setColor(getDefaultColour(name));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <div className={classes.container}>
            Outer Box
            <form onSubmit={handleSubmit}>
                Color Code: <input type="text" name="colorCode" onChange={handleChange}></input>
            </form>
            <div className={classes.colourCircle} style={{ backgroundColor: color }}>
                Inner Circle
            </div>

            <DefaultColour colourName='YELLOW' handleClick={handleClick} />
            <DefaultColour colourName='GREEN' handleClick={handleClick} />
            <DefaultColour colourName='RED' handleClick={handleClick} />
            <DefaultColour colourName='SILVER' handleClick={handleClick} />
            <DefaultColour colourName='PURPLE' handleClick={handleClick} />
            <DefaultColour colourName='BLUE' handleClick={handleClick} />
        </div >
    );
}

export default ColourPicker