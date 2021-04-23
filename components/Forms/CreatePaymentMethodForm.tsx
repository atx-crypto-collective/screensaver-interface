// https://stripe.com/docs/stripe-js/react
// TODO: Show error messages (either alert window or a toast)
// TODO: Handle invalid state UI
import {
  useStripe,
  useElements,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js'
import { StripeElementStyle } from '@stripe/stripe-js'
import React from 'react'
// import resolveConfig from 'tailwindcss/resolveConfig'
// import defaultTailwindTheme from 'tailwindcss/defaultTheme'
// import tailwindConfig from '../../tailwind.config.js'

interface IProps {
  submitButtonLabel?: string
}

const CreatePaymentMethodForm: React.VFC<IProps> = ({
  submitButtonLabel = 'Add Payment Method',
}) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    const cardNumberElement = elements.getElement(CardNumberElement)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
    })

    if (error) {
      console.log('[error]', error)
    } else {
      console.log('[PaymentMethod]', paymentMethod)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'flex flex-col space-y-3'}>
          <div className={'flex flex-col space-y-1'}>
            <label htmlFor={'cardNumber'}>Card Number</label>
            <CardNumberElement
              id={'cardNumber'}
              className={'input'}
              options={{ style }}
            />
          </div>
          <div className={'w-full flex space-x-4'}>
            <div className={'w-full flex flex-col space-y-1'}>
              <label htmlFor={'cardExpiry'}>Exp. Date</label>
              <CardExpiryElement
                id={'cardExpiry'}
                className={'input'}
                options={{ style }}
              />
            </div>
            <div className={'w-full flex flex-col space-y-1'}>
              <label htmlFor={'cardCvc'}>CVC</label>
              <CardCvcElement
                id={'cardCvc'}
                className={'input'}
                options={{ style }}
              />
            </div>
          </div>
        </div>
        <div>
          {/** TODO: Disable depending on state: 'loading' | 'submitting' */}
          <button
            className={'button button--gradient w-full'}
            disabled={!stripe}
          >
            {submitButtonLabel}
          </button>
        </div>
      </div>
    </form>
  )
}

const style: StripeElementStyle = {
  base: {
    fontSize: '14px', // defaultTailwindTheme.fontSize.base,
    fontFamily: 'IBM Plex Mono, monospace',
    fontWeight: 700,
    color: '#fff',
    '::placeholder': {
      color: '#8c8c8c',
    },
  },
  invalid: {
    color: '#ff4d4d',
  },
}

export default CreatePaymentMethodForm
