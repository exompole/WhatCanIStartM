import React, { useState, useEffect } from "react";
import { FiClipboard, FiBook } from 'react-icons/fi';
import styles from "./RoadMap.module.css";

const STAGES = [
  {
    key: "plan",
    label: "Planning Phase",
  icon: "Checklist",
    color: "#4CAF50",
    duration: "2-4 weeks",
    priority: "High",
    steps: [
      {
        key: "idea",
        title: "Idea Validation",
        info: "Validate your business idea through market research and customer interviews",
        duration: "1-2 weeks",
        resources: ["Market Research Tools", "Customer Survey Templates", "Competitor Analysis Guide"],
        checklist: ["Define problem statement", "Identify target audience", "Conduct competitor analysis", "Validate with potential customers"],
        estimatedCost: "₹5,000 - ₹15,000"
      },
      {
        key: "business-plan",
        title: "Business Plan Development",
        info: "Create a comprehensive business plan including financial projections",
        duration: "2-3 weeks",
        resources: ["Business Plan Template", "Financial Projection Tools", "Pitch Deck Templates"],
        checklist: ["Executive summary", "Market analysis", "Financial projections", "Marketing strategy", "Risk assessment"],
        estimatedCost: "₹10,000 - ₹25,000"
      },
      {
        key: "market-research",
        title: "Market Research & Analysis",
        info: "Deep dive into market size, trends, and customer behavior",
        duration: "1-2 weeks",
        resources: ["Industry Reports", "Survey Tools", "Analytics Platforms"],
        checklist: ["Market size calculation", "Customer persona development", "Pricing strategy", "Distribution channels"],
        estimatedCost: "₹8,000 - ₹20,000"
      }
    ]
  },
  {
    key: "setup",
    label: "Business Setup",
  icon: "Setup",
    color: "#2196F3",
    duration: "4-6 weeks",
    priority: "High",
    steps: [
      {
        key: "legal-requirements",
        title: "Legal & Compliance",
        info: "Complete all legal formalities and obtain necessary licenses",
        duration: "3-4 weeks",
        resources: ["Legal Consultation", "Document Templates", "Compliance Checklist"],
        checklist: ["PAN Card", "Shop Act Registration", "GST Registration", "FSSAI License", "Udyam Registration"],
        estimatedCost: "₹15,000 - ₹35,000"
      },
      {
        key: "banking",
        title: "Banking & Finance Setup",
        info: "Set up business bank accounts and financial systems",
        duration: "1-2 weeks",
        resources: ["Banking Guide", "Accounting Software", "Financial Templates"],
        checklist: ["Business bank account", "Digital payment setup", "Accounting system", "Tax registration"],
        estimatedCost: "₹5,000 - ₹15,000"
      }
    ]
  },
  {
    key: "funding",
    label: "Funding & Marketing",
  icon: "Funding",
    color: "#FF9800",
    duration: "6-8 weeks",
    priority: "Medium",
    steps: [
      {
        key: "funding-prep",
        title: "Funding Preparation",
        info: "Prepare for fundraising and secure initial capital",
        duration: "4-6 weeks",
        resources: ["Pitch Deck Templates", "Investor Database", "Funding Guide"],
        checklist: ["Financial projections", "Pitch deck", "Investor list", "Funding strategy"],
        estimatedCost: "₹20,000 - ₹50,000"
      },
      {
        key: "marketing-strategy",
        title: "Marketing & Branding",
        info: "Develop comprehensive marketing and branding strategy",
        duration: "2-3 weeks",
        resources: ["Branding Guide", "Marketing Tools", "Social Media Templates"],
        checklist: ["Brand identity", "Marketing channels", "Content strategy", "Social media presence"],
        estimatedCost: "₹25,000 - ₹60,000"
      }
    ]
  },
  {
    key: "grow",
    label: "Growth & Scale",
  icon: 'Growth',
    color: "#9C27B0",
    duration: "8-12 weeks",
    priority: "Medium",
    steps: [
      {
        key: "team-building",
        title: "Team Building",
        info: "Build and manage your core team",
        duration: "4-6 weeks",
        resources: ["Hiring Templates", "HR Policies", "Team Management Tools"],
        checklist: ["Job descriptions", "Hiring process", "Employee contracts", "Training programs"],
        estimatedCost: "₹50,000 - ₹150,000"
      },
      {
        key: "operations",
        title: "Operations Setup",
        info: "Establish operational processes and systems",
        duration: "3-4 weeks",
        resources: ["Process Templates", "Management Tools", "Quality Control Systems"],
        checklist: ["Standard operating procedures", "Quality control", "Inventory management", "Customer service"],
        estimatedCost: "₹30,000 - ₹80,000"
      },
      {
        key: "expansion",
        title: "Business Expansion",
        info: "Plan and execute business expansion strategies",
        duration: "6-8 weeks",
        resources: ["Expansion Guide", "Market Entry Strategies", "Partnership Templates"],
        checklist: ["Market expansion", "Product diversification", "Partnerships", "Franchising"],
        estimatedCost: "₹100,000 - ₹300,000"
      }
    ]
  }
];

