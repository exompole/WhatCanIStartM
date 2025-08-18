import React, { useEffect } from 'react';
import styles from './Services.module.css';
import { Link } from 'react-router-dom';
import { FiBarChart2, FiTarget, FiCheck, FiGlobe, FiPhone, FiImage, FiTv } from 'react-icons/fi';

const Marketing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.servicePage}>
      <div className={styles.heroSection}>
        <h1>Marketing Services</h1>
        <p>Build your brand, reach your customers, and grow your business with our comprehensive marketing solutions</p>
      </div>

      <div className={styles.serviceContent}>
        <section className={styles.serviceOverview}>
          <h2>Comprehensive Marketing Solutions</h2>
          <p>
            We provide end-to-end marketing services to help your business establish a strong 
            market presence, attract customers, and drive sales. From digital marketing to 
            traditional advertising, we have you covered.
          </p>
        </section>

        <section className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiGlobe /></div>
            <h3>Digital Marketing</h3>
            <ul>
              <li>Search Engine Optimization (SEO)</li>
              <li>Social Media Marketing</li>
              <li>Content Marketing Strategy</li>
              <li>Email Marketing Campaigns</li>
              <li>Pay-Per-Click Advertising</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiPhone /></div>
            <h3>Social Media Management</h3>
            <ul>
              <li>Platform Strategy Development</li>
              <li>Content Creation & Curation</li>
              <li>Community Management</li>
              <li>Influencer Partnerships</li>
              <li>Social Media Analytics</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiImage /></div>
            <h3>Brand Development</h3>
            <ul>
              <li>Brand Identity Design</li>
              <li>Logo & Visual Assets</li>
              <li>Brand Guidelines</li>
              <li>Brand Positioning</li>
              <li>Brand Messaging</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiTv /></div>
            <h3>Traditional Advertising</h3>
            <ul>
              <li>Print Media Advertising</li>
              <li>Radio & TV Commercials</li>
              <li>Outdoor Advertising</li>
              <li>Event Marketing</li>
              <li>Direct Mail Campaigns</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiBarChart2 /></div>
            <h3>Marketing Analytics</h3>
            <ul>
              <li>Campaign Performance Tracking</li>
              <li>ROI Analysis</li>
              <li>Customer Behavior Analysis</li>
              <li>Market Research</li>
              <li>Competitive Analysis</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiTarget /></div>
            <h3>Lead Generation</h3>
            <ul>
              <li>Lead Magnet Development</li>
              <li>Landing Page Optimization</li>
              <li>Lead Nurturing Campaigns</li>
              <li>Sales Funnel Optimization</li>
              <li>Conversion Rate Optimization</li>
            </ul>
          </div>
        </section>

        <section className={styles.processSection}>
          <h2>Our Marketing Process</h2>
          <div className={styles.processSteps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h4>Market Research</h4>
              <p>Analyze your target market, competitors, and industry trends</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h4>Strategy Development</h4>
              <p>Create customized marketing strategies for your business</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h4>Implementation</h4>
              <p>Execute marketing campaigns across multiple channels</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <h4>Monitoring & Optimization</h4>
              <p>Track performance and continuously optimize campaigns</p>
            </div>
          </div>
        </section>

        <section className={styles.benefitsSection}>
          <h2>Benefits of Our Marketing Services</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefit}>
              <h4><FiCheck /> Increased Brand Awareness</h4>
              <p>Build strong brand recognition in your target market</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Higher Customer Engagement</h4>
              <p>Engage with your audience across multiple platforms</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Improved Lead Generation</h4>
              <p>Generate quality leads and increase sales opportunities</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Better ROI</h4>
              <p>Data-driven strategies for maximum return on investment</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Competitive Advantage</h4>
              <p>Stay ahead of competitors with innovative marketing</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Scalable Growth</h4>
              <p>Marketing strategies that grow with your business</p>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2>Ready to Grow Your Business?</h2>
          <p>Let us help you create effective marketing strategies to reach your target audience</p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.primaryButton}>
              Start Your Marketing Campaign
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

export default Marketing; 