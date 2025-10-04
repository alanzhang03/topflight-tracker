"use client";
import React, { useState, useEffect } from "react";
import {
  Code,
  Database,
  Globe,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  Copy,
  Server,
  Key,
  BarChart3,
  Calendar,
  Trophy,
  Newspaper,
} from "lucide-react";
import styles from "./apiDoc.module.scss";

const APIDocPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const apiEndpoints = [
    {
      icon: <Trophy className={styles.endpointIcon} />,
      title: "Standings",
      method: "GET",
      endpoint: "/api/standings/{leagueCode}",
      description: "Get current league standings for a specific competition",
      parameters: [
        {
          name: "leagueCode",
          type: "string",
          required: true,
          description: "League identifier (PL, BL1, PD, CL)",
        },
      ],
      response: {
        status: 200,
        data: [
          {
            position: 1,
            team: { id: 57, name: "Arsenal FC", crest: "https://..." },
            playedGames: 20,
            won: 15,
            draw: 3,
            lost: 2,
            points: 48,
            goalDifference: 25,
          },
        ],
      },
      cacheTime: "30 seconds",
    },
    {
      icon: <Calendar className={styles.endpointIcon} />,
      title: "Fixtures",
      method: "GET",
      endpoint: "/api/fixtures/{leagueCode}",
      description: "Get upcoming scheduled matches for a league",
      parameters: [
        {
          name: "leagueCode",
          type: "string",
          required: true,
          description: "League identifier (PL, BL1, PD, CL)",
        },
      ],
      response: {
        status: 200,
        data: [
          {
            id: 12345,
            utcDate: "2024-01-15T15:30:00Z",
            homeTeam: { id: 57, name: "Arsenal FC", crest: "https://..." },
            awayTeam: { id: 65, name: "Manchester City", crest: "https://..." },
            status: "SCHEDULED",
          },
        ],
      },
      cacheTime: "100 seconds",
    },
    {
      icon: <BarChart3 className={styles.endpointIcon} />,
      title: "Results",
      method: "GET",
      endpoint: "/api/results/{leagueCode}",
      description: "Get completed match results for a league",
      parameters: [
        {
          name: "leagueCode",
          type: "string",
          required: true,
          description: "League identifier (PL, BL1, PD, CL)",
        },
      ],
      response: {
        status: 200,
        data: [
          {
            id: 12344,
            utcDate: "2024-01-10T15:30:00Z",
            homeTeam: { id: 57, name: "Arsenal FC", crest: "https://..." },
            awayTeam: { id: 65, name: "Manchester City", crest: "https://..." },
            score: { fullTime: { home: 2, away: 1 } },
            status: "FINISHED",
          },
        ],
      },
      cacheTime: "40 seconds",
    },
    {
      icon: <Database className={styles.endpointIcon} />,
      title: "Teams",
      method: "GET",
      endpoint: "/api/teams/{leagueCode}",
      description: "Get all teams participating in a specific league",
      parameters: [
        {
          name: "leagueCode",
          type: "string",
          required: true,
          description: "League identifier (PL, BL1, PD, CL)",
        },
      ],
      response: {
        status: 200,
        data: [
          {
            id: 57,
            name: "Arsenal FC",
            shortName: "Arsenal",
            crest: "https://...",
            founded: 1886,
            venue: "Emirates Stadium",
          },
        ],
      },
      cacheTime: "7 days",
    },
    {
      icon: <Newspaper className={styles.endpointIcon} />,
      title: "News",
      method: "GET",
      endpoint: "/api/news/{leagueName}",
      description: "Get latest football news for a specific league",
      parameters: [
        {
          name: "leagueName",
          type: "string",
          required: true,
          description: "League name (Premier League, La Liga, etc.)",
        },
      ],
      response: {
        status: 200,
        data: [
          {
            title: "Arsenal defeats Manchester City 2-1",
            link: "https://...",
            published_date: "2024-01-10T10:00:00Z",
            summary: "Arsenal secured a crucial victory...",
            media: "https://...",
          },
        ],
      },
      cacheTime: "22 hours",
    },
  ];

  const leagueCodes = [
    { code: "PL", name: "Premier League", country: "England" },
    { code: "BL1", name: "Bundesliga", country: "Germany" },
    { code: "PD", name: "La Liga", country: "Spain" },
    { code: "CL", name: "Champions League", country: "Europe" },
  ];

  const features = [
    {
      icon: <Zap className={styles.featureIcon} />,
      title: "Redis Caching",
      description:
        "All endpoints use Redis caching to improve performance and reduce API calls to external services.",
    },
    {
      icon: <Shield className={styles.featureIcon} />,
      title: "Rate Limiting",
      description:
        "Built-in rate limiting to prevent abuse and ensure fair usage for all users.",
    },
    {
      icon: <Clock className={styles.featureIcon} />,
      title: "Real-time Updates",
      description:
        "Data is cached with appropriate expiration times to balance freshness and performance.",
    },
    {
      icon: <Globe className={styles.featureIcon} />,
      title: "Multiple Leagues",
      description:
        "Support for Premier League, Bundesliga, La Liga, and Champions League data.",
    },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const renderCodeExample = (endpoint) => (
    <div className={styles.codeExample}>
      <div className={styles.codeHeader}>
        <span className={styles.codeTitle}>Example Request</span>
        <button
          className={styles.copyButton}
          onClick={() =>
            copyToClipboard(
              `curl -X GET "${
                isClient
                  ? window.location.origin
                  : "https://topflight-tracker.com"
              }${endpoint.endpoint}"`
            )
          }
        >
          <Copy size={16} />
          Copy
        </button>
      </div>
      <pre className={styles.codeBlock}>
        <code>{`curl -X GET "${
          isClient ? window.location.origin : "https://topflight-tracker.com"
        }${endpoint.endpoint}"
-H "Content-Type: application/json"`}</code>
      </pre>
    </div>
  );

  const renderResponseExample = (endpoint) => (
    <div className={styles.codeExample}>
      <div className={styles.codeHeader}>
        <span className={styles.codeTitle}>Example Response</span>
        <button
          className={styles.copyButton}
          onClick={() =>
            copyToClipboard(JSON.stringify(endpoint.response, null, 2))
          }
        >
          <Copy size={16} />
          Copy
        </button>
      </div>
      <pre className={styles.codeBlock}>
        <code>{JSON.stringify(endpoint.response, null, 2)}</code>
      </pre>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroIcon}>
            <Code />
          </div>
          <h1 className={styles.heroTitle}>API Documentation</h1>
          <p className={styles.heroDescription}>
            Comprehensive API documentation for TopFlight Tracker. Access
            football data, standings, fixtures, and news through our RESTful API
            endpoints.
          </p>
          <div className={styles.buttonContainer}>
            <button className={styles.primaryButton}>Get Started</button>
            <button className={styles.secondaryButton}>View Examples</button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className={styles.navSection}>
        <div className={styles.containerInner}>
          <div className={styles.tabNavigation}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "overview" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("overview")}
            >
              <Globe className={styles.tabIcon} />
              Overview
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "endpoints" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("endpoints")}
            >
              <Server className={styles.tabIcon} />
              Endpoints
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "examples" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("examples")}
            >
              <Code className={styles.tabIcon} />
              Examples
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "authentication" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("authentication")}
            >
              <Key className={styles.tabIcon} />
              Authentication
            </button>
          </div>
        </div>
      </section>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <section className={styles.overviewSection}>
          <div className={styles.containerInner}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>API Overview</h2>
              <p className={styles.sectionSubtitle}>
                TopFlight Tracker provides a comprehensive REST API for
                accessing football data from major European leagues.
              </p>
            </div>

            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.baseUrlSection}>
              <h3 className={styles.baseUrlTitle}>Base URL</h3>
              <div className={styles.baseUrlContainer}>
                <code className={styles.baseUrl}>
                  {isClient
                    ? window.location.origin
                    : "https://topflight-tracker.com"}
                  /api
                </code>
                <button
                  className={styles.copyButton}
                  onClick={() =>
                    copyToClipboard(
                      `${
                        isClient
                          ? window.location.origin
                          : "https://topflight-tracker.com"
                      }/api`
                    )
                  }
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <div className={styles.leagueCodesSection}>
              <h3 className={styles.leagueCodesTitle}>Supported Leagues</h3>
              <div className={styles.leagueCodesGrid}>
                {leagueCodes.map((league, index) => (
                  <div key={index} className={styles.leagueCodeCard}>
                    <div className={styles.leagueCode}>{league.code}</div>
                    <div className={styles.leagueName}>{league.name}</div>
                    <div className={styles.leagueCountry}>{league.country}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Endpoints Tab */}
      {activeTab === "endpoints" && (
        <section className={styles.endpointsSection}>
          <div className={styles.containerInner}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>API Endpoints</h2>
              <p className={styles.sectionSubtitle}>
                Complete reference for all available API endpoints
              </p>
            </div>

            <div className={styles.endpointsList}>
              {apiEndpoints.map((endpoint, index) => (
                <div key={index} className={styles.endpointCard}>
                  <div className={styles.endpointHeader}>
                    <div className={styles.endpointInfo}>
                      <div className={styles.endpointIcon}>{endpoint.icon}</div>
                      <div>
                        <h3 className={styles.endpointTitle}>
                          {endpoint.title}
                        </h3>
                        <p className={styles.endpointDescription}>
                          {endpoint.description}
                        </p>
                      </div>
                    </div>
                    <div className={styles.endpointMeta}>
                      <span
                        className={`${styles.method} ${
                          styles[endpoint.method.toLowerCase()]
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <span className={styles.cacheTime}>
                        <Clock size={14} />
                        {endpoint.cacheTime}
                      </span>
                    </div>
                  </div>

                  <div className={styles.endpointDetails}>
                    <div className={styles.endpointUrl}>
                      <code>{endpoint.endpoint}</code>
                    </div>

                    {endpoint.parameters && (
                      <div className={styles.parametersSection}>
                        <h4 className={styles.parametersTitle}>Parameters</h4>
                        <div className={styles.parametersList}>
                          {endpoint.parameters.map((param, paramIndex) => (
                            <div
                              key={paramIndex}
                              className={styles.parameterItem}
                            >
                              <div className={styles.parameterName}>
                                <code>{param.name}</code>
                                <span className={styles.parameterType}>
                                  ({param.type})
                                </span>
                                {param.required && (
                                  <span className={styles.required}>
                                    Required
                                  </span>
                                )}
                              </div>
                              <p className={styles.parameterDescription}>
                                {param.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className={styles.responseSection}>
                      <h4 className={styles.responseTitle}>Response</h4>
                      <div className={styles.responseInfo}>
                        <span className={styles.statusCode}>
                          Status: {endpoint.response.status}
                        </span>
                        <span className={styles.contentType}>
                          Content-Type: application/json
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Examples Tab */}
      {activeTab === "examples" && (
        <section className={styles.examplesSection}>
          <div className={styles.containerInner}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Code Examples</h2>
              <p className={styles.sectionSubtitle}>
                Practical examples showing how to use our API endpoints
              </p>
            </div>

            <div className={styles.examplesList}>
              {apiEndpoints.map((endpoint, index) => (
                <div key={index} className={styles.exampleCard}>
                  <div className={styles.exampleHeader}>
                    <h3 className={styles.exampleTitle}>
                      {endpoint.title} API
                    </h3>
                    <div className={styles.exampleMeta}>
                      <span
                        className={`${styles.method} ${
                          styles[endpoint.method.toLowerCase()]
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <code className={styles.endpointUrl}>
                        {endpoint.endpoint}
                      </code>
                    </div>
                  </div>

                  <div className={styles.exampleContent}>
                    {renderCodeExample(endpoint)}
                    {renderResponseExample(endpoint)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Authentication Tab */}
      {activeTab === "authentication" && (
        <section className={styles.authSection}>
          <div className={styles.containerInner}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Authentication</h2>
              <p className={styles.sectionSubtitle}>
                Learn how to authenticate with our API
              </p>
            </div>

            <div className={styles.authContent}>
              <div className={styles.authCard}>
                <h3 className={styles.authTitle}>No Authentication Required</h3>
                <p className={styles.authDescription}>
                  TopFlight Tracker API is currently free to use and does not
                  require authentication. Simply make HTTP requests to our
                  endpoints to access the data.
                </p>
                <div className={styles.authFeatures}>
                  <div className={styles.authFeature}>
                    <CheckCircle className={styles.checkIcon} />
                    <span>No API key required</span>
                  </div>
                  <div className={styles.authFeature}>
                    <CheckCircle className={styles.checkIcon} />
                    <span>Rate limiting applied</span>
                  </div>
                  <div className={styles.authFeature}>
                    <CheckCircle className={styles.checkIcon} />
                    <span>HTTPS only</span>
                  </div>
                </div>
              </div>

              <div className={styles.rateLimitCard}>
                <h3 className={styles.rateLimitTitle}>Rate Limiting</h3>
                <p className={styles.rateLimitDescription}>
                  To ensure fair usage and maintain service quality, we
                  implement rate limiting:
                </p>
                <ul className={styles.rateLimitList}>
                  <li>100 requests per minute per IP address</li>
                  <li>1000 requests per hour per IP address</li>
                  <li>Rate limit headers included in responses</li>
                </ul>
              </div>

              <div className={styles.headersCard}>
                <h3 className={styles.headersTitle}>Request Headers</h3>
                <p className={styles.headersDescription}>
                  Include these headers in your requests for optimal
                  performance:
                </p>
                <div className={styles.headersExample}>
                  <pre>
                    <code>{`Accept: application/json
Content-Type: application/json
User-Agent: YourApp/1.0`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.containerInner}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Start Building?</h2>
            <p className={styles.ctaDescription}>
              Start integrating TopFlight Tracker API into your applications
              today. All endpoints are live and ready to use.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimaryButton}>View Live API</button>
              <button className={styles.ctaSecondaryButton}>
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default APIDocPage;
