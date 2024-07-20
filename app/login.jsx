'use client'

import { signInWithPhoneNumber , RecaptchaVerifier } from 'firebase/auth';
import { auth } from './config';

export const setUpRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth,
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          console.log('reCAPTCHA expired. Please complete the reCAPTCHA again.');
        },
      },
      
    );
  }
};

export const sendOTP = async (phoneNumber) => {
  try {
    setUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    console.log(confirmationResult);
    return confirmationResult;
  } catch (error) {
    console.error('Error sending OTP: ', error);
    throw error;
  }
};

export const verifyOTP = async (confirmationResult, otp) => {
  try {
    await confirmationResult.confirm(otp);
    console.log(otp);
    console.log('OTP verified successfully');
  } catch (error) {
    if (error.code === 'auth/code-expired') {
      console.error('The verification code has expired. Please request a new OTP.');
    } else {
      console.error('Error verifying OTP: ', error);
    }
    throw error;
  }
};
