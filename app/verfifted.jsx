'use client'

import { useState } from 'react';
import {  sendOTP, verifyOTP } from './login';

const PhoneSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await sendOTP('+2'+phoneNumber);
      setConfirmationResult(result);
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await verifyOTP(confirmationResult, otp);
      setError('OTP verified successfully!');
    } catch (error) {
      setError('Failed to verify OTP. The code might have expired. Please request a new OTP.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSendOTP}>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(  e.target.value)}
          placeholder="Phone Number"
        />
        <div id="recaptcha-container"></div>
        <button type="submit">Send OTP</button>
      </form>

      {confirmationResult && (
        <form onSubmit={handleVerifyOTP}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP"
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PhoneSignIn;
