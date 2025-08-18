import React, { useEffect } from 'react';
import styles from './Services.module.css';
import { Link } from 'react-router-dom';
import { FiCheck, FiBarChart2, FiTrendingUp, FiFileText, FiDollarSign, FiCreditCard, FiTarget, FiSearch } from 'react-icons/fi';

const ProposalFunding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.servicePage}>
      <div className={styles.heroSection}>
        <h1>Proposal Creation & Funding</h1>
        <p>Transform your business ideas into compelling proposals and secure the funding you need</p>
      </div>

      <div className={styles.serviceContent}>
        <section className={styles.serviceOverview}>
          <h2>Professional Proposal & Funding Services</h2>
          <p>
            We help entrepreneurs create compelling business proposals and connect them with 
            the right funding sources. From government schemes to private investors, 
            we guide you through the entire funding process.
          </p>
        </section>

        <section className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiFileText /></div>
            <h3>Business Plan Development</h3>
            <ul>
              <li>Executive Summary Creation</li>
              <li>Market Analysis & Research</li>
              <li>Financial Projections</li>
              <li>SWOT Analysis</li>
              <li>Risk Assessment</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiDollarSign /></div>
            <h3>Government Scheme Applications</h3>
            <ul>
              <li>PMEGP Scheme Applications</li>
              <li>Stand-Up India Applications</li>
              <li>MUDRA Loan Applications</li>
              <li>PM FME Scheme Support</li>
              <li>MSME Registration & Benefits</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiCreditCard /></div>
            <h3>Bank Loan Assistance</h3>
            <ul>
              <li>Loan Application Preparation</li>
              <li>Documentation Support</li>
              <li>Bank Liaison Services</li>
              <li>Collateral Assessment</li>
              <li>Loan Processing Follow-up</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiBarChart2 /></div>
            <h3>Financial Modeling</h3>
            <ul>
              <li>Revenue Projections</li>
              <li>Cost Structure Analysis</li>
              <li>Break-even Analysis</li>
              <li>Cash Flow Projections</li>
              <li>Investment Return Calculations</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiTarget /></div>
            <h3>Investor Pitch Decks</h3>
            <ul>
              <li>Professional Presentation Design</li>
              <li>Investor Targeting Strategy</li>
              <li>Pitch Practice Sessions</li>
              <li>Due Diligence Support</li>
              <li>Investment Negotiation</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiSearch /></div>
            <h3>Market Research</h3>
            <ul>
              <li>Industry Analysis Reports</li>
              <li>Competitor Analysis</li>
              <li>Customer Survey Design</li>
              <li>Market Size Estimation</li>
              <li>Trend Analysis</li>
            </ul>
          </div>
        </section>

        <section className={styles.processSection}>
          <h2>Our Proposal & Funding Process</h2>
          <div className={styles.processSteps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h4>Initial Consultation</h4>
              <p>We understand your business idea and funding requirements</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h4>Research & Analysis</h4>
              <p>Conduct market research and financial feasibility analysis</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h4>Proposal Development</h4>
              <p>Create comprehensive business plan and funding proposal</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <h4>Application & Follow-up</h4>
              <p>Submit applications and manage the entire funding process</p>
            </div>
          </div>
        </section>

        <section className={styles.benefitsSection}>
          <h2>Why Choose Our Funding Services?</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefit}>
              <h4><FiCheck /> Expert Guidance</h4>
              <p>Access to experienced financial consultants and business advisors</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Higher Success Rate</h4>
              <p>Proven track record of successful funding applications</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Time Savings</h4>
              <p>Focus on your business while we handle the funding process</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Multiple Options</h4>
              <p>Access to various funding sources and government schemes</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Ongoing Support</h4>
              <p>Continuous support throughout the funding journey</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Cost Effective</h4>
              <p>Affordable services with success-based pricing options</p>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2>Ready to Secure Your Funding?</h2>
          <p>Let us help you create a compelling proposal and secure the funding your business needs</p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.primaryButton}>
              Start Your Funding Journey
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

export default ProposalFunding; 