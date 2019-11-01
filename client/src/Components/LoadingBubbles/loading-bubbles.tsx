import * as React from 'react';
import ReactLoading from 'react-loading';

import * as classes from './loading-bubbles.css';

interface ILoadingBubblesProps {
    isLoading: boolean;
    bubblesWidth?: number | string;
    bubblesHeight?: number | string;
    containerStyles?: any;
}

const BUBBLES_COLOR = "rgb(13, 103, 151)";
const BUBBLES_DEFAULT_WIDTH = '5%';
const BUBBLES_DEFAULT_HEIGHT = '5%';

const LoadingBubbles = (props: ILoadingBubblesProps) => {
    const {
        isLoading,
        bubblesWidth,
        bubblesHeight,
        containerStyles
    } = props;

    if (isLoading) {
        return (
            <div className={classes.LoadingContainer} style={containerStyles} >
                <ReactLoading
                    type="bubbles"
                    color={BUBBLES_COLOR}
                    width={bubblesWidth ? bubblesWidth : BUBBLES_DEFAULT_WIDTH}
                    height={bubblesHeight ? bubblesHeight : BUBBLES_DEFAULT_HEIGHT}
                />
            </div>
        );
    }
    return null;
};

export default LoadingBubbles;