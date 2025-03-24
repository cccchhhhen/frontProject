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
                        icon: 'SuccessFilled',
                        color: '#ffb980'
                    },
                    {
                        name: '今日支付订单',
                        value: 1234,
                        icon: 'SuccessFilled',
                        color: '#2ec7c9'
                    },
                    {
                        name: '今日未支付订单',
                        value: 1234,
                        icon: 'GoodsFilled',
                        color: '#5ablef'
                    },
                    {
                        name: '本月支付订单',
                        value: 1234,
                        icon: 'SuccessFilled',
                        color: '#2ec7c9'
                    },
                    {
                        name: '今日收藏订单',
                        value: 210,
                        icon: 'ffb980',
                        color: '#5ablef'
                    },
                    {
                        name: '本月未支付订单',
                        value: 1234,
                        icon: 'GoodsFilled',
                        color: '#5ablef'
                    }
                ]
            }
        }
    }
}