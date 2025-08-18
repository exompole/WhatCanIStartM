import React, { useEffect } from 'react';
import styles from './Services.module.css';
import { Link } from 'react-router-dom';
import { FiShield, FiBarChart2, FiCheck, FiFileText, FiHome, FiLock, FiUsers } from 'react-icons/fi';

const LegalCompliance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.servicePage}>
      <div className={styles.heroSection}>
        <h1>Legal Compliance Services</h1>
        <p>Navigate the complex legal landscape with our expert guidance</p>
      </div>

      <div className={styles.serviceContent}>
        <section className={styles.serviceOverview}>
          <h2>Comprehensive Legal Support for Your Business</h2>
          <p>
            Starting a business involves navigating through various legal requirements. 
            Our legal compliance services ensure your business operates within the law 
            while maximizing growth opportunities.
          </p>
        </section>

        <section className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiFileText /></div>
            <h3>Business Registration</h3>
            <ul>
              <li>MSME/Udyam Registration</li>
              <li>GST Registration & Filing</li>
              <li>Company Incorporation</li>
              <li>Partnership Registration</li>
              <li>Proprietorship Setup</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiHome /></div>
            <h3>Industry-Specific Licenses</h3>
            <ul>
              <li>FSSAI Food License</li>
              <li>Factory License</li>
              <li>Drug & Cosmetic License</li>
              <li>Pollution Control Certificates</li>
              <li>Export-Import Licenses</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiShield /></div>
            <h3>Compliance Management</h3>
            <ul>
              <li>Regular Compliance Audits</li>
              <li>Documentation Management</li>
              <li>Legal Risk Assessment</li>
              <li>Regulatory Updates</li>
              <li>Compliance Training</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiBarChart2 /></div>
            <h3>Tax Compliance</h3>
            <ul>
              <li>Income Tax Filing</li>
              <li>GST Returns & Compliance</li>
              <li>TDS Management</li>
              <li>Tax Planning & Optimization</li>
              <li>Audit Support</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiLock /></div>
            <h3>Intellectual Property</h3>
            <ul>
              <li>Trademark Registration</li>
              <li>Patent Filing</li>
              <li>Copyright Protection</li>
              <li>IP Strategy Development</li>
              <li>Infringement Protection</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiUsers /></div>
            <h3>Contract Management</h3>
            <ul>
              <li>Business Agreement Drafting</li>
              <li>Vendor Contract Review</li>
              <li>Employment Agreements</li>
              <li>Partnership Deeds</li>
              <li>Legal Document Templates</li>
            </ul>
          </div>
        </section>

        <section className={styles.processSection}>
          <h2>Our Legal Compliance Process</h2>
          <div className={styles.processSteps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h4>Initial Assessment</h4>
              <p>We analyze your business model and identify all applicable legal requirements</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h4>Documentation Preparation</h4>
              <p>Prepare and organize all necessary documents for registration and licensing</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h4>Application Submission</h4>
              <p>Submit applications to relevant authorities and track their progress</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <h4>Follow-up & Compliance</h4>
              <p>Ensure timely approvals and maintain ongoing compliance requirements</p>
            </div>
          </div>
        </section>

        <section className={styles.benefitsSection}>
          <h2>Benefits of Our Legal Services</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefit}>
              <h4><FiCheck /> Risk Mitigation</h4>
              <p>Minimize legal risks and avoid costly penalties</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Time Savings</h4>
              <p>Focus on your business while we handle legal formalities</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Expert Guidance</h4>
              <p>Access to experienced legal professionals</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Cost Effective</h4>
              <p>Affordable legal services tailored to your budget</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Ongoing Support</h4>
              <p>Continuous legal support and compliance monitoring</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Peace of Mind</h4>
              <p>Confidence that your business is legally compliant</p>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2>Ready to Get Started?</h2>
          <p>Let us help you navigate the legal landscape and set up your business for success</p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.primaryButton}>
              Get Free Consultation
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

export default LegalCompliance; 