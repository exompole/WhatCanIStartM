import { useEffect } from "react";
import Chart from "chart.js/auto";
import "./Pages.css";
import { Link, useNavigate } from "react-router-dom";

const HomeInfo = () => {
  useEffect(() => {
    const ctx = document.getElementById("startupChart")?.getContext("2d");
    if (ctx) {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["2020", "2021", "2022", "2023"],
          datasets: [
            {
              label: "Startups Registered",
              data: [40000, 55000, 70000, 85000],
              backgroundColor: "#0077ff",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Startup Growth in India",
            },
          },
        },
      });
    }
  }, []);

  const useService = (isLoggedIn) => {
      const navigate = useNavigate(); 
      if(!isLoggedIn){
        // alert{"Please Login to use service"};
        navigate("/user-login");
        }
      else{
          console.log("access granted");
      }

  }

  return (
    <>
      
      <div className="scroll-nav">
        <a href="#services">Services</a>
        <a href="#india-stats">India Stats</a>
      </div>

      <main className="main-content">
        
        <div className="content-text">
          <h1>You Name Anything, We Give You A Business Idea</h1>
          <p>
            You name anything – a skill, an item, or an interest – and we'll turn
            it into a business idea. Our platform helps you discover what you can
            start with what you already have. No complex plans, just smart
            suggestions tailored to your resources. Start your entrepreneurial
            journey with clarity, confidence, and creativity.
          </p>
        </div>
        <div className="content-logo">
          <img src="src/images/logo.png" alt="Platform Logo" />
        </div>
      </main>

    
        <section id="services" className="services-section">
          <h2>How We Help You</h2>
          <div className="services-container" >
            <div className="service-card" onClick={useService}><h3>Legal Compliances</h3></div>
            <div className="service-card"><h3>Proposal Creation & Funding</h3></div>
            <div className="service-card"><h3>Business Performance Improvement</h3></div>
            <div className="service-card"><h3>Professional Services</h3></div>
            <div className="service-card"><h3>Marketing</h3></div>
          </div>
        </section>

    
      <section id="india-stats" className="chart-section">
        <h2>Why India is a Great Place for Entrepreneurs</h2>
        <p>
          India offers a thriving startup ecosystem, strong government support
          like Startup India, and access to a large, growing market. With a
          digitally empowered population and increasing investor interest,
          India is becoming the ideal hub for launching innovative businesses.
        </p>
        <div className="stats-graph">
          <p>📊 85,000+ startups registered in India (2023)</p>
          <p>🚀 India ranks 3rd in global startup ecosystems</p>
          <p>💼 1M+ jobs created through startups</p>
        </div>
        <div className="chart-box">
          <canvas id="startupChart"></canvas>
        </div>
      </section>

      
      
    </>
  );
};

export default HomeInfo;
