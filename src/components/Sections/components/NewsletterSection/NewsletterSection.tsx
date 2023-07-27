import axios from 'axios';
import { ChangeEvent, FC, useState } from 'react';
import { SectionProps } from '../types';
import styles from './NewsletterSection.module.scss';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const NEXT_PUBLIC_API_LOGIN = process.env.NEXT_PUBLIC_API_LOGIN;
const NEXT_PUBLIC_API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

const validateEmail = (email: string) => {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Decided to go fast for that
// so not implemented form here
// but normally would be good to implement here some sort of form library
// that would handle validation etc
export const NewsletterSection: FC<SectionProps> = () => {
  const [email, setEmail] = useState('');
  const [isSending, setISending] = useState(false);
  const [isSentMessage, setIsSentMessage] = useState<null | string>(null);

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubscribe = async () => {
    // implement simple validation
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      alert('It looks like your email address is not correct please check it.');
      return;
    }

    setISending(true);

    try {
      if (!NEXT_PUBLIC_API_LOGIN || !NEXT_PUBLIC_API_PASSWORD) {
        throw new Error('No authorization data for AIP');
      }

      const { data } = await axios.post<{ message: string }>(
        `${NEXT_PUBLIC_API_URL}/newsletter`,
        { email },
        {
          // Actually this Endpoint shouldn't ask for authorization
          // I've created env variables in .env file - API_LOGIN, API_PASSWORD
          // But this variables are not (and shouldn't) be accessible from browser
          // So for this exercise purpose only, I am adding a new variables, so this endpoint can work
          auth: {
            username: NEXT_PUBLIC_API_LOGIN,
            password: NEXT_PUBLIC_API_PASSWORD,
          },
        }
      );

      setIsSentMessage(data.message);
    } catch (exception) {
      alert(
        'There was a problem with singup to a newsletter, please try again!'
      );
    } finally {
      setISending(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Sign up for Newsletter</div>
      <div className={styles.form}>
        <input
          value={email}
          onChange={handleChangeEmail}
          className={styles.email}
          placeholder="Type your email"
        />
        {/* Component looks the same as for Contact Us, could be extracted as a Button component and reused */}
        <button
          onClick={handleSubscribe}
          disabled={isSending ? true : undefined}
          className={styles.button}
        >
          Submit
        </button>
      </div>
      {isSentMessage && <div className={styles.thankYou}>{isSentMessage}</div>}
    </div>
  );
};
