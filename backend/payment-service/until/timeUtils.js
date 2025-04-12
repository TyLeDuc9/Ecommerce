
const getVietnamTime = () => {
    const utcDate = new Date();  
    return new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);  
};

module.exports = { getVietnamTime };
