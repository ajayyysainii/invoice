import userRouter from "./routes/user.route"
import buyerRoute from "./routes/buyer.route"

const MODULE_ROUTE_MAPPING = [
    {
        prefix: '/user',
        router: userRouter
    },
    {
        prefix: '/buyer',
        router: buyerRoute
    }
]

export default MODULE_ROUTE_MAPPING