export default {
    getTableData: () => {
        return {
            code: 200,
            data: {
                tableData:[
                    {
                        name: 'oppo',
                        todayBuy: 500,
                        monthBuy: 3500,
                        totalBuy: 22000
                    },
                    {
                        name: 'vivo',
                        todayBuy: 500,
                        monthBuy: 3500,
                        totalBuy: 22000
                    },
                    {
                        name: 'huawei',
                        todayBuy: 500,
                        monthBuy: 3500,
                        totalBuy: 22000
                    },
                    {
                        name: 'xiaomi',
                        todayBuy: 500,
                        monthBuy: 3500,
                        totalBuy: 22000
                    },
                    {
                        name: 'iphone',
                        todayBuy: 500,
                        monthBuy: 3500,
                        totalBuy: 22000
                    },
                ]
            }
        }
    },
    getCountData: () => {
        return {
            code: 200,
            data: {
                countData:[
                    {
                        name: '今日支付订单',
                        value: 1234,
                        icon: 'SuccessFilled',
                        color: '#2ec7c9'
                    },
                    {
                        name: '今日收藏订单',
                        value: 210,
                        icon: 'StarFilled',
                        color: '#ffb980'
                    },
                    {
                        name: '今日未支付订单',
                        value: 1234,
                        icon: 'GoodsFilled',
                        color: '#51abf4'
                    },
                    {
                        name: '本月支付订单',
                        value: 1234,
                        icon: 'SuccessFilled',
                        color: '#2ec7c9'
                    },
                    {
                        name: '本月收藏订单',
                        value: 210,
                        icon: 'StarFilled',
                        color: '#ffb980'
                    },
                    {
                        name: '本月未支付订单',
                        value: 1234,
                        icon: 'GoodsFilled',
                        color: '#51abf4'
                    }
                ]
            }
        }
    },
    getChartData: () => {
        return {
            code: 200,
            data: {
                orderData:{
                    date:[
                        "2019-10-01",
                        "2019-10-02",
                        "2019-10-03",
                        "2019-10-04",
                        "2019-10-05",
                        "2019-10-06",
                        "2019-10-07",
                    ],
                    data:[
                        {
                            苹果:3839,
                            小米:1423,
                            华为:4965,
                            oppo:3334,
                            vivo:2820,
                            一加:4751,
                        },
                        {
                            苹果:3797,
                            小米:3936,
                            华为:3642,
                            oppo:4408,
                            vivo:3374,
                            一加:3871,
                        },
                        {
                            苹果:3797,
                            小米:3936,
                            华为:3642,
                            oppo:4408,
                            vivo:3374,
                            一加:3871,
                        },
                        {
                            苹果:3797,
                            小米:3936,
                            华为:3642,
                            oppo:4408,
                            vivo:3374,
                            一加:3871,
                        },
                        {
                            苹果:3797,
                            小米:3936,
                            华为:3642,
                            oppo:4408,
                            vivo:3374,
                            一加:3871,
                        },
                        {
                            苹果:3797,
                            小米:3936,
                            华为:3642,
                            oppo:4408,
                            vivo:3374,
                            一加:3871,
                        },
                        {
                            苹果:3797,
                            小米:3936,
                            华为:3642,
                            oppo:4408,
                            vivo:3374,
                            一加:3871,
                        },
                    ],
                },
                videoData: [
                    {name: '小米',value: 2999},
                    {name: '苹果',value: 5999},
                    {name: 'vivo',value: 1500},
                    {name: 'oppo',value: 1999},
                    {name: '魅族',value: 2200},
                    {name: '三星',value: 4500},
                ],
                userData: [
                    {date: '周一', new: 5, active: 200},
                    {date: '周二', new: 10, active: 500},
                    {date: '周三', new: 12, active: 550},
                    {date: '周四', new: 60, active: 800},
                    {date: '周五', new: 65, active: 550},
                    {date: '周六', new: 53, active: 770},
                    {date: '周日', new: 33, active: 170},
                ]
            }
        }
    }
}