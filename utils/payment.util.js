const paystack = (request) => {
    // const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY
    const SECRET_KEY = process.env.PAYSTACK_DEV_SECRET_KEY

    const initializePayment = (form, mycallback) => {
        const options = {
            url: 'https://api.paystack.co/transaction/initialize',
            headers: {
                Authorization: SECRET_KEY,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            form
        }

        const callback = (error, response, body) => {
            return mycallback(error, body)
        }
        request.post(options, callback)
    }
    
    const verifyPayment = (ref, mycallback) => {
        const options = {
            url: 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
            headers: {
                Authorization: SECRET_KEY,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        }
        const callback = (error, response, body) => {
            return mycallback(error, body)
        }
        request(options, callback)
    }
    return { initializePayment, verifyPayment }
}

module.exports = { paystack };