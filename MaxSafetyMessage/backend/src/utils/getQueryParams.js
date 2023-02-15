const getQueryParams = (search) => {
    search=search.split("?")[1]
    const params = {};
    const key_value_array = search.split('&');
    key_value_array.map((value, index, array) => {
        const key = value.split('=')[0];
        const val = value.split('=')[1];
        params[key] = val;
    });
    return params;
};
module.exports = { getQueryParams: getQueryParams }