const RoadMap = () => {
  const [selectedStages, setSelectedStages] = useState([]);
  const [expandedStep, setExpandedStep] = useState(null);
  const [progress, setProgress] = useState({});
  const [currentView, setCurrentView] = useState('timeline'); // 'timeline' or 'list'
  const [filterPriority, setFilterPriority] = useState('all');

  const handleStageToggle = (key) => {
    setSelectedStages((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleStepProgress = (stepKey, completed) => {
    setProgress(prev => ({
      ...prev,
      [stepKey]: completed
    }));
  };

  const getProgressPercentage = () => {
    const allSteps = STAGES.flatMap(stage => stage.steps);
    const completedSteps = allSteps.filter(step => progress[step.key]);
    return Math.round((completedSteps.length / allSteps.length) * 100);
  };

  const selectedSteps = STAGES.filter((s) => selectedStages.includes(s.key))
    .flatMap((s) => s.steps.map(step => ({ ...step, stage: s })));

  const filteredSteps = filterPriority === 'all' 
    ? selectedSteps 
    : selectedSteps.filter(step => step.stage.priority === filterPriority);

  const totalEstimatedCost = selectedSteps.reduce((total, step) => {
    const costRange = step.estimatedCost.replace(/[₹,]/g, '').split(' - ');
    const avgCost = (parseInt(costRange[0]) + parseInt(costRange[1])) / 2;
    return total + avgCost;
  }, 0);

  const totalDuration = selectedSteps.reduce((total, step) => {
    const duration = step.duration.split(' ')[0];
    return total + parseInt(duration);
  }, 0);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Entrepreneur Journey Roadmap</h1>
        <h2 className={styles.subtitle}>
          Your personalized path from idea to successful business
        </h2>
        <p className={styles.description}>
          Select your business stage and get a detailed, actionable roadmap with timelines, costs, and resources.
        </p>
        
        {/* Progress Overview */}
        <div className={styles.progressOverview}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <span className={styles.progressText}>{getProgressPercentage()}% Complete</span>
        </div>
      </header>

      {/* Stage Selector */}
      <section className={styles.stageSelector}>
        <h3 className={styles.sectionTitle}>Select Your Business Stage</h3>
        <div className={styles.stageButtons}>
          {STAGES.map((stage) => (
            <button
              key={stage.key}
              className={`${styles.stageBtn} ${
                selectedStages.includes(stage.key) ? styles.stageBtnSelected : ''
              }`}
              onClick={() => handleStageToggle(stage.key)}
              style={{
                borderColor: stage.color,
                backgroundColor: selectedStages.includes(stage.key) ? stage.color : 'transparent'
              }}
            >
              <span className={styles.stageIcon}>{stage.icon}</span>
              <div className={styles.stageInfo}>
                <span className={styles.stageLabel}>{stage.label}</span>
                <span className={styles.stageDuration}>{stage.duration}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedSteps.length > 0 && (
        <>
          {/* View Controls */}
          <section className={styles.controls}>
            <div className={styles.viewToggle}>
              <button 
                className={`${styles.viewBtn} ${currentView === 'timeline' ? styles.active : ''}`}
                onClick={() => setCurrentView('timeline')}
              >
                Timeline View
              </button>
              <button 
                className={`${styles.viewBtn} ${currentView === 'list' ? styles.active : ''}`}
                onClick={() => setCurrentView('list')}
              >
                List View
              </button>
            </div>
            
            <div className={styles.filters}>
              <select 
                value={filterPriority} 
                onChange={(e) => setFilterPriority(e.target.value)}
                className={styles.priorityFilter}
              >
                <option value="all">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </section>

          {/* Summary Cards */}
          <section className={styles.summary}>
            <div className={styles.summaryCard}>
              <h4>Total Steps</h4>
              <span className={styles.summaryValue}>{selectedSteps.length}</span>
            </div>
            <div className={styles.summaryCard}>
              <h4>Estimated Duration</h4>
              <span className={styles.summaryValue}>{totalDuration} weeks</span>
            </div>
            <div className={styles.summaryCard}>
              <h4>Estimated Cost</h4>
              <span className={styles.summaryValue}>₹{totalEstimatedCost.toLocaleString()}</span>
            </div>
          </section>

          {/* Roadmap Content */}
          <section className={styles.roadmapContent}>
            {currentView === 'timeline' ? (
              <div className={styles.timelineView}>
                {STAGES.filter(stage => selectedStages.includes(stage.key)).map((stage, stageIndex) => (
                  <div key={stage.key} className={styles.timelineStage}>
                    <div className={styles.stageHeader} style={{ borderColor: stage.color }}>
                      <div className={styles.stageMarker} style={{ backgroundColor: stage.color }}>
                        {stageIndex + 1}
                      </div>
                      <div className={styles.stageDetails}>
                        <h3>{stage.label}</h3>
                        <p>{stage.duration} • Priority: {stage.priority}</p>
                      </div>
                    </div>
                    
                    <div className={styles.stageSteps}>
                      {stage.steps.map((step, stepIndex) => (
                        <div key={step.key} className={styles.timelineStep}>
                          <div className={styles.stepConnector}></div>
                          <div className={styles.stepCard}>
                            <div className={styles.stepHeader}>
                              <div className={styles.stepNumber}>{stepIndex + 1}</div>
                              <div className={styles.stepInfo}>
                                <h4>{step.title}</h4>
                                <p>{step.duration} • {step.estimatedCost}</p>
                              </div>
                              <div className={styles.stepActions}>
                                <input
                                  type="checkbox"
                                  checked={progress[step.key] || false}
                                  onChange={(e) => handleStepProgress(step.key, e.target.checked)}
                                  className={styles.progressCheckbox}
                                />
                                <button
                                  className={styles.expandBtn}
                                  onClick={() => setExpandedStep(expandedStep === step.key ? null : step.key)}
                                >
                                  {expandedStep === step.key ? '−' : '+'}
                                </button>
                              </div>
                            </div>
                            
                            {expandedStep === step.key && (
                              <div className={styles.stepDetails}>
                                <p className={styles.stepDescription}>{step.info}</p>
                                
                                <div className={styles.stepSections}>
                                  <div className={styles.stepSection}>
                                    <h5><FiClipboard style={{verticalAlign:'middle', marginRight:6}}/> Checklist</h5>
                                    <ul>
                                      {step.checklist.map((item, index) => (
                                        <li key={index}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div className={styles.stepSection}>
                                    <h5><FiBook style={{verticalAlign:'middle', marginRight:6}}/> Resources</h5>
                                    <ul>
                                      {step.resources.map((resource, index) => (
                                        <li key={index}>{resource}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.listView}>
                {filteredSteps.map((step) => (
                  <div key={step.key} className={styles.listCard}>
                    <div className={styles.listCardHeader}>
                      <div className={styles.listCardInfo}>
                        <h4>{step.title}</h4>
                        <p className={styles.listCardMeta}>
                          {step.stage.label} • {step.duration} • {step.estimatedCost}
                        </p>
                        <p className={styles.listCardDescription}>{step.info}</p>
                      </div>
                      <div className={styles.listCardActions}>
                        <input
                          type="checkbox"
                          checked={progress[step.key] || false}
                          onChange={(e) => handleStepProgress(step.key, e.target.checked)}
                          className={styles.progressCheckbox}
                        />
                        <button
                          className={styles.expandBtn}
                          onClick={() => setExpandedStep(expandedStep === step.key ? null : step.key)}
                        >
                          {expandedStep === step.key ? '−' : '+'}
                        </button>
                      </div>
                    </div>
                    
                            {expandedStep === step.key && (
                      <div className={styles.listCardDetails}>
                        <div className={styles.stepSections}>
                          <div className={styles.stepSection}>
                            <h5><FiClipboard style={{verticalAlign:'middle', marginRight:6}}/> Checklist</h5>
                            <ul>
                              {step.checklist.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className={styles.stepSection}>
                            <h5><FiBook style={{verticalAlign:'middle', marginRight:6}}/> Resources</h5>
                            <ul>
                              {step.resources.map((resource, index) => (
                                <li key={index}>{resource}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {/* Footer Actions */}
      <footer className={styles.footer}>
        <div className={styles.footerActions}>
          <button className={styles.primaryBtn}>
            Export Roadmap (PDF)
          </button>
          <button className={styles.secondaryBtn}>
            Save Progress
          </button>
          <button className={styles.secondaryBtn}>
            Share Roadmap
          </button>
        </div>
        
        <div className={styles.footerLinks}>
          <div className={styles.footerSection}>
            <h4>Get Inspired</h4>
            <a href="#success-stories">Success Stories</a>
            <a href="#case-studies">Case Studies</a>
            <a href="#mentorship">Find a Mentor</a>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Tools & Resources</h4>
            <a href="#templates">Business Templates</a>
            <a href="#calculators">Financial Calculators</a>
            <a href="#guides">How-to Guides</a>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Need Help?</h4>
            <a href="https://wa.me/">Chat with Mentor</a>
            <a href="#support">Support Center</a>
            <a href="#community">Community Forum</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RoadMap;
