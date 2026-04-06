import "../../AppLayout.scss";

const About = () => {
  return (
    <section className="about-page">
      <div className="about-hero">
        <h1>About <span className="highlight">Job Prep AI</span></h1>
        <p>
          Job Prep AI helps you create a <span className="highlight">personalized interview plan</span> with tailored
          technical and behavioral questions, skill gap insights, and a focused
          preparation roadmap.
        </p>
        <p className="about-tagline">
          Build confidence, sharpen your answers, and step into interviews with a
          clear, role-aligned practice path.
        </p>
      </div>

      <ul className="about-list">
        <li>
          <strong className="highlight">Personalized insights</strong>
          <span>Built from your job description, resume, and experience summary.</span>
        </li>
        <li>
          <strong className="highlight">Interview readiness</strong>
          <span>Practice questions and answers designed to boost your confidence.</span>
        </li>
        <li>
          <strong className="highlight">Progress roadmap</strong>
          <span>Daily preparation guidance to help you stay organized and focused.</span>
        </li>
      </ul>
    </section>
  );
};

export default About;
