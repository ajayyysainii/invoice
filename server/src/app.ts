import userRouter from "./routes/user.route"
import buyerRoute from "./routes/buyer.route"
import invoiceRoute from './routes/invoice.route'
import itemCatalogRoute from './routes/itemCatalog.route'
import espReadingRoute from "./routes/espReading.route"

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
    },
    {
        prefix: '/itemCatalog',
        router: itemCatalogRoute
    },
    {
        prefix: '/esp-reading',
        router: espReadingRoute
    }
]

export default MODULE_ROUTE_MAPPING