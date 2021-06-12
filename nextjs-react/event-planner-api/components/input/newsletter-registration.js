import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

const NewsletterRegistration = () => {
  const inputRef = useRef();

  const registrationHandler = (event) => {
    event.preventDefault();

    const subscriberEmail = inputRef.current.value;
    const reqBody = { email: subscriberEmail };

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={inputRef}
          />
          <button type='submit'>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
