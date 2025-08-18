import React, { useState, useEffect } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './PaymentForm.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState(null);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    city: ''
  });
  const [countryid, setCountryid] = useState(101);
  const [stateid, setStateid] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.name || form.name.length < 2) newErrors.name = 'Enter your full name';
    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = 'Enter valid 10-digit phone';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Enter valid email';
    if (!form.state) newErrors.state = 'Select state';
    if (!form.city) newErrors.city = 'Select city';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleStateChange = (e) => {
    setStateid(e.id);
    setForm({ ...form, state: e.name });
    setErrors({ ...errors, state: '' });
  };

  const handleCityChange = (e) => {
    setForm({ ...form, city: e.name });
    setErrors({ ...errors, city: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess('');
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    setLoading(true);
    // Placeholder: here you'd call your payment gateway / backend
    setTimeout(() => {
      setLoading(false);
      setSuccess('Payment simulated. Thank you — your subscription is active.');
      // Redirect to dashboard or confirmation
      setTimeout(() => navigate('/'), 1200);
    }, 1500);
  };

  useEffect(() => {
    // If navigated with plan state, prefill summary
    if (location.state?.plan) {
      setSelectedPlan(location.state.plan);
    }
  }, [location.state]);

  return (
    <div className={`${styles.paymentFormCard} ${styles.enhanced}`}>
      <h1 className={styles.title}>Subscribe & Checkout</h1>
      <p className={styles.subtitle}>Choose your plan and complete payment to unlock premium features</p>
      <div className={styles.formColumns}>
        <form className={styles.paymentForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name"><FaUser /> Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter Your Full Name"
            className={errors.name ? styles.errorInput : ''}
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="phone"><FaPhone /> Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            className={errors.phone ? styles.errorInput : ''}
          />
          {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email"><FaEnvelope /> E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="abc@gmail.com"
            className={errors.email ? styles.errorInput : ''}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label><FaMapMarkerAlt /> State</label>
          <StateSelect
            countryid={countryid}
            onChange={handleStateChange}
            placeHolder="Select State"
          />
          {errors.state && <span className={styles.errorText}>{errors.state}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label><FaMapMarkerAlt /> City</label>
          <CitySelect
            countryid={countryid}
            stateid={stateid}
            onChange={handleCityChange}
            placeHolder="Select City"
          />
          {errors.city && <span className={styles.errorText}>{errors.city}</span>}
        </div>
        <button className={styles.submitBtn} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {success && <div className={styles.successMsg}>{success}</div>}
        </form>

        <aside className={styles.planSummary}>
          <h3>Plan Summary</h3>
          {selectedPlan ? (
            <div>
              <div className={styles.summaryName}>{selectedPlan.name}</div>
              <div className={styles.summaryPrice}>{selectedPlan.price}</div>
              <ul className={styles.summaryFeatures}>
                {selectedPlan.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={styles.summaryEmpty}>No plan selected. You can choose one from Plans page.</div>
          )}
          <div className={styles.terms}>
            <input id="terms" type="checkbox" onChange={(e) => setErrors({ ...errors, terms: e.target.checked ? '' : 'Accept terms' })} />
            <label htmlFor="terms"> I agree to the <a href="/terms">Terms & Conditions</a></label>
            {errors.terms && <div className={styles.errorText}>{errors.terms}</div>}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PaymentForm;
