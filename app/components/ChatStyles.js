const chatStyles = {
    containerStyle: {
        padding: 25,
        justifyContent: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    },
    chatContainerStyle: {
        backgroundColor: "#FFFFFF",
        width: "90%",
        margin: "0 auto",
        border: "1px solid #CCCCCC"
    },
    chatHeaderStyle: {
        display: "flex",
        textAlign: "center",
        boxShadow: "0px 3px 1px #CCCCCC",
        padding: "10px 20px 10px 20px"
    },
    chatBodyStyle: {
        margin: 20
    },
    title: {
        flex: 1,
        fontFamily: "Calibri"
    },
    sideColumn: {
        width: 80
    },
    messageBubble: {
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#DDD'
    },
    inputField: {
        backgroundColor: '#EEE',
        width: '100%',
        borderRadius: 5,
        border: 1,
        padding: 10,
        fontSize: 22,
        backgroundColor: "transparent"
    },
    submitButton: {
        backgroundColor: "#339933",
        borderWidth: 0,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10
    },
    sendIconStyle: {
        width: 30,
        height: 30
    },
    formStyle: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        border: "1px solid #CCCCCC",
        boxShadow: "3px 3px 1px #CCCCCC",
        borderRadius: 10,
        padding: 10,
        margin: 20
    }
};

export default chatStyles;