
const APIs = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
    },
    LIST: {
        CREATE: '/lists/create',
        GET: '/lists/get',
        DELETE: '/lists/delete/',
        UPDATE: '/lists/update',
    },
    ITEMS: {
        CREATE: '/items/create',
        GET: '/items/get/',
        DELETE: '/items/delete/',
        UPDATE: '/items/update/',
    },
    ORDERS: {
        CREATE: '/orders/create',
        GET: '/orders/get',
    },
    VENDOR: {
        REGISTER: '/vendor/register',
        LOGIN: '/vendor/login',
        STOCK: '/vendor/stock',
        STOCK__GET: '/vendor/stock/get',
        STOCK__DELETE: '/vendor/stock/delete/',
        STOCK__UPDATE: '/vendor/stock/update',
        NEARBY: '/vendor/nearby/'
    },
    PAYMENT: {
        CREATE_ORDER: '/payment/create-order'
    }
}

export default APIs