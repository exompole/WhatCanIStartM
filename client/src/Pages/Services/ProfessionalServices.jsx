import React, { useEffect } from 'react';
import styles from './Services.module.css';
import { Link } from 'react-router-dom';

const ProfessionalServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.servicePage}>
      <div className={styles.heroSection}>
        <h1>Professional Services</h1>
        <p>Access expert professional services to support your business growth and success</p>
      </div>

      <div className={styles.serviceContent}>
        <section className={styles.serviceOverview}>
          <h2>Comprehensive Professional Support</h2>
          <p>
            We provide access to a network of qualified professionals who can help you 
            with various aspects of your business. From accounting to legal support, 
            we connect you with the right experts for your needs.
          </p>
        </section>

        <section className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>📊</div>
            <h3>Accounting & Bookkeeping</h3>
            <ul>
              <li>Financial Statement Preparation</li>
              <li>Tax Planning & Filing</li>
              <li>Bookkeeping Services</li>
              <li>Audit Support</li>
              <li>Financial Advisory</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>⚖️</div>
            <h3>Legal Services</h3>
            <ul>
              <li>Business Law Consultation</li>
              <li>Contract Review & Drafting</li>
              <li>Intellectual Property Protection</li>
              <li>Regulatory Compliance</li>
              <li>Dispute Resolution</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>🏗️</div>
            <h3>Business Consulting</h3>
            <ul>
              <li>Strategic Planning</li>
              <li>Market Entry Strategy</li>
              <li>Business Model Development</li>
              <li>Risk Management</li>
              <li>Growth Strategy</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>💼</div>
            <h3>HR & Recruitment</h3>
            <ul>
              <li>Employee Recruitment</li>
              <li>HR Policy Development</li>
              <li>Performance Management</li>
              <li>Training & Development</li>
              <li>Employee Relations</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>🔧</div>
            <h3>IT & Technology</h3>
            <ul>
              <li>Software Development</li>
              <li>IT Infrastructure Setup</li>
              <li>Digital Transformation</li>
              <li>Cybersecurity Services</li>
              <li>Cloud Solutions</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>📈</div>
            <h3>Financial Advisory</h3>
            <ul>
              <li>Investment Planning</li>
              <li>Business Valuation</li>
              <li>Merger & Acquisition Support</li>
              <li>Capital Structure Optimization</li>
              <li>Financial Risk Management</li>
            </ul>
          </div>
        </section>

        <section className={styles.processSection}>
          <h2>How Our Professional Services Work</h2>
          <div className={styles.processSteps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h4>Service Assessment</h4>
              <p>We understand your specific professional service requirements</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h4>Expert Matching</h4>
              <p>Connect you with qualified professionals in your field</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h4>Service Delivery</h4>
              <p>Professional services are delivered with quality assurance</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <h4>Ongoing Support</h4>
              <p>Continuous support and follow-up for long-term success</p>
            </div>
          </div>
        </section>

        <section className={styles.benefitsSection}>
          <h2>Why Choose Our Professional Services?</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefit}>
              <h4>✅ Qualified Experts</h4>
              <p>Access to certified and experienced professionals</p>
            </div>
            <div className={styles.benefit}>
              <h4>✅ Quality Assurance</h4>
              <p>All services are quality-checked and guaranteed</p>
            </div>
            <div className={styles.benefit}>
              <h4>✅ Cost Effective</h4>
              <p>Competitive pricing for professional services</p>
            </div>
            <div className={styles.benefit}>
              <h4>✅ Convenient Access</h4>
              <p>Easy access to multiple professional services</p>
            </div>
            <div className={styles.benefit}>
              <h4>✅ Reliable Support</h4>
              <p>Dependable professional support when you need it</p>
            </div>
            <div className={styles.benefit}>
              <h4>✅ Business Growth</h4>
              <p>Professional services that support your business growth</p>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2>Need Professional Support?</h2>
          <p>Connect with qualified professionals to help your business succeed</p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.primaryButton}>
              Get Professional Support
            </Link>
            <Link to="/lemon" className={styles.secondaryButton}>
              Explore Business Ideas
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfessionalServices; 