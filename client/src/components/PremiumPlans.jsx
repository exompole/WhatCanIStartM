import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PremiumPlans.module.css";


const plans = [
  {
    name: "Starter Plan",
    price: "₹1999/month",
    features: [
      "View business plans",
      "Access Legal Compliances",
      "Proposal Creation & Funding",
      "Business Performance Improvement",
      "Professional Services",
      "Marketing"
    ],
    button: "Get Started"
  },
  {
    name: "Pro Plan",
    price: "₹6999/month",
    features: [
      "All Starter features",
      "Hand Holding (Personal Mentor)",
      "Priority Customer Support",
      "Exclusive Resources & Templates",
      "Early Access to New Features",
      "All Form filling,registration,Legal Formalities are assisted"
    ],
    button: "Go Premium"
  }
];

const PremiumPlans = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Choose Your Premium Plan</h1>
      <div className={styles.plansGrid}>
        {plans.map((plan, idx) => (
          <div key={plan.name} className={styles.planCard}>
            <h2 className={styles.planName}>{plan.name}</h2>
            <div className={styles.price}>{plan.price}</div>
            <ul className={styles.featuresList}>
              {plan.features.map((feature, i) => (
                <li key={i} className={styles.featureItem}>✔️ {feature}</li>
              ))}
            </ul>
            <button
              className={styles.ctaBtn}
              onClick={() => navigate('/PaymentForm', { state: { plan } })}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>
      <div className={styles.note}>
        <strong>Pro Plan</strong> includes priority support, personal mentor, and all platform features.
      </div>
    </div>
  );
};

export default PremiumPlans;
