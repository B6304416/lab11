const bcrypt = require('bcryptjs');

const makeHash = async (myText) => {
    const resultPromise = await bcrypt.hash(myText, 10);
    return resultPromise;
}
const compareHash = async (testText, myHash) => {
    const resultCompare = await bcrypt.compare(testText, myHash);
    return resultCompare;
}
const testText = '543845';

makeHash(testText).then(hash => {
    console.log(hash);

    compareHash(testText, hash).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
    
}).catch(err => {
    console.log(err);
});