// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

const createChatStyles = {
    backgroundStyle: {
        justifyContent: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: -1,
        padding: 25,
        boxSizing: "border-box"
    },
    formContainerStyle: {
        display: "flex",
        flexDirection: "row",
        width: "80%",
        border: "1px solid #CCCCCC",
        padding: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#FFFFFF",
        border: "1px solid #CCCCCC"
    },
    paneStyle: {
        backgroundColor: "#FFFFFF",
        width: "100%"
    }, 
    containerStyle:{
        display: "flex", 
        flexDirection: "column",
    },
    formTitleStyle: {
        fontFamily: "Calibri",
        textAlign: "center",
        color: "#181818"
    },
    inputTitleStyle: {
        width: "100%",
        lineHeight: "30px",
        marginBottom: "20px",
        padding: "10px",
        fontSize: "x-large",
        fontFamily: "Calibri",
        boxSizing: "border-box",
        borderRadius: "5px",
        border: "1px solid #CCCCCC"
    },
    inputDescriptionStyle: {
        width: "100%",
        lineHeight: "30px",
        marginBottom: "20px",
        padding: "10px",
        fontSize: "x-large",
        fontFamily: "Calibri",
        boxSizing: "border-box",
        borderRadius: "5px",
        border: "1px solid #CCCCCC", 
        height: "200px",
        textAlignVertical: "top"
    }, 
    submitButtonStyle: {
        width: "100%",
        backgroundColor: "#4CAF50",
        border: "none",
        color: "#FFFFFF",
        padding: "15px 32px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "x-large",
        lineHeight: "30px",
        borderRadius: "5px", 
    }
};

export default createChatStyles;