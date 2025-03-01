const {readFile, writeFile} = require ('fs');

readFile ('C:/Users/AdminX/Desktop/дз/пропрактикум/NodeJS/content/first.txt', 'utf8', (err, result) => {
    if (err) {
        console.log(err);
        return
    }
    const first = result;
    readFile ('C:/Users/AdminX/Desktop/дз/пропрактикум/NodeJS/content/second.txt', 'utf8', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        const second = result;
        writeFile (
            'C:/Users/AdminX/Desktop/дз/пропрактикум/NodeJS/content/result-async.txt', 
            `Here is the result: ${first}, ${second}`, 
            (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);
        })
    })
})