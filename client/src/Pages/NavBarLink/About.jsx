import React, { useEffect } from "react";
import styles from "./About.module.css";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.about_wrapper}>
      {/* Hero Section */}
      <div className={styles.hero_section}>
        <div className={styles.hero_content}>
          <h1>About WhatCanIStart</h1>
          <p className={styles.hero_subtitle}>
            Empowering Entrepreneurs to Turn Resources into Opportunities
          </p>
        </div>
      </div>

      {/* Main About Section */}
      <div className={styles.about_container}>
        <div className={styles.about_content}>
          <h2>Our Story</h2>
          <p>
            At WhatCanIStart, we believe that entrepreneurship shouldn't be limited by 
            what you don't have, but inspired by what you do have. We are a dedicated 
            platform that transforms everyday resources—whether it's your skills, time, 
            space, or equipment—into viable business opportunities.
          </p>
          <p>
            Founded with the vision of democratizing entrepreneurship, we've helped 
            thousands of individuals discover their potential to start meaningful ventures. 
            From side hustles to full-scale businesses, we bridge the gap between 
            aspiration and action through research, insights, and practical guidance.
          </p>
        </div>
        <div className={styles.about_image}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1055/1055646.png"
            alt="Team illustration"
          />
        </div>
      </div>

      {/* Mission & Vision */}
      <div className={styles.mission_vision}>
        <div className={styles.mission_card}>
          <div className={styles.card_icon}>🎯</div>
          <h3>Our Mission</h3>
          <p>
            To democratize entrepreneurship by providing accessible, practical, and 
            personalized business guidance that transforms available resources into 
            sustainable business opportunities.
          </p>
        </div>
        <div className={styles.vision_card}>
          <div className={styles.card_icon}>🔮</div>
          <h3>Our Vision</h3>
          <p>
            A world where everyone has the tools, knowledge, and confidence to turn 
            their ideas and resources into successful, sustainable businesses that 
            contribute to economic growth and personal fulfillment.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className={styles.values_section}>
        <h2>Our Core Values</h2>
        <div className={styles.values_grid}>
          <div className={styles.value_item}>
            <div className={styles.value_icon}>💡</div>
            <h4>Innovation</h4>
            <p>Constantly evolving our approach to provide cutting-edge business solutions</p>
          </div>
          <div className={styles.value_item}>
            <div className={styles.value_icon}>🤝</div>
            <h4>Accessibility</h4>
            <p>Making entrepreneurship accessible to everyone, regardless of background</p>
          </div>
          <div className={styles.value_item}>
            <div className={styles.value_icon}>📈</div>
            <h4>Sustainability</h4>
            <p>Promoting business models that are economically and environmentally sustainable</p>
          </div>
          <div className={styles.value_item}>
            <div className={styles.value_icon}>🎓</div>
            <h4>Education</h4>
            <p>Empowering through knowledge, practical guidance, and continuous learning</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className={styles.stats_section}>
        <h2>Our Impact</h2>
        <div className={styles.stats_grid}>
          <div className={styles.stat_item}>
            <div className={styles.stat_number}>10,000+</div>
            <div className={styles.stat_label}>Business Ideas Generated</div>
          </div>
          <div className={styles.stat_item}>
            <div className={styles.stat_number}>5,000+</div>
            <div className={styles.stat_label}>Entrepreneurs Empowered</div>
          </div>
          <div className={styles.stat_item}>
            <div className={styles.stat_number}>200+</div>
            <div className={styles.stat_label}>Business Categories</div>
          </div>
          <div className={styles.stat_item}>
            <div className={styles.stat_number}>95%</div>
            <div className={styles.stat_label}>Success Rate</div>
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className={styles.services_section}>
        <h2>What We Offer</h2>
        <div className={styles.services_grid}>
          <div className={styles.service_item}>
            <div className={styles.service_icon}>🤖</div>
            <h4>AI-Powered Idea Generation</h4>
            <p>Advanced AI technology that creates personalized business plans based on your resources</p>
          </div>
          <div className={styles.service_item}>
            <div className={styles.service_icon}>📋</div>
            <h4>Comprehensive Business Plans</h4>
            <p>Detailed plans including financial projections, legal requirements, and implementation strategies</p>
          </div>
          <div className={styles.service_item}>
            <div className={styles.service_icon}>⚖️</div>
            <h4>Legal Compliance Guidance</h4>
            <p>Expert guidance on business registration, licenses, and regulatory requirements</p>
          </div>
          <div className={styles.service_item}>
            <div className={styles.service_icon}>📊</div>
            <h4>Market Analysis</h4>
            <p>In-depth market research and competitive analysis for informed decision-making</p>
          </div>
          <div className={styles.service_item}>
            <div className={styles.service_icon}>🎥</div>
            <h4>Visual References</h4>
            <p>Video tutorials, photo examples, and real-world business case studies</p>
          </div>
          <div className={styles.service_item}>
            <div className={styles.service_icon}>🚀</div>
            <h4>Growth Strategies</h4>
            <p>Scalability plans and long-term growth strategies for sustainable success</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className={styles.cta_section}>
        <h2>Ready to Start Your Journey?</h2>
        <p>
          Join thousands of successful entrepreneurs who have transformed their 
          resources into thriving businesses with our guidance.
        </p>
        <div className={styles.cta_buttons}>
          <button className={styles.cta_primary}>Explore Business Ideas</button>
          <button className={styles.cta_secondary}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default About;
