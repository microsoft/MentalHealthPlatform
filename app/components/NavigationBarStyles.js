// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

const NavigationBarStyles = {
    navigationBarStyle: {
        display: "flex",
        flexDirection: "row",
        height: "50px",
        padding: "0px 25px",
        lineHeight: "50px",
        fontSize: "x-large",
        fontFamily: "Calibri",
        color: "#FFFFFF",
        backgroundColor: "#333333",
        boxShadow: "0px 0px 20px #1A1A1A"
    },    
    navigationBarLeftStyle: {
        display: "flex",
        flex: "1 1 auto"
    },    
    navigationBarTitleLink: {
        textDecoration: "none",
        color: "#FFFFFF",
        fontWeight: "bold"
    },    
    navigationBarRightStyle: {
        display: "flex",
        flex: "0 1 auto"
    },
    navigationBarLoginLink: {
        textDecoration: "none",
        color: "#FFFFFF"
    }
};

export default NavigationBarStyles;