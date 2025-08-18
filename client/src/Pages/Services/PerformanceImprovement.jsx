import React, { useEffect } from 'react';
import styles from './Services.module.css';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiBarChart2, FiCheck, FiSettings, FiUsers, FiShoppingCart } from 'react-icons/fi';

const PerformanceImprovement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.servicePage}>
      <div className={styles.heroSection}>
        <h1>Business Performance Improvement</h1>
        <p>Optimize your business operations and maximize profitability with data-driven strategies</p>
      </div>

      <div className={styles.serviceContent}>
        <section className={styles.serviceOverview}>
          <h2>Transform Your Business Performance</h2>
          <p>
            We help businesses identify inefficiencies, optimize processes, and implement 
            strategies that drive growth and profitability. Our comprehensive approach 
            covers all aspects of business performance improvement.
          </p>
        </section>

        <section className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiTrendingUp /></div>
            <h3>Performance Analysis</h3>
            <ul>
              <li>Business Process Audit</li>
              <li>KPI Identification & Tracking</li>
              <li>Efficiency Gap Analysis</li>
              <li>Benchmarking Studies</li>
              <li>Performance Metrics Dashboard</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiSettings /></div>
            <h3>Process Optimization</h3>
            <ul>
              <li>Workflow Redesign</li>
              <li>Automation Implementation</li>
              <li>Quality Management Systems</li>
              <li>Lean Six Sigma Implementation</li>
              <li>Standard Operating Procedures</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiTrendingUp /></div>
            <h3>Financial Optimization</h3>
            <ul>
              <li>Cost Reduction Strategies</li>
              <li>Revenue Enhancement Plans</li>
              <li>Cash Flow Management</li>
              <li>Budget Optimization</li>
              <li>Financial Risk Assessment</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiUsers /></div>
            <h3>Team Performance</h3>
            <ul>
              <li>Employee Training Programs</li>
              <li>Performance Management Systems</li>
              <li>Motivation & Incentive Programs</li>
              <li>Leadership Development</li>
              <li>Team Building Activities</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiShoppingCart /></div>
            <h3>Customer Experience</h3>
            <ul>
              <li>Customer Journey Mapping</li>
              <li>Service Quality Improvement</li>
              <li>Customer Feedback Systems</li>
              <li>Loyalty Program Design</li>
              <li>Customer Retention Strategies</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FiBarChart2 /></div>
            <h3>Data Analytics</h3>
            <ul>
              <li>Business Intelligence Setup</li>
              <li>Predictive Analytics</li>
              <li>Data-Driven Decision Making</li>
              <li>Performance Reporting</li>
              <li>Real-time Monitoring Systems</li>
            </ul>
          </div>
        </section>

        <section className={styles.processSection}>
          <h2>Our Performance Improvement Process</h2>
          <div className={styles.processSteps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h4>Assessment & Analysis</h4>
              <p>Comprehensive evaluation of current business performance and processes</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h4>Strategy Development</h4>
              <p>Create customized improvement strategies based on analysis findings</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h4>Implementation</h4>
              <p>Execute improvement plans with proper change management support</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <h4>Monitoring & Optimization</h4>
              <p>Track progress and continuously optimize for better results</p>
            </div>
          </div>
        </section>

        <section className={styles.benefitsSection}>
          <h2>Benefits of Performance Improvement</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefit}>
              <h4><FiCheck /> Increased Efficiency</h4>
              <p>Streamlined processes lead to higher productivity and reduced costs</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Better Profitability</h4>
              <p>Optimized operations result in improved profit margins</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Enhanced Customer Satisfaction</h4>
              <p>Improved processes lead to better customer experiences</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Competitive Advantage</h4>
              <p>Better performance gives you an edge over competitors</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Sustainable Growth</h4>
              <p>Optimized operations support long-term business growth</p>
            </div>
            <div className={styles.benefit}>
              <h4><FiCheck /> Employee Satisfaction</h4>
              <p>Better processes improve employee morale and retention</p>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2>Ready to Improve Your Performance?</h2>
          <p>Let us help you optimize your business operations and achieve better results</p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.primaryButton}>
              Start Performance Assessment
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

export default PerformanceImprovement; 