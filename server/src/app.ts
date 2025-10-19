import userRouter from "./routes/user.route"
import buyerRoute from "./routes/buyer.route"
import invoiceRoute from './routes/invoice.route'

const MODULE_ROUTE_MAPPING = [
    {
        prefix: '/user',
        router: userRouter
    },
    {
        prefix: '/buyer',
        router: buyerRoute
    },
    {
        prefix: '/invoice',
        router: invoiceRoute
    }
]

export default MODULE_ROUTE_MAPPING