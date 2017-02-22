var Mock = require('mockjs/dist/mock');
var data1 = Mock.mock({
    'items|1-10': [{
        'id|+1': 1,
        'name|1': ['4F', '5F', '6F'],
        'arr|5': [{
            'id|+1': 100,
            'list|14': [{
                'num': '08-10',
                'stauts|1': [0, 1]
            }]
        }]
    }]
});
var data2 = Mock.mock({
    'items|14': [{
        'id|+1': 1,
        'price': 60,
        'status|1': [1, 2, 3],
        'startTime|+1': 8,
        'endTime|+1': 9,
    }]
});
module.exports = {
    data1,
    data2
}