const mentionStyles = {
    control: {
        backgroundColor: '#fff',
        fontSize: '0.88rem',
        fontWeight: '350',
        padding: '0px',
        borderRadius: '0.25rem',
    },
    highlighter: {
        padding: 10,
        border: '1px solid transparent',
    },
    input: {
        padding: '0px 0.63rem 0px 0.63rem',
        border: '1px solid rgb(223, 231, 240)',
        borderRadius: '0.25rem',
        fontSize: '0.88rem',
        lineHeight: '1rem',
        height: '2rem',
        backgroundColor: 'rgb(250, 251, 252)',
        color: 'rgb(51, 51, 51)',
        appearance: 'none',
        '&focused': {
            borderColor: 'red',
        }
    },
    suggestions: {
        list: {
            backgroundColor: 'white',
            border: '1px solid rgb(223, 231, 240)',
            fontSize: '1rem',
            borderRadius: '0.25rem',
        },
        item: {
            padding: '5px 15px',
            '&focused': {
                backgroundColor: '#cee4e5',
            },
        },
    },
    mention: {
        backgroundColor: '#cee4e5', // Цвет фона для упоминания
    },
};

export default mentionStyles;

// .custom-input::placeholder {
//     color: rgb(190, 190, 190);
// }

// .custom-input {
//     width: 100%;
//     padding: 0px 0.63rem 0px 0.63rem;
//     font-size: 0.88rem;
//     line-height: 1rem;
//     font-weight: 350;
//     border: 1px solid rgb(223, 231, 240);
//     border-radius: 0.25rem;
//     background-color: rgb(250, 251, 252);
//     outline: none;
//     appearance: none;
//     z-index: 1;
//     height: 1.5rem;
//     color: rgb(51, 51, 51);
// }