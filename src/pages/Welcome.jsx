import { useNavigate } from "react-router-dom";
import styles from "../styles/Welcome.module.css";
import Header from "../components/Header.jsx";

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.welcomeContainer}>
            <div className={styles.content}>
                {/* Space reserved for heading */}
                <div className={styles.headingSpace}>
                    <h1 className={styles.heading}>
                        <Header />
                    </h1>
                </div>

                <div className={styles.welcomeContent}>
                    <div className={styles.mainSection}>
                        <p className={styles.subtitle}>Welcome to our platform</p>
                        <p className={styles.description}>
                            Experience something extraordinary. We're here to help you achieve your goals
                            and make your journey seamless and enjoyable.
                        </p>
                    </div>

                    <div className={styles.actionSection}>
                        <button
                            className={styles.primaryButton}
                            onClick={() => navigate("/register")}
                        >
                            Get Started
                        </button>

                        <button className={styles.secondaryButton}>
                            Learn More
                        </button>
                    </div>

                    <div className={styles.features}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>⚡</div>
                            <h3 className={styles.featureTitle}></h3>
                            <p className={styles.featureDescription}>

                            </p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>🔒</div>
                            <h3 className={styles.featureTitle}></h3>
                            <p className={styles.featureDescription}>

                            </p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>🌟</div>
                            <h3 className={styles.featureTitle}></h3>
                            <p className={styles.featureDescription}>

                            </p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>🚀</div>
                            <h3 className={styles.featureTitle}></h3>
                            <p className={styles.featureDescription}>

                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.backgroundElements}>
                <div className={styles.circle1}></div>
                <div className={styles.circle2}></div>
                <div className={styles.circle3}></div>
            </div>
        </div>
    );
};

export default Welcome;
