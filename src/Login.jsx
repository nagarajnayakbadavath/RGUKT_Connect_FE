import React, { useState } from 'react';
import { addUser } from './utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './config';

const Login = ({ isSignup }) => {
  const [emailId, setEmailId] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState('');
  const [photourl, setPhotourl] = useState('');

  const [error, setError] = useState('');
  const [emailIdError, setEmailIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [photourlError, setPhotourlError] = useState('');
  const [skillsError, setSkillsError] = useState('');
  const [aboutError, setAboutError] = useState('');

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@rgukt\.ac\.in$/.test(email);

  const validateSignup = () => {
    let correct = true;
    if (!firstName) {
      setFirstNameError('First name should be entered');
      correct = false;
    }
    if (!lastName) {
      setLastNameError('Last name should be entered');
      correct = false;
    }
    if (!about) {
      setAboutError('Write something about yourself');
      correct = false;
    }
    if (!skills) {
      setSkillsError('Mention skills');
      correct = false;
    }
    if (!photourl) {
      setPhotourlError('Photo URL is compulsory');
      correct = false;
    }
    return correct;
  };

  const validateForm = () => {
    let isValid = true;
    if (!emailId) {
      setEmailIdError('Email is required');
      isValid = false;
    } else if (!validateEmail(emailId)) {
      setEmailIdError('Only @rgukt.ac.in emails allowed');
      isValid = false;
    } else {
      setEmailIdError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSendOtp = async () => {
    if (!validateEmail(emailId)) {
      setEmailIdError('Invalid RGUKT Email ID');
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/send-otp`, { email: emailId });
      setOtpSent(true);
      setError('');
      alert(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(`${API_URL}/verify-otp`, { email: emailId, otp });
      setOtpVerified(true);
      setError('');
      alert(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP');
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const res = await axios.post(`${API_URL}/login`, {
        emailId,
        password
      }, { withCredentials: true });

      const { newuser, token } = res.data;
      localStorage.setItem("token", token);
      dispatch(addUser(newuser));
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleSignUp = async () => {
    if (!otpVerified) {
      alert("Please verify OTP before continuing.");
      return;
    }

    if (!validateForm() || !validateSignup()) return;
    try {
      const res = await axios.post(`${API_URL}/register`, {
        firstName,
        lastName,
        emailId,
        password,
        about,
        skills,
        photourl,
      });

      if (res.status === 201) {
        navigate("/login");
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      setError("Signup failed");
      console.error("Signup Error:", err.message);
    }
  };

  // === Forgot Password Handlers ===
  const handleForgotPasswordSendOTP = async () => {
    if (!validateEmail(emailId)) {
      setEmailIdError('Invalid RGUKT Email ID');
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/send-otp`, { email: emailId });
      alert(res.data.message);
      setOtpSent(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleForgotPasswordVerifyOTP = async () => {
    try {
      const res = await axios.post(`${API_URL}/verify-otp`, { email: emailId, otp });
      alert(res.data.message);
      setOtpVerified(true);
      setShowNewPassword(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP');
    }
  };

  const handleResetPassword = async () => {
    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    try {
      const res = await axios.patch(`${API_URL}/forgotPassword`, {
        email: emailId,
        password: password,
      });
      alert('Password updated successfully');
      setIsForgotPassword(false);
      setOtpSent(false);
      setOtpVerified(false);
      setShowNewPassword(false);
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="form-control w-full max-w-xs">
        <label className="label justify-center font-serif font-bold">
          <span className="label-text text-black font-bold">
            {isSignup ? "Signup" : isForgotPassword ? "Reset Password" : "Login"}
          </span>
        </label>

        {error && <span className="text-red-500 text-sm">{error}</span>}

        <label className="label">
          <span className="label-text text-black font-bold">EmailId:</span>
        </label>
        <input
          type="email"
          value={emailId}
          required
          placeholder="Enter Domain MailId's Only"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setEmailId(e.target.value)}
        />
        {emailIdError && <span className="text-red-500 text-sm">{emailIdError}</span>}

        {/* === Forgot Password Flow === */}
        {isForgotPassword && (
          <>
            {!otpSent && (
              <button className="btn btn-outline btn-secondary mt-2" onClick={handleForgotPasswordSendOTP}>
                Send OTP
              </button>
            )}

            {otpSent && !otpVerified && (
              <>
                <label className="label mt-2">
                  <span className="label-text text-black font-bold">Enter OTP:</span>
                </label>
                <input
                  type="text"
                  value={otp}
                  placeholder="Enter OTP"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button className="btn btn-outline btn-info mt-2" onClick={handleForgotPasswordVerifyOTP}>
                  Verify OTP
                </button>
              </>
            )}

            {otpVerified && showNewPassword && (
              <>
                <label className="label mt-2">
                  <span className="label-text text-black font-bold">Enter New Password:</span>
                </label>
                <input
                  type="password"
                  value={password}
                  placeholder="Enter New Password"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
                <button className="btn btn-outline btn-success mt-3" onClick={handleResetPassword}>
                  Create New Password
                </button>
              </>
            )}

            <p className="text-gray-500 underline mt-2 text-sm cursor-pointer" onClick={() => {
              setIsForgotPassword(false);
              setOtpSent(false);
              setOtpVerified(false);
              setShowNewPassword(false);
              setPassword('');
              setOtp('');
              setEmailId('');
            }}>
              Back to Login
            </p>
          </>
        )}

        {/* === Normal Login/Signup === */}
        {!isForgotPassword && (
          <>
            {isSignup && (
              <>
                {!otpSent && (
                  <button className="btn btn-outline btn-secondary mt-2" onClick={handleSendOtp}>
                    Send OTP
                  </button>
                )}
                {otpSent && !otpVerified && (
                  <>
                    <label className="label mt-2">
                      <span className="label-text text-black font-bold">Enter OTP:</span>
                    </label>
                    <input
                      type="text"
                      value={otp}
                      placeholder="Enter OTP"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <button className="btn btn-outline btn-info mt-2" onClick={handleVerifyOtp}>
                      Verify OTP
                    </button>
                  </>
                )}
              </>
            )}

            {(!isSignup || otpVerified) && (
              <>
                <label className="label mt-2">
                  <span className="label-text text-black font-bold">Password:</span>
                </label>
                <input
                  type="password"
                  value={password}
                  required
                  placeholder="Enter your password"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
              </>
            )}

            {isSignup && otpVerified && (
              <>
                <label className="label">
                  <span className="label-text text-black font-bold">First Name:</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  placeholder="First Name"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {firstNameError && <span className="text-red-500 text-sm">{firstNameError}</span>}

                <label className="label">
                  <span className="label-text text-black font-bold">Last Name:</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
                {lastNameError && <span className="text-red-500 text-sm">{lastNameError}</span>}

                <label className="label">
                  <span className="label-text text-black font-bold">Photo URL:</span>
                </label>
                <input
                  type="text"
                  value={photourl}
                  placeholder="Paste photo URL"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPhotourl(e.target.value)}
                />
                {photourlError && <span className="text-red-500 text-sm">{photourlError}</span>}

                <label className="label">
                  <span className="label-text text-black font-bold">Skills:</span>
                </label>
                <input
                  type="text"
                  value={skills}
                  placeholder="Enter your skills"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setSkills(e.target.value)}
                />
                {skillsError && <span className="text-red-500 text-sm">{skillsError}</span>}

                <label className="label">
                  <span className="label-text text-black font-bold">About:</span>
                </label>
                <input
                  type="text"
                  value={about}
                  placeholder="Write about yourself"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAbout(e.target.value)}
                />
                {aboutError && <span className="text-red-500 text-sm">{aboutError}</span>}
              </>
            )}

            <button
              className="btn btn-outline btn-primary m-3 justify-center w-15 text-black font-bold"
              onClick={isSignup ? handleSignUp : handleLogin}
            >
              {isSignup ? 'Signup' : 'Login'}
            </button>

            {!isSignup && (
              <p
                className="text-blue-600 underline text-sm cursor-pointer"
                onClick={() => {
                  setIsForgotPassword(true);
                  setError('');
                }}
              >
                Forgot Password?
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
