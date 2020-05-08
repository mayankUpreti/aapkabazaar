import React from 'react'

import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton=({price})=>{
    const priceForStripe=price*100;
    const publishableKey='pk_test_ob9mnZPttl1qqvddAN9t7HFm00bvTixIcO'

    const onToken=token=>{
       // console.log(token)
        alert('Payment Successfull')
    }
    return(
        <StripeCheckout
        label='Pay Now'
        name='AapKaBazaar'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your Total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
         />

    )
}

export default StripeCheckoutButton